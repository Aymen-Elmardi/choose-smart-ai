// analyze-statement — accepts an uploaded merchant payment statement (PDF/CSV)
// plus the submitter's email, extracts the headline fee figures via the
// Anthropic API, compares the all-in effective rate against reference bands,
// emails the statement (as an attachment) + result to the team via Resend,
// and returns an INDICATIVE comparison to the caller.
//
// Secrets required (set in Supabase): ANTHROPIC_API_KEY, RESEND_API_KEY.
// Also uses the auto-injected SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY and the
// `statement_review_requests` table for persistent rate limiting / abuse logging.

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
// Guard against accidental whitespace/newlines in the stored secret (an invalid
// header value otherwise throws before the request is sent).
const ANTHROPIC_API_KEY = (Deno.env.get("ANTHROPIC_API_KEY") ?? "").split(/\s+/)[0].trim();
const TEAM_EMAIL = "hello@chosepayments.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (data: unknown, status = 200): Response =>
  new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", ...corsHeaders } });
const ok = (data: Record<string, unknown> = {}) => json({ success: true, ...data }, 200);
const err = (error: string, status = 400) => json({ success: false, error }, status);

// ---- abuse-prevention / cost-control config ---------------------------------
const MAX_GLOBAL_PER_DAY = 50;     // hard daily ceiling on Anthropic calls (the spend wall)
const MAX_PER_IP_PER_DAY = 5;
const MAX_PER_EMAIL_PER_DAY = 3;
const BURST_MAX = 2;               // max successful calls per IP within the burst window
const BURST_WINDOW_MIN = 10;
const ALERT_THROTTLE_MIN = 60;     // at most one alert email per hour
const MAX_PDF_BASE64 = 9_000_000;  // ~6.7MB of binary
const MAX_CSV_CHARS = 2_000_000;
const TABLE = "statement_review_requests";

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const clientIp = (req: Request) =>
  req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";

// Requests must come from a real browser on our domain. (An Origin header can be
// forged by a determined script, so this is a filter — the DB rate limits and the
// global daily cap below are the actual spend wall.)
const isAllowedOrigin = (origin: string | null): boolean => {
  if (!origin) return false;
  try {
    const h = new URL(origin).hostname;
    return h === "chosepayments.com" || h.endsWith(".chosepayments.com") || h === "localhost" || h === "127.0.0.1";
  } catch {
    return false;
  }
};
const looksAutomated = (ua: string | null): boolean => !ua || ua.length < 15 || !/mozilla/i.test(ua);

interface LogRow {
  ip: string; email: string; origin: string | null; user_agent: string | null;
  file_name: string; file_type: string; status: string;
  flagged?: boolean; flag_reason?: string; effective_rate?: number | null; verdict?: string | null;
}
const log = async (row: LogRow): Promise<void> => {
  try { await supabaseAdmin.from(TABLE).insert(row); } catch { /* never block on logging */ }
};

// Count successful (cost-incurring) calls matching a filter since `sinceISO`.
// Fails open (returns 0) so a transient DB error never locks out legitimate users.
const countOk = async (sinceISO: string, match: Record<string, string>): Promise<number> => {
  try {
    let q = supabaseAdmin.from(TABLE).select("id", { count: "exact", head: true })
      .eq("status", "ok").gte("created_at", sinceISO);
    for (const [k, v] of Object.entries(match)) q = q.eq(k, v);
    const { count } = await q;
    return count ?? 0;
  } catch {
    return 0;
  }
};

// Email the team about suspicious activity, throttled via the DB to one per hour.
const maybeAlert = async (subject: string, detail: string): Promise<void> => {
  try {
    const since = new Date(Date.now() - ALERT_THROTTLE_MIN * 60_000).toISOString();
    const { count } = await supabaseAdmin.from(TABLE).select("id", { count: "exact", head: true })
      .eq("status", "alert").gte("created_at", since);
    if ((count ?? 0) > 0) return;
    await supabaseAdmin.from(TABLE).insert({ status: "alert", flag_reason: subject });
    await resend.emails.send({
      from: "ChosePayments <leads@chosepayments.com>",
      to: TEAM_EMAIL,
      subject: `⚠️ Statement analyser: ${subject}`,
      html: `<p>${detail}</p>`,
    });
  } catch { /* best-effort */ }
};

