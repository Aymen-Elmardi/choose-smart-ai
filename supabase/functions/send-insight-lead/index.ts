// ChosePayments Insight Lead Email Function
// For simple lead capture from insight articles
// Recipient: hello@chosepayments.com (HARDCODED)

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import {
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

interface InsightLeadRequest {
  email: string;
  pageSource: string;
  tag: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send-insight-lead");

  if (req.method === "OPTIONS") {
    return handleCorsOptions();
  }

  const clientIp = getClientIp(req);
  console.log(`Request from IP: ${clientIp}`);

  if (!checkIpRateLimit(clientIp, 3)) {
    console.warn(`Rate limit exceeded for IP: ${clientIp}`);
    return errorResponse("Too many requests. Please try again later.", 429);
  }

  try {
    const rawData = await req.json();

    // Validate required fields
    if (!rawData.email) {
      console.warn("Missing email");
      return errorResponse("Email is required.", 400);
    }

    // Sanitize input
    const data: InsightLeadRequest = {
      email: sanitizeString(rawData.email, 254),
      pageSource: sanitizeString(rawData.pageSource, 500),
      tag: sanitizeString(rawData.tag, 100),
    };

    // Validate email format
    if (!isValidEmail(data.email)) {
      console.warn(`Invalid email format: ${data.email}`);
      return errorResponse("Please provide a valid email address.", 400);
    }

    console.log("Insight lead received:", data.email, data.tag);

    const submissionTimestamp = new Date().toISOString();

    // Format tag for display
    const tagDisplay = data.tag
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    h1 { color: #1a1a1a; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; font-size: 20px; }
    table { width: 100%; border-collapse: collapse; margin: 15px 0; }
    th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid #e5e7eb; }
    th { background: #f9fafb; font-weight: 600; color: #374151; width: 35%; }
    td { color: #4b5563; }
    .tag { display: inline-block; background: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 4px; font-size: 14px; font-weight: 500; }
  </style>
</head>
<body>
  <h1>New Insight Lead – ${escapeHtml(tagDisplay)}</h1>
  
  <p><span class="tag">${escapeHtml(tagDisplay)}</span></p>

  <table>
    <tr><th>Email</th><td>${escapeHtml(data.email)}</td></tr>
    <tr><th>Page Source</th><td>${escapeHtml(data.pageSource || "Not provided")}</td></tr>
    <tr><th>Tag</th><td>${escapeHtml(data.tag)}</td></tr>
    <tr><th>Timestamp</th><td>${submissionTimestamp}</td></tr>
    <tr><th>Client IP</th><td>${escapeHtml(clientIp)}</td></tr>
  </table>
</body>
</html>
    `;

    console.log("Sending insight lead email to: hello@chosepayments.com");

    const emailResponse = await resend.emails.send({
      from: "ChosePayments <leads@chosepayments.com>",
      to: "hello@chosepayments.com",
      subject: `Insight Lead – ${escapeHtml(tagDisplay)}`,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return successResponse();
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in send-insight-lead function:", error);
    return errorResponse(errorMessage, 500);
  }
};

serve(handler);
