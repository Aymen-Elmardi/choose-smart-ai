// ChosePayments Confirmation Email Function
// Sends confirmation email to user after successful quiz submission
// Updated to include report download link and provider notification

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting: in-memory store
const rateLimitStore = new Map<string, { count: number; timestamp: number }>();
const emailRateLimitStore = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5; // Max 5 requests per minute per IP
const EMAIL_RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const EMAIL_RATE_LIMIT_MAX = 3; // Max 3 emails per hour to same address

interface ConfirmationEmailRequest {
  email: string;
  firstName: string;
  providerName?: string;
  matchScore?: number;
  reportUrl?: string;
  _honeypot?: string; // Honeypot field - should be empty
}

// HTML escape function
const escapeHtml = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// Extract first name from full name
const extractFirstName = (fullName: string): string => {
  const trimmed = fullName.trim();
  const firstName = trimmed.split(/\s+/)[0];
  return firstName || trimmed;
};

// Validate email format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254 && email.length >= 5;
};

// Get client IP from request
const getClientIp = (req: Request): string => {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
         req.headers.get("x-real-ip") ||
         "unknown";
};

// Check rate limit by IP
const checkRateLimit = (clientIp: string): boolean => {
  const now = Date.now();
  const record = rateLimitStore.get(clientIp);
  
  // Clean up old entries
  if (rateLimitStore.size > 1000) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (now - value.timestamp > RATE_LIMIT_WINDOW_MS) {
        rateLimitStore.delete(key);
      }
    }
  }
  
  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(clientIp, { count: 1, timestamp: now });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  record.count++;
  return true;
};

