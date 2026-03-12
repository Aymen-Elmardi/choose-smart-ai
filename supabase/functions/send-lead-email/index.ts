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

const checkIpRateLimit = (clientIp: string, max: number = 3): boolean => {
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
  if (record.count >= max) return false;
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

const sanitizeArray = (arr: unknown, maxItems: number = 10, maxItemLength: number = 200): string[] => {
  if (!Array.isArray(arr)) return [];
  return arr.slice(0, maxItems).map((item) => sanitizeString(item, maxItemLength));
};

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254 && email.length >= 5;
};

const isValidName = (name: string): boolean => name.length >= 2 && !/^[0-9]+$/.test(name);

const formatValue = (value: unknown): string => {
  if (value === null || value === undefined || value === "") return "Not provided";
  if (Array.isArray(value)) {
    if (value.length === 0) return "None";
    return value.map((v) => escapeHtml(sanitizeString(v, 200))).join(", ");
  }
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") return value.toString();
  return escapeHtml(sanitizeString(value, 500));
};

// ============================================================================
// TYPES
// ============================================================================

interface LeadEmailRequest {
  fullName: string;
  email: string;
  phone?: string;
  businessName?: string;
  businessWebsite?: string;
  websiteUrl?: string;
  currentProvider?: string;
  painPoints?: string;
  recommendedProvider: string | null;
  reasons?: string[];
  logicPath: string;
  businessType: string;
  salesChannel: string;
  monthlyVolume: string;
  avgTransaction: string;
  international: string;
  recurring: string;
  priorities: string[];
  region: string;
  market: string;
  enrichment: EnrichmentData | null;
}

interface EnrichmentData {
  deviceType: string;
  operatingSystem: string;
  browserName: string;
  screenResolution: string;
  geoCountry: string;
  geoRegion: string;
  geoCity: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  landingPageUrl: string;
  firstVisitTimestamp: string;
  sessionDurationSeconds: number;
  timeToCompleteQuizSeconds: number;
  quizDropOffPoints: string[];
  scrollDepthBeforeForm: number;
  viewedRecommendationCard: boolean;
  optionalPhoneProvided: boolean;
  optionalBusinessWebsiteProvided: boolean;
  optionalBusinessNameProvided: boolean;
  skippedOptionalFields: boolean;
  networkSpeedEstimate: string;
  jsErrors: string[];
  devicePixelRatio: number;
}