// ---- benchmarks by market --------------------------------------------------
// All-in effective rate = total fees / total card volume.
//
// UK — anchored on real merchant statements (Adyen 0.52%, Checkout 0.58%,
//   Barclaycard 1.04%). "good" ≈ sharp IC++ (~0.6%), "typical" ≈ blended (~1.0%).
//   Savings measured vs the typical rate (conservative).
//
// US — anchored on what we can actually place merchants on via Quantum
//   (interchange pass-through + ~0.3% markup) versus flat-rate providers
//   (Stripe/Square/PayPal ~2.9%). US interchange is structurally higher than
//   the UK, so the bands sit higher. Savings measured vs the achievable rate
//   ("vs what we can get you").
const BENCHMARKS = {
  uk: { goodRate: 0.6, typicalRate: 1.0, savingsBaseline: 1.0 },
  us: { goodRate: 2.2, typicalRate: 2.9, savingsBaseline: 2.2 },
} as const;

type Market = keyof typeof BENCHMARKS;
type Verdict = "well-priced" | "mid-market" | "likely-overpaying";

function compareRate(allInRate: number, monthlyVolume: number | null, market: Market) {
  const { goodRate, typicalRate, savingsBaseline } = BENCHMARKS[market];
  const verdict: Verdict =
    allInRate <= goodRate ? "well-priced" : allInRate <= typicalRate ? "mid-market" : "likely-overpaying";
  // Saving is measured against the market's baseline, only when volume is known.
  const monthlyOverpayGBP =
    monthlyVolume !== null
      ? Math.round(Math.max(0, ((allInRate - savingsBaseline) / 100) * monthlyVolume))
      : null;
  return {
    market,
    goodRate,
    typicalRate,
    savingsBaseline,
    monthlyOverpayGBP,
    annualOverpayGBP: monthlyOverpayGBP !== null ? monthlyOverpayGBP * 12 : null,
    verdict,
  };
}

// ---- extraction via Anthropic ------------------------------------------------
interface Extracted {
  provider: string | null;
  period: string | null;
  totalCardVolumeGBP: number | null;
  totalFeesGBP: number | null;
  transactionCount: number | null;
  effectiveRatePct: number | null;
  pricingModel: "interchange++" | "blended" | "unknown";
  mcc: string | null;
  confidence: "high" | "medium" | "low";
}
const safeExtract = (): Extracted => ({
  provider: null, period: null, totalCardVolumeGBP: null, totalFeesGBP: null,
  transactionCount: null, effectiveRatePct: null, pricingModel: "unknown", mcc: null, confidence: "low",
});
const toNum = (v: unknown): number | null => {
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  if (typeof v === "string") { const c = v.replace(/[^0-9.\-]/g, ""); const n = Number(c); return c && Number.isFinite(n) ? n : null; }
  return null;
};
const toStr = (v: unknown): string | null => (typeof v === "string" && v.trim() ? v.trim() : null);
const stripFences = (t: string) => t.replace(/^\s*```(?:json)?\s*/i, "").replace(/\s*```\s*$/i, "").trim();

const SYSTEM_PROMPT =
  "You extract payment-processing fee data from merchant statements. Return ONLY a single valid JSON object. " +
  "No preamble, no explanation, no markdown code fences. If the statement spans multiple months or locations, use the " +
  "TOTAL across the whole statement period. Compute effectiveRatePct as (totalFeesGBP / totalCardVolumeGBP) * 100. " +
  "Set confidence to 'low' if the figures do not reconcile or key numbers are missing, 'medium' if some fields are " +
  "inferred, 'high' only if volume, fees and rate are all clearly stated and consistent.";
const INSTRUCTION =
  "Extract the payment-processing fee data from this merchant statement. Return a single JSON object with keys: " +
  "provider, period, totalCardVolumeGBP, totalFeesGBP, transactionCount, effectiveRatePct, pricingModel " +
  '("interchange++"|"blended"|"unknown"), mcc, confidence ("high"|"medium"|"low").';

