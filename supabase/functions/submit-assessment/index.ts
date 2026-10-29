// End of the risk assessment: the visitor gives a name and email, and only then
// is the recommendation calculated. It is stored with the lead, emailed to the
// visitor and sent to hello@ — and never returned to the browser.
//
// After validation and rate limiting, the response is always { success: true }.
// A failed insert or email send is logged (and recorded on the lead row where
// there is one) but not reported to the caller.

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import {
  corsHeaders as sharedCorsHeaders,
  successResponse as sharedSuccessResponse,
  errorResponse as sharedErrorResponse,
} from "../_shared/cors.ts";
import { adminClient, checkRateLimit, getClientIp } from "../_shared/rateLimit.ts";
import { getRecommendations, validateQuizAnswers } from "../_shared/recommendationEngine.ts";
import type { RecommendationResult } from "../_shared/recommendationEngine.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { buildLeadEmail, buildResultsEmail } from "./emails.ts";
import type { AssessmentContext, RawAnswers } from "./emails.ts";
import { toSegment } from "./results.ts";

// Created on first send rather than at load: the constructor throws when
// RESEND_API_KEY is unset, which would take the whole function down and lose
// the lead along with the email.
let resendClient: Resend | null = null;
const getResend = (): Resend => (resendClient ??= new Resend(Deno.env.get("RESEND_API_KEY")));

const RESULTS_FROM = "ChosePayments <hello@chosepayments.com>";
const LEAD_FROM = "ChosePayments <leads@chosepayments.com>";
const LEAD_TO = "hello@chosepayments.com";

// ============================================================================
// VALIDATION
// ============================================================================

const sanitizeString = (value: unknown, maxLength = 200): string => {
  if (value === null || value === undefined) return "";
  return String(value).trim().slice(0, maxLength).replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
};

const sanitizeArray = (value: unknown, maxItems = 10, maxItemLength = 200): string[] =>
  Array.isArray(value) ? value.slice(0, maxItems).map((v) => sanitizeString(v, maxItemLength)).filter(Boolean) : [];

// Same rules as the form on the results page.
const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254 && email.length >= 5;

const isValidName = (name: string): boolean => name.length >= 2 && !/^[0-9]+$/.test(name);

const readRawAnswers = (value: unknown): RawAnswers => {
  const r = (value && typeof value === "object" ? value : {}) as Record<string, unknown>;
  const s = (key: string) => sanitizeString(r[key]);
  return {
    salesChannel: s("salesChannel"),
    businessType: s("businessType"),
    industry: s("industry"),
    monthlyVolume: s("monthlyVolume"),
    avgTransaction: s("avgTransaction"),
    location: s("location"),
    priorities: sanitizeArray(r.priorities),
    deliveryTimeline: s("deliveryTimeline"),
    previousRestriction: s("previousRestriction"),
    platform: s("platform"),
    currentProcessor: s("currentProcessor"),
    painPoints: sanitizeArray(r.painPoints),
    terminalType: s("terminalType"),
    buyingIntent: s("buyingIntent"),
    contactTime: s("contactTime"),
    marketplaceModel: s("marketplaceModel"),
    marketplaceChallenge: s("marketplaceChallenge"),
    revenueModel: s("revenueModel"),
    billingChallenge: s("billingChallenge"),
    locationCount: s("locationCount"),
    salesMix: s("salesMix"),
    declineHistory: s("declineHistory"),
    volumeTier: s("volumeTier"),
    businessModel: s("businessModel"),
    challenges: sanitizeArray(r.challenges),
  };
};

// ============================================================================
// EMAIL
// ============================================================================

type SendStatus = "sent" | "failed";

/**
 * Sends through Resend and reports the outcome instead of throwing. The SDK
 * returns { data, error } rather than rejecting for API errors, so both paths
 * have to be checked or a rejected send would be logged as a success.
 */
const send = async (label: string, payload: Parameters<Resend["emails"]["send"]>[0]): Promise<SendStatus> => {
  try {
    const res = await getResend().emails.send(payload) as { data?: { id?: string } | null; error?: unknown };
    if (res?.error) {
      console.error(`[submit-assessment] ${label} email rejected by Resend:`, res.error);
      return "failed";
    }
    console.log(`[submit-assessment] ${label} email sent:`, res?.data?.id);
    return "sent";
  } catch (err) {
    console.error(`[submit-assessment] ${label} email failed:`, err);
    return "failed";
  }
};

