// ChosePayments Confirmation Email Function
// Sends confirmation email to user after successful quiz submission

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import {
  handleCorsOptions,
  successResponse,
  errorResponse,
  getClientIp,
  checkIpRateLimit,
  checkEmailRateLimit,
  escapeHtml,
  isValidEmail,
  extractFirstName,
} from "../shared/index.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

interface ConfirmationEmailRequest {
  email: string;
  firstName: string;
  _honeypot?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send-confirmation-email");

  if (req.method === "OPTIONS") {
    return handleCorsOptions();
  }

  const clientIp = getClientIp(req);
  console.log(`Request from IP: ${clientIp}`);

  if (!checkIpRateLimit(clientIp, 5)) {
    console.warn(`Rate limit exceeded for IP: ${clientIp}`);
    return errorResponse("Too many requests. Please try again later.", 429);
  }

  try {
    const rawData = await req.json();

    // Honeypot check - if filled, it's a bot
    if (rawData._honeypot) {
      console.warn(`Honeypot triggered from IP: ${clientIp}`);
      return successResponse(); // Return success to not alert the bot
    }

    // Validate required fields
    if (!rawData.email || !rawData.firstName) {
      console.warn("Missing required fields for confirmation email");
      return errorResponse("Email and first name are required.", 400);
    }

    const email = String(rawData.email).trim().slice(0, 254);
    const firstName = extractFirstName(String(rawData.firstName).trim().slice(0, 100));

    // Validate email format
    if (!isValidEmail(email)) {
      console.warn(`Invalid email format: ${email}`);
      return errorResponse("Please provide a valid email address.", 400);
    }

    // Check email rate limit
    if (!checkEmailRateLimit(email)) {
      console.warn(`Email rate limit exceeded for: ${email}`);
      return errorResponse("Too many emails sent to this address. Please try again later.", 429);
    }

    console.log(`Sending confirmation email to: ${email}`);

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
      line-height: 1.7; 
      color: #1a1a1a; 
      max-width: 600px; 
      margin: 0 auto; 
      padding: 40px 20px;
      background-color: #ffffff;
    }
    .greeting { 
      font-size: 18px; 
      margin-bottom: 24px;
    }
    p { 
      margin: 0 0 20px 0; 
      font-size: 16px;
      color: #374151;
    }
    .signature { 
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #e5e7eb;
    }
    .company-name {
      font-weight: 600;
      color: #1a1a1a;
    }
    .email-link {
      color: #3b82f6;
      text-decoration: none;
    }
    .email-link:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <p class="greeting">Hi ${escapeHtml(firstName)},</p>
  
  <p>Thanks for taking a moment to answer the questions — we've got everything we need.</p>
  
  <p>We've reviewed your answers and shared the right context with the provider that best fits your business. There's nothing you need to do right now.</p>
  
  <p>You should hear back within 24 hours with next steps or any follow-up they may need.</p>
  
  <p>If at any point this doesn't feel like the right fit, just reply to this email. We'll step in and help you find a better option.</p>
  
  <p>Our job is to make sure you don't get stuck with the wrong setup.</p>
  
  <div class="signature">
    <p class="company-name">ChosePayments</p>
    <p><a href="mailto:hello@chosepayments.com" class="email-link">hello@chosepayments.com</a></p>
  </div>
</body>
</html>
    `;

    const emailResponse = await resend.emails.send({
      from: "ChosePayments <hello@chosepayments.com>",
      to: email,
      subject: "We've got your details",
      html: emailHtml,
    });

    console.log("Confirmation email sent successfully:", emailResponse);

    return successResponse({ emailResponse });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in send-confirmation-email function:", error);
    return errorResponse(errorMessage, 500);
  }
};

serve(handler);