async function extractStatement(fileBase64: string, fileType: "pdf" | "csv", csvText: string): Promise<Extracted> {
  try {
    const content =
      fileType === "pdf"
        ? [
            { type: "document", source: { type: "base64", media_type: "application/pdf", data: fileBase64 } },
            { type: "text", text: INSTRUCTION },
          ]
        : [{ type: "text", text: `${INSTRUCTION}\n\n${csvText}` }];

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({ model: "claude-opus-4-8", max_tokens: 1500, system: SYSTEM_PROMPT, messages: [{ role: "user", content }] }),
    });
    if (!res.ok) return safeExtract();
    const payload = (await res.json()) as { content?: Array<{ type?: string; text?: string }> };
    const text = (payload.content ?? []).filter((b) => b?.type === "text" && b.text).map((b) => b.text as string).join("").trim();
    if (!text) return safeExtract();
    const raw = JSON.parse(stripFences(text)) as Record<string, unknown>;
    const totalCardVolumeGBP = toNum(raw.totalCardVolumeGBP);
    const totalFeesGBP = toNum(raw.totalFeesGBP);
    let effectiveRatePct = toNum(raw.effectiveRatePct);
    if (totalFeesGBP !== null && totalCardVolumeGBP !== null && totalCardVolumeGBP > 0) {
      effectiveRatePct = Math.round((totalFeesGBP / totalCardVolumeGBP) * 100 * 1000) / 1000;
    }
    const pm = typeof raw.pricingModel === "string" ? raw.pricingModel : "";
    const conf = typeof raw.confidence === "string" ? raw.confidence : "";
    return {
      provider: toStr(raw.provider),
      period: toStr(raw.period),
      totalCardVolumeGBP,
      totalFeesGBP,
      transactionCount: toNum(raw.transactionCount) === null ? null : Math.round(toNum(raw.transactionCount) as number),
      effectiveRatePct,
      pricingModel: pm === "interchange++" || pm === "blended" ? pm : "unknown",
      mcc: toStr(raw.mcc),
      confidence: conf === "high" || conf === "medium" || conf === "low" ? conf : "low",
    };
  } catch {
    return safeExtract();
  }
}

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return err("Method not allowed", 405);
  if (!ANTHROPIC_API_KEY) return err("Analyser not configured.", 500);

  const ip = clientIp(req);
  const origin = req.headers.get("origin");
  const ua = req.headers.get("user-agent");

  let body: { email?: string; fileBase64?: string; fileType?: "pdf" | "csv"; fileName?: string; csvText?: string; market?: string };
  try { body = await req.json(); } catch { return err("Invalid request body."); }

  const email = (body.email ?? "").trim().toLowerCase();
  const market: Market = body.market === "us" ? "us" : "uk";
  const fileType = body.fileType === "csv" ? "csv" : "pdf";
  const fileBase64 = body.fileBase64 ?? "";
  const csvText = body.csvText ?? "";
  const fileName = (body.fileName ?? "statement").slice(0, 120);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return err("A valid email is required.");
  if (fileType === "pdf" && !fileBase64) return err("No statement file received.");
  if (fileType === "csv" && !csvText) return err("No statement file received.");
  if (fileType === "pdf" && fileBase64.length > MAX_PDF_BASE64) return err("That file is too large.", 413);
  if (fileType === "csv" && csvText.length > MAX_CSV_CHARS) return err("That file is too large.", 413);

  const base: LogRow = { ip, email, origin, user_agent: ua, file_name: fileName, file_type: fileType, status: "" };

  // 1) Origin / automation gate (cheap, before any DB or Anthropic work).
  if (!isAllowedOrigin(origin)) {
    await log({ ...base, status: "blocked_origin", flagged: true, flag_reason: `origin=${origin ?? "none"}` });
    await maybeAlert("off-domain request blocked", `Blocked a request with origin "${origin ?? "none"}" from IP ${ip} — likely automation calling the function directly.`);
    return err("This request could not be verified.", 403);
  }
  if (looksAutomated(ua)) {
    await log({ ...base, status: "blocked_bot", flagged: true, flag_reason: `ua=${(ua ?? "none").slice(0, 80)}` });
    await maybeAlert("suspected bot blocked", `Blocked a request with a suspicious user-agent ("${ua ?? "none"}") from IP ${ip}.`);
    return err("This request could not be verified.", 403);
  }

  // 2) Persistent rate limits — cheap DB counts, before the expensive Anthropic call.
  const now = Date.now();
  const dayAgo = new Date(now - 24 * 60 * 60_000).toISOString();
  const burstAgo = new Date(now - BURST_WINDOW_MIN * 60_000).toISOString();

  if ((await countOk(burstAgo, { ip })) >= BURST_MAX) {
    await log({ ...base, status: "blocked_burst", flagged: true, flag_reason: "burst" });
    return err("You're going a bit fast — please wait a few minutes and try again.", 429);
  }
  if ((await countOk(dayAgo, { ip })) >= MAX_PER_IP_PER_DAY) {
    await log({ ...base, status: "blocked_ip", flag_reason: "ip_daily" });
    return err("Daily limit reached for your network. Please try again tomorrow.", 429);
  }
  if ((await countOk(dayAgo, { email })) >= MAX_PER_EMAIL_PER_DAY) {
    await log({ ...base, status: "blocked_email", flag_reason: "email_daily" });
    return err("You've reached the daily limit for this email. Please try again tomorrow.", 429);
  }
  if ((await countOk(dayAgo, {})) >= MAX_GLOBAL_PER_DAY) {
    await log({ ...base, status: "blocked_global", flagged: true, flag_reason: "global_daily" });
    await maybeAlert("daily global cap reached", `The global daily cap of ${MAX_GLOBAL_PER_DAY} analyses has been hit; further requests are blocked until tomorrow. Review the statement_review_requests table for unusual activity.`);
    return err("We've reached today's analysis limit. Please try again tomorrow.", 429);
  }

  // 3) Record the cost-incurring request BEFORE calling Anthropic so concurrent
  //    requests also count toward the caps. Result fields are filled in after.
  let rowId: string | null = null;
  try {
    const { data } = await supabaseAdmin.from(TABLE).insert({ ...base, status: "ok" }).select("id").single();
    rowId = (data as { id?: string } | null)?.id ?? null;
  } catch { /* logging must not block the analysis */ }

  // 4) Extract + compare.
  const extracted = await extractStatement(fileBase64, fileType, csvText);
  const comparison =
    extracted.effectiveRatePct !== null
      ? compareRate(extracted.effectiveRatePct, extracted.totalCardVolumeGBP, market)
      : null;
  if (rowId) {
    try {
      await supabaseAdmin.from(TABLE)
        .update({ effective_rate: extracted.effectiveRatePct, verdict: comparison?.verdict ?? null })
        .eq("id", rowId);
    } catch { /* best-effort */ }
  }

  // Email the statement + result to the team (best-effort; never block the result).
  try {
    const rows = Object.entries(extracted).map(([k, v]) => `<tr><td><b>${k}</b></td><td>${v ?? "—"}</td></tr>`).join("");
    const verdictLine = comparison ? `Verdict: ${comparison.verdict} — indicative annual overpay ~£${comparison.annualOverpayGBP.toLocaleString()}` : "No comparison (insufficient figures extracted).";
    await resend.emails.send({
      from: "ChosePayments <leads@chosepayments.com>",
      to: TEAM_EMAIL,
      reply_to: email,
      subject: `Statement submitted — ${email}`,
      html: `<h2>New statement review</h2><p>From: <b>${email}</b></p><p>${verdictLine}</p><table border="1" cellpadding="6" style="border-collapse:collapse">${rows}</table>`,
      attachments:
        fileType === "pdf"
          ? [{ filename: fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`, content: fileBase64 }]
          : [{ filename: fileName.endsWith(".csv") ? fileName : `${fileName}.csv`, content: btoa(unescape(encodeURIComponent(csvText))) }],
    });
  } catch (_e) {
    // swallow email errors — the user still gets their result
  }

  return ok({ analysis: { ...extracted, comparison } });
});
