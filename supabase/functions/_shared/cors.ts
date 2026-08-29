// Shared CORS handling for the edge functions.
//
// Every function previously returned `Access-Control-Allow-Origin: *`. Combined
// with verify_jwt = false, that let any page on any origin call them directly
// from a browser — including the two that send email through Resend.
//
// Reflecting only known origins does not stop a determined script (a non-browser
// client sets whatever Origin header it likes, and CORS is enforced by the
// browser, not the server). It does stop the cheap case: someone else's page
// driving these endpoints with a visitor's browser. The durable rate limits in
// rateLimit.ts are the actual ceiling.

const ALLOWED_HOSTS = [
  "chosepayments.com",
  "www.chosepayments.com",
  "localhost",
  "127.0.0.1",
];

export const isAllowedOrigin = (origin: string | null): boolean => {
  if (!origin) return false;
  try {
    const host = new URL(origin).hostname;
    return ALLOWED_HOSTS.includes(host) || host.endsWith(".chosepayments.com");
  } catch {
    return false;
  }
};

/**
 * CORS headers for a request. Echoes the caller's origin when it is one of ours,
 * and otherwise names the canonical origin so the browser blocks the response.
 *
 * `Vary: Origin` matters here: without it a shared cache could serve one
 * origin's Allow-Origin header to another.
 */
export const corsHeaders = (req: Request): Record<string, string> => {
  const origin = req.headers.get("origin");
  return {
    "Access-Control-Allow-Origin": isAllowedOrigin(origin)
      ? (origin as string)
      : "https://chosepayments.com",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
};

export const jsonResponse = (
  req: Request,
  data: unknown,
  status = 200,
): Response =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(req) },
  });

export const successResponse = (req: Request, data: Record<string, unknown> = {}) =>
  jsonResponse(req, { success: true, ...data }, 200);

export const errorResponse = (req: Request, error: string, status = 400) =>
  jsonResponse(req, { success: false, error }, status);
