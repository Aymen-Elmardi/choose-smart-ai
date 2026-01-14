// ChosePayments Insight Lead Email Function
// For simple lead capture from insight articles
// Recipient: hello@chosepayments.com (HARDCODED)

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting
const rateLimitStore = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;

// HTML escape function
const escapeHtml = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\n/g, ' ')
    .replace(/\r/g, '');
};

// Sanitize string input
const sanitizeString = (value: unknown, maxLength: number = 500): string => {
  if (value === null || value === undefined || value === "") return "";
  const str = String(value).trim().slice(0, maxLength);
  return str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
};

// Validate email format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Check rate limit
const checkRateLimit = (clientIp: string): boolean => {
  const now = Date.now();
  const record = rateLimitStore.get(clientIp);
  
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

// Get client IP
const getClientIp = (req: Request): string => {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
         req.headers.get("x-real-ip") ||
         "unknown";
};

interface InsightLeadRequest {
  email: string;
  pageSource: string;
  tag: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send-insight-lead");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

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
    
    // Validate required fields
    if (!rawData.email) {
      console.warn("Missing email");
      return new Response(
        JSON.stringify({ success: false, error: "Email is required." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
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
      return new Response(
        JSON.stringify({ success: false, error: "Please provide a valid email address." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Insight lead received:", data.email, data.tag);

    const submissionTimestamp = new Date().toISOString();
    
    // Format tag for display
    const tagDisplay = data.tag
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

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

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in send-insight-lead function:", error);
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