// ============================================================================
// HANDLER
// ============================================================================

const handler = async (req: Request): Promise<Response> => {
  const corsHeaders = sharedCorsHeaders(req);
  const successResponse = () => sharedSuccessResponse(req);
  const errorResponse = (error: string, status = 400) => sharedErrorResponse(req, error, status);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const ip = getClientIp(req);
  const admin = adminClient();

  const ipLimit = await checkRateLimit(admin, { fn: "submit-assessment", perIp: 3, windowMinutes: 1 }, ip);
  if (!ipLimit.allowed) {
    console.warn(`[submit-assessment] rate limit exceeded for IP: ${ip}`);
    return errorResponse(ipLimit.message || "Too many requests. Please try again later.", 429);
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return errorResponse("Invalid JSON format", 400);
  }

  // Bots fill every field; people never see this one.
  if (body._honeypot) {
    console.warn(`[submit-assessment] honeypot triggered from IP: ${ip}`);
    return successResponse();
  }

  const fullName = sanitizeString(body.fullName, 100);
  const email = sanitizeString(body.email, 254).toLowerCase();
  if (!fullName || !isValidName(fullName)) return errorResponse("Please enter your name.", 400);
  if (!isValidEmail(email)) return errorResponse("Please enter a valid email address.", 400);

  const answers = validateQuizAnswers(body.answers);
  if (!answers) {
    console.warn("[submit-assessment] invalid quiz answers structure");
    return errorResponse("Invalid quiz data.", 400);
  }

  const emailLimit = await checkRateLimit(
    admin,
    { fn: "submit-assessment:email", perEmail: 3, emailWindowMinutes: 60 },
    ip,
    email,
  );
  if (!emailLimit.allowed) {
    console.warn(`[submit-assessment] email rate limit exceeded for: ${email}`);
    return errorResponse(emailLimit.message || "Too many requests. Please try again later.", 429);
  }

  try {
    const raw = readRawAnswers(body.raw);
    const market = sanitizeString(body.market, 10) === "US" ? "US" : "UK";
    const segment = toSegment(answers.segment);

    let recommendation: RecommendationResult | null = null;
    try {
      recommendation = getRecommendations(answers);
    } catch (err) {
      // Still capture the lead; it goes to manual review.
      console.error("[submit-assessment] recommendation engine failed:", err);
    }

    // Store first, so the lead survives even if both emails fail.
    let leadId: string | null = null;
    const { data: inserted, error: insertError } = await admin
      .from("assessment_leads")
      .insert({
        full_name: fullName,
        email,
        market,
        segment,
        recommended_provider: recommendation?.bestMatch.name ?? null,
        answers: { engine: answers, raw },
        recommendation,
        ip,
      })
      .select("id")
      .single();
    if (insertError) {
      console.error("[submit-assessment] failed to store lead:", insertError);
    } else {
      leadId = inserted?.id ?? null;
    }

    const ctx: AssessmentContext = {
      fullName,
      firstName: fullName.split(/\s+/)[0] || fullName,
      email,
      market,
      segment,
      raw,
      recommendation,
      leadId,
      submittedAt: new Date().toISOString(),
      ip,
    };

    const results = buildResultsEmail(ctx);
    const lead = buildLeadEmail(ctx);

    const [resultsStatus, leadStatus] = await Promise.all([
      send("results", {
        from: RESULTS_FROM,
        to: email,
        reply_to: LEAD_TO,
        subject: results.subject,
        html: results.html,
        text: results.text,
      }),
      send("lead", {
        from: LEAD_FROM,
        to: LEAD_TO,
        reply_to: email,
        subject: lead.subject,
        html: lead.html,
      }),
    ]);

    if (leadId) {
      const { error: updateError } = await admin
        .from("assessment_leads")
        .update({ results_email_status: resultsStatus, lead_email_status: leadStatus })
        .eq("id", leadId);
      if (updateError) console.error("[submit-assessment] failed to record email status:", updateError);
    }

    return successResponse();
  } catch (err) {
    console.error("[submit-assessment] unexpected error:", err);
    return errorResponse("Something went wrong.", 500);
  }
};

serve(handler);
