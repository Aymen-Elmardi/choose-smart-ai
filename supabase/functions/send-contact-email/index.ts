import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { adminClient, checkRateLimit, getClientIp } from "../_shared/rateLimit.ts";
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
  /** "newsletter" swaps the auto-reply for signup wording. Defaults to the
   *  contact-form copy so existing callers are unaffected. */
  type?: "contact" | "newsletter";
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientIp = getClientIp(req);
    const limit = await checkRateLimit(adminClient(), { fn: "send-contact-email", perIp: 5, windowMinutes: 1 }, clientIp);
    if (!limit.allowed) {
      console.log(`Rate limit exceeded for IP: ${clientIp}`);
      return errorResponse("Too many requests. Please try again later.", 429);
    }

    const { name, email, businessName, message, honeypot, type }: ContactEmailRequest = await req.json();
    const isNewsletter = type === "newsletter";

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

    // Sender must be on the verified chosepayments.com domain. The shared
    // sandbox address (onboarding@resend.dev) only delivers to the Resend
    // account owner's own address, so every other recipient was rejected —
    // silently, because the results below were previously not inspected.
    const notification = await resend.emails.send({
      from: "ChosePayments <leads@chosepayments.com>",
      to: ["hello@chosepayments.com"],
      reply_to: sanitizedEmail,
      subject: isNewsletter
        ? `New newsletter subscriber: ${escapeHtml(sanitizedEmail)}`
        : `New contact form message from ${escapeHtml(sanitizedName)}`,
      html: isNewsletter
        ? `
        <h2>New Newsletter Subscriber</h2>
        <p><strong>Email:</strong> ${escapeHtml(sanitizedEmail)}</p>
        <p>${escapeHtml(sanitizedMessage)}</p>
      `
        : `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(sanitizedName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(sanitizedEmail)}</p>
        <p><strong>Business:</strong> ${escapeHtml(sanitizedBusinessName)}</p>
        <hr />
        <h3>Message:</h3>
        <p>${escapeHtml(sanitizedMessage).replace(/\n/g, "<br />")}</p>
      `,
    });

    const autoReply = await resend.emails.send({
      from: "ChosePayments <hello@chosepayments.com>",
      to: [sanitizedEmail],
      subject: isNewsletter ? "You're subscribed" : "We received your message",
      html: isNewsletter
        ? `
        <h2>You're on the list</h2>
        <p>Thanks for subscribing to the ChosePayments newsletter. We'll send occasional notes on payment processor pricing, risk and provider behaviour, written for operators. No sales pitches.</p>
        <p>Start here: <a href="https://chosepayments.com/insights">our latest insights</a>.</p>
        <br />
        <p>The ChosePayments Team</p>
      `
        : `
        <h2>Thank you for contacting ChosePayments, ${escapeHtml(sanitizedName)}!</h2>
        <p>We have received your message and will get back to you as soon as possible, usually within one working day.</p>
        <p>In the meantime, you might find our <a href="https://chosepayments.com/insights">payment insights</a> helpful.</p>
        <br />
        <p>Best regards,</p>
        <p>The ChosePayments Team</p>
      `,
    });

    // The Resend SDK resolves with { data, error } instead of throwing, so an
    // unchecked `await` reports success even when nothing was delivered. Treat a
    // failed notification as a failed request; a failed auto-reply is logged but
    // not fatal, since the submission itself already reached the inbox.
    if (notification.error) {
      console.error("Resend rejected the notification email:", notification.error);
      return errorResponse("Could not deliver your message. Please email hello@chosepayments.com.", 502);
    }
    if (autoReply.error) {
      console.error("Resend rejected the auto-reply email:", autoReply.error);
    }

    console.log("Emails sent:", { notification: notification.data?.id, autoReply: autoReply.data?.id });
    return successResponse();
  } catch (error: unknown) {
    console.error("Error in send-contact-email function:", error);
    return errorResponse("An error occurred. Please try again later.", 500);
  }
};

serve(handler);
