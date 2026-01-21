import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import {
  corsHeaders,
  handleCorsOptions,
  successResponse,
  errorResponse,
  getClientIp,
  checkIpRateLimit,
  escapeHtml,
  sanitizeString,
  isValidEmail,
} from "../shared/index.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

interface ContactEmailRequest {
  name: string;
  email: string;
  businessName: string;
  message: string;
  honeypot?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return handleCorsOptions();
  }

  try {
    const clientIp = getClientIp(req);
    if (!checkIpRateLimit(clientIp, 5)) {
      console.log(`Rate limit exceeded for IP: ${clientIp}`);
      return errorResponse("Too many requests. Please try again later.", 429);
    }

    const { name, email, businessName, message, honeypot }: ContactEmailRequest = await req.json();

    // Honeypot check - if filled, it's likely a bot
    if (honeypot) {
      console.log("Honeypot triggered, rejecting submission");
      return successResponse(); // Return success to not alert bots
    }

    // Sanitize and validate inputs
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

    return successResponse();
  } catch (error: unknown) {
    console.error("Error in send-contact-email function:", error);
    return errorResponse("An error occurred. Please try again later.", 500);
  }
};

serve(handler);
