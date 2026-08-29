// Durable rate limiting shared by the public edge functions.
//
// Replaces the module-level `Map` each function used to keep. Edge functions are
// ephemeral and horizontally scaled: in-process counters reset on every cold
// start and are not shared between concurrent isolates, so the effective ceiling
// was the configured max multiplied by however many isolates were warm. Counting
// in Postgres instead gives one ledger every isolate agrees on.
//
// Modelled on the limiter already running in analyze-statement.
//
// Files under _shared/ are not deployed as functions; they are bundled into each
// function that imports them.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export type Outcome =
  | "ok"
  | "blocked_ip"
  | "blocked_email"
  | "blocked_global"
  | "blocked_origin";

export interface LimitConfig {
  /** Edge function name, used to scope every count. */
  fn: string;
  /** Max requests per IP inside windowMinutes. */
  perIp?: number;
  /** Max requests per email address inside emailWindowMinutes. */
  perEmail?: number;
  /** Ceiling across all callers inside windowMinutes — the spend wall. */
  global?: number;
  windowMinutes?: number;
  emailWindowMinutes?: number;
}

export interface LimitResult {
  allowed: boolean;
  outcome: Outcome;
  /** Safe to show a caller: says which ceiling was hit, not the numbers. */
  message?: string;
}

const TABLE = "rate_limit_events";

export const getClientIp = (req: Request): string =>
  req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  req.headers.get("x-real-ip") ||
  "unknown";

/**
 * Service-role client. SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are injected
 * into every deployed function by Supabase, so no extra secret is needed.
 */
export const adminClient = () =>
  createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  );

const since = (minutes: number) =>
  new Date(Date.now() - minutes * 60_000).toISOString();

type Admin = ReturnType<typeof adminClient>;

const countSince = async (
  admin: Admin,
  fn: string,
  sinceISO: string,
  match: Record<string, string>,
): Promise<number> => {
  let q = admin
    .from(TABLE)
    .select("id", { count: "exact", head: true })
    .eq("fn", fn)
    .eq("outcome", "ok")
    .gte("created_at", sinceISO);
  for (const [k, v] of Object.entries(match)) q = q.eq(k, v);
  const { count, error } = await q;
  if (error) throw error;
  // `head: true` sends a HEAD request, so a failed count comes back with no body
  // for the client to parse an error out of: both `error` and `count` end up
  // null. Treating that as 0 would silently read "no requests yet" on every
  // ledger failure — the limiter would stop limiting and say nothing. A
  // successful count is always a number, so null here means the read failed.
  if (typeof count !== "number") {
    throw new Error("rate limit count unavailable (no count returned)");
  }
  return count;
};

/**
 * Records the request so later calls can count it. Never throws — a ledger write
 * failing must not take down the request it was measuring.
 */
export const recordEvent = async (
  admin: Admin,
  fn: string,
  outcome: Outcome,
  ip: string,
  email?: string,
): Promise<void> => {
  try {
    await admin.from(TABLE).insert({ fn, ip, email: email ?? null, outcome });
  } catch {
    /* logging must never block */
  }
};

/**
 * Checks every configured ceiling and records the outcome.
 *
 * Fails OPEN. If the ledger is unreachable the request is allowed through:
 * a database blip should degrade abuse protection, not take the contact form
 * offline. The caller still gets a working endpoint, and the miss is logged.
 */
export const checkRateLimit = async (
  admin: Admin,
  cfg: LimitConfig,
  ip: string,
  email?: string,
): Promise<LimitResult> => {
  const {
    fn,
    perIp,
    perEmail,
    global,
    windowMinutes = 1,
    emailWindowMinutes = 60,
  } = cfg;

  try {
    if (perIp !== undefined) {
      if ((await countSince(admin, fn, since(windowMinutes), { ip })) >= perIp) {
        await recordEvent(admin, fn, "blocked_ip", ip, email);
        return {
          allowed: false,
          outcome: "blocked_ip",
          message: "Too many requests. Please wait a moment and try again.",
        };
      }
    }

    if (perEmail !== undefined && email) {
      const used = await countSince(admin, fn, since(emailWindowMinutes), { email });
      if (used >= perEmail) {
        await recordEvent(admin, fn, "blocked_email", ip, email);
        return {
          allowed: false,
          outcome: "blocked_email",
          message: "This email address has submitted too many requests recently.",
        };
      }
    }

    if (global !== undefined) {
      if ((await countSince(admin, fn, since(windowMinutes), {})) >= global) {
        await recordEvent(admin, fn, "blocked_global", ip, email);
        return {
          allowed: false,
          outcome: "blocked_global",
          message: "This service is temporarily busy. Please try again shortly.",
        };
      }
    }
  } catch (err) {
    console.error(`[${fn}] rate limit ledger unavailable, allowing request:`, err);
    return { allowed: true, outcome: "ok" };
  }

  await recordEvent(admin, fn, "ok", ip, email);
  return { allowed: true, outcome: "ok" };
};