// Check email rate limit (prevent email bombing)
const checkEmailRateLimit = (email: string): boolean => {
  const now = Date.now();
  const normalizedEmail = email.toLowerCase().trim();
  const record = emailRateLimitStore.get(normalizedEmail);
  
  // Clean up old entries
  if (emailRateLimitStore.size > 5000) {
    for (const [key, value] of emailRateLimitStore.entries()) {
      if (now - value.timestamp > EMAIL_RATE_LIMIT_WINDOW_MS) {
        emailRateLimitStore.delete(key);
      }
    }
  }
  
  if (!record || now - record.timestamp > EMAIL_RATE_LIMIT_WINDOW_MS) {
    emailRateLimitStore.set(normalizedEmail, { count: 1, timestamp: now });
    return true;
  }
  
  if (record.count >= EMAIL_RATE_LIMIT_MAX) {
    return false;
  }
  
  record.count++;
  return true;
};

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send-confirmation-email");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting check
  const clientIp = getClientIp(req);
  console.log(`Request from IP: ${clientIp}`);
  
  if (!checkRateLimit(clientIp)) {
    console.warn(`Rate limit exceeded for IP: ${clientIp}`);
    return new Response(
      JSON.stringify({ success: false, error: "Too many requests. Please try again later." }),
      {
        status: 429,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }

  try {
    const rawData = await req.json();
    
    // Honeypot check - if filled, it's a bot
    if (rawData._honeypot) {
      console.warn(`Honeypot triggered from IP: ${clientIp}`);
      // Return success to not alert the bot
      return new Response(
        JSON.stringify({ success: true }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    // Validate required fields
    if (!rawData.email || !rawData.firstName) {
      console.warn("Missing required fields for confirmation email");
      return new Response(
        JSON.stringify({ success: false, error: "Email and first name are required." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const email = String(rawData.email).trim().slice(0, 254);
    const firstName = extractFirstName(String(rawData.firstName).trim().slice(0, 100));
    const providerName = rawData.providerName ? String(rawData.providerName).trim().slice(0, 100) : null;
    const matchScore = typeof rawData.matchScore === 'number' ? rawData.matchScore : null;
    const reportUrl = rawData.reportUrl ? String(rawData.reportUrl).trim().slice(0, 500) : null;
    
    // Validate email format
    if (!isValidEmail(email)) {
      console.warn(`Invalid email format: ${email}`);
      return new Response(
        JSON.stringify({ success: false, error: "Please provide a valid email address." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    // Check email rate limit
    if (!checkEmailRateLimit(email)) {
      console.warn(`Email rate limit exceeded for: ${email}`);
      return new Response(
        JSON.stringify({ success: false, error: "Too many emails sent to this address. Please try again later." }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log(`Sending confirmation email to: ${email}`);

    // Build email content based on whether we have report/provider info
    const hasReport = reportUrl !== null;
    const hasProvider = providerName !== null;

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
    .score-card {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      color: white;
      padding: 24px;
      border-radius: 12px;
      text-align: center;
      margin: 24px 0;
    }
    .score-number {
      font-size: 42px;
      font-weight: 700;
      margin: 8px 0;
    }
    .score-label {
      font-size: 14px;
      opacity: 0.9;
    }
    .provider-match {
      font-size: 18px;
      font-weight: 600;
      margin-top: 12px;
    }
    .status-list {
      list-style: none;
      padding: 0;
      margin: 24px 0;
    }
    .status-list li {
      padding: 12px 16px;
      margin: 8px 0;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .status-success {
      background: #ecfdf5;
      color: #059669;
    }
    .status-pending {
      background: #eff6ff;
      color: #3b82f6;
    }
    .status-icon {
      font-size: 18px;
    }
    .report-button {
      display: inline-block;
      background: #3b82f6;
      color: white !important;
      padding: 14px 28px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
      margin: 20px 0;
    }
    .report-button:hover {
      background: #2563eb;
    }
    .next-steps {
      background: #f9fafb;
      padding: 20px;
      border-radius: 10px;
      margin: 24px 0;
    }
    .next-steps h3 {
      margin: 0 0 12px 0;
      font-size: 16px;
      color: #1a1a1a;
    }
    .next-steps ol {
      margin: 0;
      padding-left: 20px;
    }
    .next-steps li {
      margin: 8px 0;
      color: #4b5563;
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
  
  ${hasReport && hasProvider && matchScore !== null ? `
  <p>Your personalized Payment Risk & Pricing Report is ready!</p>
  
  <div class="score-card">
    <div class="score-label">Your Match Score</div>
    <div class="score-number">${matchScore}%</div>
    <div class="provider-match">Matched with ${escapeHtml(providerName)}</div>
  </div>
  
  <ul class="status-list">
    <li class="status-success">
      <span class="status-icon">✓</span>
      <span>Report generated and ready to download</span>
    </li>
    <li class="status-success">
      <span class="status-icon">✓</span>
      <span>${escapeHtml(providerName)} has been notified with your details</span>
    </li>
    <li class="status-pending">
      <span class="status-icon">📞</span>
      <span>Expect a call within 24-48 hours</span>
    </li>
  </ul>
  
  <p style="text-align: center;">
    <a href="${escapeHtml(reportUrl)}" class="report-button">Download Your Report</a>
  </p>
  
  <div class="next-steps">
    <h3>What happens next?</h3>
    <ol>
      <li><strong>${escapeHtml(providerName)} will reach out</strong> — They have your business details and will contact you to discuss next steps.</li>
      <li><strong>Review your report</strong> — Use it as a reference when comparing quotes and terms.</li>
      <li><strong>Prepare your documents</strong> — Have your business registration, bank details, and ID ready.</li>
    </ol>
  </div>
  ` : `
  <p>Thanks for taking a moment to answer the questions — we've got everything we need.</p>
  
  <p>We've reviewed your answers and shared the right context with the provider that best fits your business. There's nothing you need to do right now.</p>
  
  <p>You should hear back within 24 hours with next steps or any follow-up they may need.</p>
  `}
  
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
      subject: hasReport && hasProvider 
        ? `Your Payment Report is Ready — ${matchScore}% Match with ${providerName}`
        : "We've got your details",
      html: emailHtml,
    });

    console.log("Confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in send-confirmation-email function:", error);
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
