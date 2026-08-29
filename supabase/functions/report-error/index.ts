// report-error — receives client-side error reports and writes them to
// public.error_events.
//
// The site is a static export with no server, so a runtime failure in the
// browser is invisible unless the browser says something. This is the endpoint
// it says it to.
//
// It is public and unauthenticated like the other functions, so it is rate
// limited on the same durable ledger, and everything it stores is truncated.

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { adminClient, checkRateLimit, getClientIp } from "../_shared/rateLimit.ts";
import {
  corsHeaders as sharedCorsHeaders,
  successResponse as sharedSuccessResponse,
  errorResponse as sharedErrorResponse,
} from "../_shared/cors.ts";

const KINDS = ["boundary", "unhandled_rejection", "window_error"] as const;
type Kind = (typeof KINDS)[number];

/** Trims to a sane length and strips control characters. */
const clean = (value: unknown, max: number): string =>
  String(value ?? "")
    .slice(0, max)
    // deno-lint-ignore no-control-regex
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .trim();

const handler = async (req: Request): Promise<Response> => {
  const corsHeaders = sharedCorsHeaders(req);
  const successResponse = () => sharedSuccessResponse(req);
  const errorResponse = (error: string, status = 400) =>
    sharedErrorResponse(req, error, status);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIp = getClientIp(req);

  // A page in a crash loop could report repeatedly. 30/min per IP is generous
  // for a real visitor and still caps a stuck tab.
  const admin = adminClient();
  const limit = await checkRateLimit(
    admin,
    { fn: "report-error", perIp: 30, windowMinutes: 1 },
    clientIp,
  );
  if (!limit.allowed) {
    // Deliberately 204 rather than 429: the caller is an error handler and must
    // never treat this as a new failure to report.
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const body = await req.json();

    const kind = clean(body.kind, 40);
    if (!KINDS.includes(kind as Kind)) return errorResponse("Unknown kind", 400);

    const message = clean(body.message, 500);
    if (!message) return errorResponse("Missing message", 400);

    const { error } = await admin.from("error_events").insert({
      kind,
      message,
      stack: clean(body.stack, 4000) || null,
      url: clean(body.url, 300) || null,
      user_agent: clean(req.headers.get("user-agent"), 300) || null,
      release: clean(body.release, 60) || null,
      ip: clientIp,
    });

    if (error) {
      console.error("report-error: insert failed:", error);
      return errorResponse("Could not record the report", 500);
    }

    return successResponse();
  } catch (err) {
    console.error("report-error: bad request:", err);
    return errorResponse("Invalid request body", 400);
  }
};

serve(handler);
