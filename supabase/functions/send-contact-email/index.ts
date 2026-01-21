import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// ============================================================================
// SHARED UTILITIES (inlined for edge function bundling)
// ============================================================================

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const jsonResponse = (data: unknown, status: number = 200): Response => {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
};

const successResponse = (data: Record<string, unknown> = {}): Response => jsonResponse({ success: true, ...data }, 200);
const errorResponse = (error: string, status: number = 400): Response => jsonResponse({ success: false, error }, status);

const getClientIp = (req: Request): string => {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
};

const rateLimitStore = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 5;

const checkIpRateLimit = (clientIp: string): boolean => {
  const now = Date.now();
  const record = rateLimitStore.get(clientIp);
  if (rateLimitStore.size > 1000) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (now - value.timestamp > RATE_LIMIT_WINDOW_MS) rateLimitStore.delete(key);
    }
  }
  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(clientIp, { count: 1, timestamp: now });
    return true;
  }
  if (record.count >= RATE_LIMIT_MAX) return false;
  record.count++;
  return true;
};

const escapeHtml = (str: string): string => {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
};

const sanitizeString = (value: unknown, maxLength: number = 500): string => {
  if (value === null || value === undefined || value === "") return "";
  return String(value).trim().slice(0, maxLength).replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
};

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254 && email.length >= 5;
};

// ============================================================================
// HANDLER
// ============================================================================

interface ContactEmailRequest {
  name: string;
  email: string;
  businessName: string;
  message: string;
  honeypot?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientIp = getClientIp(req);
    if (!checkIpRateLimit(clientIp)) {
      console.log(`Rate limit exceeded for IP: ${clientIp}`);
      return errorResponse("Too many requests. Please try again later.", 429);
    }

    const { name, email, businessName, message, honeypot }: ContactEmailRequest = await req.json();

    if (honeypot) {
      console.log("Honeypot triggered, rejecting submission");
      return successResponse();
    }

    const sanitizedName = sanitizeString(name, 100);
    const sanitizedEmail = sanitizeString(email, 255);
    const sanitizedBusinessName = sanitizeString(businessName, 200);
    const sanitizedMessage = sanitizeString(message, 2000);

    if (!sanitizedName || !sanitizedEmail || !sanitizedMessage) {
      return errorResponse("Missing required fields", 400);
    }

    if (!isValidEmail(sanitizedEmail)) {
      return errorResponse("Invalid email format", 400);
    }

    console.log("Sending contact form email from:", sanitizedEmail);

    await resend.emails.send({
      from: "ChosePayments Contact <onboarding@resend.dev>",
      to: ["hello@chosepayments.com"],
      reply_to: sanitizedEmail,
      subject: `New contact form message from ${escapeHtml(sanitizedName)}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(sanitizedName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(sanitizedEmail)}</p>
        <p><strong>Business:</strong> ${escapeHtml(sanitizedBusinessName)}</p>
        <hr />
        <h3>Message:</h3>
        <p>${escapeHtml(sanitizedMessage).replace(/\n/g, "<br />")}</p>
      `,
    });

    await resend.emails.send({
      from: "ChosePayments <onboarding@resend.dev>",
      to: [sanitizedEmail],
      subject: "We received your message",
      html: `
        <h2>Thank you for contacting ChosePayments, ${escapeHtml(sanitizedName)}!</h2>
        <p>We have received your message and will get back to you as soon as possible, usually within one working day.</p>
        <p>In the meantime, you might find our <a href="https://chosepayments.com/insights">payment insights</a> helpful.</p>
        <br />
        <p>Best regards,</p>
        <p>The ChosePayments Team</p>
      `,
    });

    return successResponse();
  } catch (error: unknown) {
    console.error("Error in send-contact-email function:", error);
    return errorResponse("An error occurred. Please try again later.", 500);
  }
};

serve(handler);
