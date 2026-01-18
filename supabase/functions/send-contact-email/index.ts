import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Rate limiting configuration
const rateLimitStore = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5; // 5 requests per minute per IP

// Get client IP address
const getClientIp = (req: Request): string => {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
         req.headers.get("x-real-ip") ||
         "unknown";
};

// Check rate limit for a given IP
const checkRateLimit = (clientIp: string): boolean => {
  const now = Date.now();
  const record = rateLimitStore.get(clientIp);

  // Cleanup old entries (simple garbage collection)
  if (rateLimitStore.size > 1000) {
    for (const [ip, data] of rateLimitStore.entries()) {
      if (now - data.timestamp > RATE_LIMIT_WINDOW_MS) {
        rateLimitStore.delete(ip);
      }
    }
  }

  if (!record) {
    rateLimitStore.set(clientIp, { count: 1, timestamp: now });
    return true;
  }

  if (now - record.timestamp > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(clientIp, { count: 1, timestamp: now });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
};

interface ContactEmailRequest {
  name: string;
  email: string;
  businessName: string;
  message: string;
  honeypot?: string; // Honeypot field for bot detection
}

// HTML escape function to prevent XSS in email content
const escapeHtml = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// Sanitize string input
const sanitizeString = (str: string | undefined | null, maxLength: number = 500): string => {
  if (!str || typeof str !== 'string') return '';
  return str.trim().slice(0, maxLength);
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check rate limit
    const clientIp = getClientIp(req);
    if (!checkRateLimit(clientIp)) {
      console.log(`Rate limit exceeded for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { name, email, businessName, message, honeypot }: ContactEmailRequest = await req.json();

    // Honeypot check - if filled, it's likely a bot
    if (honeypot) {
      console.log("Honeypot triggered, rejecting submission");
      return new Response(
        JSON.stringify({ success: true }), // Return success to not alert bots
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Sanitize and validate inputs
    const sanitizedName = sanitizeString(name, 100);
    const sanitizedEmail = sanitizeString(email, 255);
    const sanitizedBusinessName = sanitizeString(businessName, 200);
    const sanitizedMessage = sanitizeString(message, 2000);

    if (!sanitizedName || !sanitizedEmail || !sanitizedMessage) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Sending contact form email from:", sanitizedEmail);

    // Send notification email to ChosePayments
    const notificationEmail = await resend.emails.send({
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

    console.log("Notification email sent:", notificationEmail);

    // Send confirmation email to the user
    const confirmationEmail = await resend.emails.send({
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

    console.log("Confirmation email sent:", confirmationEmail);

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred. Please try again later." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