// ============================================================================
// HANDLER
// ============================================================================

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send-lead-email");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIp = getClientIp(req);
  console.log(`Request from IP: ${clientIp}`);

  if (!checkIpRateLimit(clientIp, 3)) {
    console.warn(`Rate limit exceeded for IP: ${clientIp}`);
    return errorResponse("Too many requests. Please try again later.", 429);
  }

  try {
    const rawData = await req.json();

    if (!rawData.fullName || !rawData.email) {
      console.warn("Missing required fields");
      return errorResponse("Name and email are required.", 400);
    }

    const data: LeadEmailRequest = {
      fullName: sanitizeString(rawData.fullName, 100),
      email: sanitizeString(rawData.email, 254),
      phone: sanitizeString(rawData.phone, 20),
      businessName: sanitizeString(rawData.businessName, 200),
      businessWebsite: sanitizeString(rawData.businessWebsite, 500),
      websiteUrl: sanitizeString(rawData.websiteUrl, 500),
      currentProvider: sanitizeString(rawData.currentProvider, 200),
      painPoints: sanitizeString(rawData.painPoints, 1000),
      recommendedProvider: sanitizeString(rawData.recommendedProvider, 100) || null,
      reasons: sanitizeArray(rawData.reasons, 10, 200),
      logicPath: sanitizeString(rawData.logicPath, 200),
      businessType: sanitizeString(rawData.businessType, 100),
      salesChannel: sanitizeString(rawData.salesChannel, 100),
      monthlyVolume: sanitizeString(rawData.monthlyVolume, 50),
      avgTransaction: sanitizeString(rawData.avgTransaction, 50),
      international: sanitizeString(rawData.international, 20),
      recurring: sanitizeString(rawData.recurring, 20),
      priorities: sanitizeArray(rawData.priorities, 10, 100),
      region: sanitizeString(rawData.region, 50),
      market: sanitizeString(rawData.market, 10) || "UK",
      enrichment: rawData.enrichment || null,
    };

    if (!isValidEmail(data.email)) {
      console.warn(`Invalid email format: ${data.email}`);
      return errorResponse("Please provide a valid email address.", 400);
    }

    if (!isValidName(data.fullName)) {
      console.warn(`Suspicious name detected: ${data.fullName}`);
      return errorResponse("Please provide a valid name.", 400);
    }

    console.log("Sanitized lead data received for:", data.email);

    const providerName = data.recommendedProvider || "Expert Consultation";
    const submissionTimestamp = new Date().toISOString();
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const rawEnrichment = (data.enrichment || {}) as Partial<EnrichmentData>;
    const enrichment: Partial<EnrichmentData> = {
      deviceType: sanitizeString(rawEnrichment.deviceType, 50),
      operatingSystem: sanitizeString(rawEnrichment.operatingSystem, 50),
      browserName: sanitizeString(rawEnrichment.browserName, 50),
      screenResolution: sanitizeString(rawEnrichment.screenResolution, 20),
      geoCountry: sanitizeString(rawEnrichment.geoCountry, 100),
      geoRegion: sanitizeString(rawEnrichment.geoRegion, 100),
      geoCity: sanitizeString(rawEnrichment.geoCity, 100),
      referrer: sanitizeString(rawEnrichment.referrer, 500),
      utmSource: sanitizeString(rawEnrichment.utmSource, 100),
      utmMedium: sanitizeString(rawEnrichment.utmMedium, 100),
      utmCampaign: sanitizeString(rawEnrichment.utmCampaign, 200),
      utmTerm: sanitizeString(rawEnrichment.utmTerm, 200),
      utmContent: sanitizeString(rawEnrichment.utmContent, 200),
      landingPageUrl: sanitizeString(rawEnrichment.landingPageUrl, 500),
      firstVisitTimestamp: sanitizeString(rawEnrichment.firstVisitTimestamp, 50),
      sessionDurationSeconds: typeof rawEnrichment.sessionDurationSeconds === "number" ? Math.min(rawEnrichment.sessionDurationSeconds, 999999) : 0,
      timeToCompleteQuizSeconds: typeof rawEnrichment.timeToCompleteQuizSeconds === "number" ? Math.min(rawEnrichment.timeToCompleteQuizSeconds, 999999) : 0,
      quizDropOffPoints: sanitizeArray(rawEnrichment.quizDropOffPoints, 20, 50),
      scrollDepthBeforeForm: typeof rawEnrichment.scrollDepthBeforeForm === "number" ? Math.min(Math.max(rawEnrichment.scrollDepthBeforeForm, 0), 100) : 0,
      viewedRecommendationCard: Boolean(rawEnrichment.viewedRecommendationCard),
      optionalPhoneProvided: Boolean(rawEnrichment.optionalPhoneProvided),
      optionalBusinessWebsiteProvided: Boolean(rawEnrichment.optionalBusinessWebsiteProvided),
      optionalBusinessNameProvided: Boolean(rawEnrichment.optionalBusinessNameProvided),
      skippedOptionalFields: Boolean(rawEnrichment.skippedOptionalFields),
      networkSpeedEstimate: sanitizeString(rawEnrichment.networkSpeedEstimate, 20),
      devicePixelRatio: typeof rawEnrichment.devicePixelRatio === "number" ? Math.min(rawEnrichment.devicePixelRatio, 10) : 1,
      jsErrors: sanitizeArray(rawEnrichment.jsErrors, 10, 200),
    };

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px; }
    h1 { color: #1a1a1a; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; }
    h2 { color: #374151; margin-top: 30px; border-left: 4px solid #3b82f6; padding-left: 12px; }
    table { width: 100%; border-collapse: collapse; margin: 15px 0; }
    th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid #e5e7eb; }
    th { background: #f9fafb; font-weight: 600; color: #374151; width: 40%; }
    td { color: #4b5563; }
    .highlight { background: #eff6ff; }
    .reason-list { margin: 0; padding-left: 20px; }
    .reason-list li { margin: 5px 0; }
    .meta-section { background: #f3f4f6; padding: 15px; border-radius: 8px; margin-top: 30px; }
  </style>
</head>
<body>
  <h1>New ChosePayments Lead – ${escapeHtml(providerName)}</h1>
  <h2>1. Contact Information</h2>
  <table>
    <tr><th>Full Name</th><td>${formatValue(data.fullName)}</td></tr>
    <tr><th>Email</th><td>${formatValue(data.email)}</td></tr>
    <tr><th>Phone</th><td>${formatValue(data.phone)}</td></tr>
    <tr><th>Business Name</th><td>${formatValue(data.businessName)}</td></tr>
    <tr><th>Business Website</th><td>${formatValue(data.businessWebsite)}</td></tr>
    <tr><th>Website URL</th><td>${formatValue(data.websiteUrl)}</td></tr>
    <tr><th>Current Provider</th><td>${formatValue(data.currentProvider)}</td></tr>
    <tr><th>Pain Points</th><td>${formatValue(data.painPoints)}</td></tr>
  </table>
  <h2>2. Recommendation Details</h2>
  <table>
    <tr class="highlight"><th>Recommended Provider</th><td><strong>${escapeHtml(providerName)}</strong></td></tr>
    <tr class="highlight"><th>Market</th><td><strong>${formatValue(data.market)}</strong></td></tr>
    <tr><th>Logic Path</th><td>${formatValue(data.logicPath)}</td></tr>
  </table>
  ${data.reasons && data.reasons.length > 0 ? `<p><strong>Reasons for Recommendation:</strong></p><ul class="reason-list">${data.reasons.map((r) => `<li>${escapeHtml(r)}</li>`).join("")}</ul>` : ""}
  <h2>3. Quiz Answers</h2>
  <table>
    <tr><th>Business Type</th><td>${formatValue(data.businessType)}</td></tr>
    <tr><th>Selling Channel</th><td>${formatValue(data.salesChannel)}</td></tr>
    <tr><th>Monthly Card Volume</th><td>${formatValue(data.monthlyVolume)}</td></tr>
    <tr><th>Average Transaction Value</th><td>${formatValue(data.avgTransaction)}</td></tr>
    <tr><th>Accepts International Customers</th><td>${formatValue(data.international)}</td></tr>
    <tr><th>Needs Recurring Billing</th><td>${formatValue(data.recurring)}</td></tr>
    <tr><th>Region</th><td>${formatValue(data.region)}</td></tr>
    <tr><th>User Priorities</th><td>${formatValue(data.priorities)}</td></tr>
  </table>
  <h2>4. Enrichment Data</h2>
  <table>
    <tr><th>Device Type</th><td>${formatValue(enrichment.deviceType)}</td></tr>
    <tr><th>Operating System</th><td>${formatValue(enrichment.operatingSystem)}</td></tr>
    <tr><th>Browser Name</th><td>${formatValue(enrichment.browserName)}</td></tr>
    <tr><th>Screen Resolution</th><td>${formatValue(enrichment.screenResolution)}</td></tr>
    <tr><th>Geo Country</th><td>${formatValue(enrichment.geoCountry)}</td></tr>
    <tr><th>Geo Region</th><td>${formatValue(enrichment.geoRegion)}</td></tr>
    <tr><th>Geo City</th><td>${formatValue(enrichment.geoCity)}</td></tr>
    <tr><th>Referrer</th><td>${formatValue(enrichment.referrer)}</td></tr>
    <tr><th>UTM Source</th><td>${formatValue(enrichment.utmSource)}</td></tr>
    <tr><th>UTM Medium</th><td>${formatValue(enrichment.utmMedium)}</td></tr>
    <tr><th>UTM Campaign</th><td>${formatValue(enrichment.utmCampaign)}</td></tr>
    <tr><th>UTM Term</th><td>${formatValue(enrichment.utmTerm)}</td></tr>
    <tr><th>UTM Content</th><td>${formatValue(enrichment.utmContent)}</td></tr>
    <tr><th>Landing Page URL</th><td>${formatValue(enrichment.landingPageUrl)}</td></tr>
    <tr><th>First Visit Timestamp</th><td>${formatValue(enrichment.firstVisitTimestamp)}</td></tr>
    <tr><th>Session Duration (seconds)</th><td>${formatValue(enrichment.sessionDurationSeconds)}</td></tr>
    <tr><th>Time to Complete Quiz (seconds)</th><td>${formatValue(enrichment.timeToCompleteQuizSeconds)}</td></tr>
    <tr><th>Quiz Drop-Off Points</th><td>${formatValue(enrichment.quizDropOffPoints)}</td></tr>
    <tr><th>Scroll Depth Before Form (%)</th><td>${formatValue(enrichment.scrollDepthBeforeForm)}</td></tr>
    <tr><th>Viewed Recommendation Card</th><td>${formatValue(enrichment.viewedRecommendationCard)}</td></tr>
    <tr><th>Optional Phone Provided</th><td>${formatValue(enrichment.optionalPhoneProvided)}</td></tr>
    <tr><th>Optional Business Website Provided</th><td>${formatValue(enrichment.optionalBusinessWebsiteProvided)}</td></tr>
    <tr><th>Optional Business Name Provided</th><td>${formatValue(enrichment.optionalBusinessNameProvided)}</td></tr>
    <tr><th>Skipped Optional Fields</th><td>${formatValue(enrichment.skippedOptionalFields)}</td></tr>
    <tr><th>Network Speed Estimate</th><td>${formatValue(enrichment.networkSpeedEstimate)}</td></tr>
    <tr><th>Device Pixel Ratio</th><td>${formatValue(enrichment.devicePixelRatio)}</td></tr>
    <tr><th>JS Errors</th><td>${formatValue(enrichment.jsErrors)}</td></tr>
  </table>
  <div class="meta-section">
    <h2 style="margin-top: 0;">5. Meta</h2>
    <table>
      <tr><th>Submission Timestamp</th><td>${submissionTimestamp}</td></tr>
      <tr><th>Session ID</th><td>${sessionId}</td></tr>
      <tr><th>Client IP</th><td>${escapeHtml(clientIp)}</td></tr>
    </table>
  </div>
</body>
</html>`;

    console.log("Sending lead email to production inbox: hello@chosepayments.com");

    const emailResponse = await resend.emails.send({
      from: "ChosePayments <leads@chosepayments.com>",
      to: "hello@chosepayments.com",
      subject: `New ChosePayments Lead – ${escapeHtml(providerName)}`,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);
    return successResponse({ emailResponse });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in send-lead-email function:", error);
    return errorResponse(errorMessage, 500);
  }
};

serve(handler);
