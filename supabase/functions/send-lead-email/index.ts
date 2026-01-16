// ChosePayments Lead Email Function - Production Version
// Last updated: 2025-01-16
// Recipient: hello@chosepayments.com (HARDCODED - DO NOT CHANGE)
// Now includes all 11 quiz answers, match score, and report URL

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting: simple in-memory store (resets on function cold start)
const rateLimitStore = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3; // Max 3 requests per minute per IP

interface LeadEmailRequest {
  // Contact Details (5 fields)
  fullName: string;
  email: string;
  phone?: string;
  businessName?: string;
  businessWebsite?: string;
  
  // All 11 Assessment Answers
  salesChannel: string;
  terminalType?: string;
  businessType: string;
  monthlyVolume: string;
  avgTransaction: string;
  priorities: string[];
  riskProfile: string;          // NEW - Q7
  deliveryTimeline: string;     // NEW - Q8
  industry: string;
  location: string;
  contactTime: string;
  
  // Legacy fields (for backwards compatibility)
  international?: string;
  recurring?: string;
  region?: string;
  logicPath?: string;
  reasons?: string[];
  
  // Recommendation Context (NEW)
  recommendedProvider: string | null;
  matchScore?: number;
  matchDrivers?: string[];
  alternativeProviders?: string[];
  
  // Report Reference (NEW)
  reportUrl?: string;
  reportGeneratedAt?: string;
  
  // Meta
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

// HTML escape function to prevent XSS and injection attacks
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

// Sanitize and validate string input
const sanitizeString = (value: unknown, maxLength: number = 500): string => {
  if (value === null || value === undefined || value === "") return "";
  const str = String(value).trim().slice(0, maxLength);
  // Remove control characters except newlines (which we escape in escapeHtml)
  return str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
};

// Validate email format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Format value with HTML escaping
const formatValue = (value: unknown): string => {
  if (value === null || value === undefined || value === "") return "Not provided";
  if (Array.isArray(value)) {
    if (value.length === 0) return "None";
    return value.map(v => escapeHtml(sanitizeString(v, 200))).join(", ");
  }
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") return value.toString();
  return escapeHtml(sanitizeString(value, 500));
};

// Map risk profile to display text
const getRiskProfileDisplay = (riskProfile: string): string => {
  switch (riskProfile) {
    case 'low': return '🟢 Low Risk - Clean processing history';
    case 'medium': return '🟡 Medium Risk - Minor processing challenges';
    case 'high': return '🔴 High Risk - Significant processing challenges';
    case 'unknown': return '⚪ Not Disclosed';
    default: return riskProfile || 'Not provided';
  }
};

// Map delivery timeline to display text
const getTimelineDisplay = (timeline: string): string => {
  switch (timeline) {
    case 'urgent': return '🚀 Urgent - 1-2 days';
    case 'standard': return '📅 Standard - 1-2 weeks';
    case 'planned': return '📋 Planned - 1-3 months';
    case 'exploring': return '🔍 Exploring options';
    default: return timeline || 'Not provided';
  }
};

// Check rate limit
const checkRateLimit = (clientIp: string): boolean => {
  const now = Date.now();
  const record = rateLimitStore.get(clientIp);
  
  // Clean up old entries periodically
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

// Get client IP from request
const getClientIp = (req: Request): string => {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
         req.headers.get("x-real-ip") ||
         "unknown";
};

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send-lead-email");

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
    
    // Validate required fields
    if (!rawData.fullName || !rawData.email) {
      console.warn("Missing required fields");
      return new Response(
        JSON.stringify({ success: false, error: "Name and email are required." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    // Sanitize all input data
    const data: LeadEmailRequest = {
      // Contact Details
      fullName: sanitizeString(rawData.fullName, 100),
      email: sanitizeString(rawData.email, 254),
      phone: sanitizeString(rawData.phone, 20),
      businessName: sanitizeString(rawData.businessName, 200),
      businessWebsite: sanitizeString(rawData.businessWebsite, 500),
      
      // All 11 Assessment Answers
      salesChannel: sanitizeString(rawData.salesChannel, 100),
      terminalType: sanitizeString(rawData.terminalType, 100),
      businessType: sanitizeString(rawData.businessType, 100),
      monthlyVolume: sanitizeString(rawData.monthlyVolume, 50),
      avgTransaction: sanitizeString(rawData.avgTransaction, 50),
      priorities: Array.isArray(rawData.priorities)
        ? rawData.priorities.slice(0, 10).map((p: unknown) => sanitizeString(p, 100))
        : [],
      riskProfile: sanitizeString(rawData.riskProfile, 50),
      deliveryTimeline: sanitizeString(rawData.deliveryTimeline, 50),
      industry: sanitizeString(rawData.industry, 100),
      location: sanitizeString(rawData.location, 100),
      contactTime: sanitizeString(rawData.contactTime, 50),
      
      // Legacy fields
      international: sanitizeString(rawData.international, 20),
      recurring: sanitizeString(rawData.recurring, 20),
      region: sanitizeString(rawData.region, 50),
      logicPath: sanitizeString(rawData.logicPath, 200),
      reasons: Array.isArray(rawData.reasons) 
        ? rawData.reasons.slice(0, 10).map((r: unknown) => sanitizeString(r, 200))
        : [],
      
      // Recommendation Context
      recommendedProvider: sanitizeString(rawData.recommendedProvider, 100) || null,
      matchScore: typeof rawData.matchScore === 'number' ? rawData.matchScore : undefined,
      matchDrivers: Array.isArray(rawData.matchDrivers)
        ? rawData.matchDrivers.slice(0, 5).map((d: unknown) => sanitizeString(d, 200))
        : [],
      alternativeProviders: Array.isArray(rawData.alternativeProviders)
        ? rawData.alternativeProviders.slice(0, 3).map((p: unknown) => sanitizeString(p, 100))
        : [],
      
      // Report Reference
      reportUrl: sanitizeString(rawData.reportUrl, 500),
      reportGeneratedAt: sanitizeString(rawData.reportGeneratedAt, 50),
      
      // Meta
      market: sanitizeString(rawData.market, 10) || "UK",
      enrichment: rawData.enrichment || null,
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
    
    // Validate name is not suspicious (basic check)
    if (data.fullName.length < 2 || /^[0-9]+$/.test(data.fullName)) {
      console.warn(`Suspicious name detected: ${data.fullName}`);
      return new Response(
        JSON.stringify({ success: false, error: "Please provide a valid name." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Sanitized lead data received for:", data.email);

    const providerName = data.recommendedProvider || "Expert Consultation";
    const submissionTimestamp = new Date().toISOString();
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Sanitize enrichment data
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
      sessionDurationSeconds: typeof rawEnrichment.sessionDurationSeconds === 'number' 
        ? Math.min(rawEnrichment.sessionDurationSeconds, 999999) : 0,
      timeToCompleteQuizSeconds: typeof rawEnrichment.timeToCompleteQuizSeconds === 'number'
        ? Math.min(rawEnrichment.timeToCompleteQuizSeconds, 999999) : 0,
      quizDropOffPoints: Array.isArray(rawEnrichment.quizDropOffPoints)
        ? rawEnrichment.quizDropOffPoints.slice(0, 20).map((p: unknown) => sanitizeString(p, 50))
        : [],
      scrollDepthBeforeForm: typeof rawEnrichment.scrollDepthBeforeForm === 'number'
        ? Math.min(Math.max(rawEnrichment.scrollDepthBeforeForm, 0), 100) : 0,
      viewedRecommendationCard: Boolean(rawEnrichment.viewedRecommendationCard),
      optionalPhoneProvided: Boolean(rawEnrichment.optionalPhoneProvided),
      optionalBusinessWebsiteProvided: Boolean(rawEnrichment.optionalBusinessWebsiteProvided),
      optionalBusinessNameProvided: Boolean(rawEnrichment.optionalBusinessNameProvided),
      skippedOptionalFields: Boolean(rawEnrichment.skippedOptionalFields),
      networkSpeedEstimate: sanitizeString(rawEnrichment.networkSpeedEstimate, 20),
      devicePixelRatio: typeof rawEnrichment.devicePixelRatio === 'number'
        ? Math.min(rawEnrichment.devicePixelRatio, 10) : 1,
      jsErrors: Array.isArray(rawEnrichment.jsErrors)
        ? rawEnrichment.jsErrors.slice(0, 10).map((e: unknown) => sanitizeString(e, 200))
        : [],
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
    .score-badge { 
      display: inline-block; 
      background: linear-gradient(135deg, #3b82f6, #2563eb); 
      color: white; 
      padding: 8px 16px; 
      border-radius: 20px; 
      font-weight: 600;
      font-size: 18px;
    }
    .reason-list { margin: 0; padding-left: 20px; }
    .reason-list li { margin: 5px 0; }
    .driver-list { margin: 10px 0; padding-left: 20px; }
    .driver-list li { margin: 8px 0; background: #f0f9ff; padding: 8px 12px; border-radius: 6px; list-style: none; margin-left: -20px; }
    .alt-providers { display: flex; gap: 10px; flex-wrap: wrap; margin: 10px 0; }
    .alt-badge { background: #f3f4f6; padding: 6px 12px; border-radius: 15px; font-size: 14px; }
    .risk-badge { padding: 6px 12px; border-radius: 6px; display: inline-block; font-weight: 500; }
    .risk-low { background: #ecfdf5; color: #059669; }
    .risk-medium { background: #fffbeb; color: #d97706; }
    .risk-high { background: #fef2f2; color: #dc2626; }
    .meta-section { background: #f3f4f6; padding: 15px; border-radius: 8px; margin-top: 30px; }
    .report-link { 
      display: inline-block; 
      background: #3b82f6; 
      color: white !important; 
      padding: 12px 24px; 
      border-radius: 8px; 
      text-decoration: none; 
      font-weight: 600;
      margin: 15px 0;
    }
    .new-badge { 
      background: #10b981; 
      color: white; 
      padding: 2px 8px; 
      border-radius: 4px; 
      font-size: 11px; 
      font-weight: 600;
      margin-left: 8px;
      vertical-align: middle;
    }
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
  </table>

  <h2>2. Recommendation Summary</h2>
  <table>
    <tr class="highlight">
      <th>Recommended Provider</th>
      <td><strong>${escapeHtml(providerName)}</strong></td>
    </tr>
    <tr class="highlight">
      <th>Match Score</th>
      <td><span class="score-badge">${data.matchScore !== undefined ? `${data.matchScore}%` : 'N/A'}</span></td>
    </tr>
    <tr><th>Market</th><td><strong>${formatValue(data.market)}</strong></td></tr>
  </table>
  
  ${data.matchDrivers && data.matchDrivers.length > 0 ? `
  <p><strong>Match Drivers:</strong></p>
  <ul class="driver-list">
    ${data.matchDrivers.map(d => `<li>✓ ${escapeHtml(d)}</li>`).join("")}
  </ul>
  ` : ""}
  
  ${data.alternativeProviders && data.alternativeProviders.length > 0 ? `
  <p><strong>Alternative Providers:</strong></p>
  <div class="alt-providers">
    ${data.alternativeProviders.map(p => `<span class="alt-badge">${escapeHtml(p)}</span>`).join("")}
  </div>
  ` : ""}

  ${data.reportUrl ? `
  <h2>3. Personalized Report <span class="new-badge">NEW</span></h2>
  <p>A personalized payment report has been generated for this lead:</p>
  <a href="${escapeHtml(data.reportUrl)}" class="report-link">View/Download Report</a>
  <p style="font-size: 13px; color: #6b7280;">Generated: ${data.reportGeneratedAt || 'N/A'}</p>
  ` : ""}

  <h2>${data.reportUrl ? '4' : '3'}. Complete Quiz Answers (11 Questions)</h2>
  <table>
    <tr><th>Q1: Sales Channel</th><td>${formatValue(data.salesChannel)}</td></tr>
    ${data.terminalType ? `<tr><th>Q2: Terminal Type</th><td>${formatValue(data.terminalType)}</td></tr>` : ''}
    <tr><th>Q3: Business Type</th><td>${formatValue(data.businessType)}</td></tr>
    <tr><th>Q4: Monthly Volume</th><td>${formatValue(data.monthlyVolume)}</td></tr>
    <tr><th>Q5: Avg Transaction</th><td>${formatValue(data.avgTransaction)}</td></tr>
    <tr><th>Q6: Priorities</th><td>${formatValue(data.priorities)}</td></tr>
    <tr class="highlight">
      <th>Q7: Risk Profile <span class="new-badge">NEW</span></th>
      <td>${getRiskProfileDisplay(data.riskProfile)}</td>
    </tr>
    <tr class="highlight">
      <th>Q8: Delivery Timeline <span class="new-badge">NEW</span></th>
      <td>${getTimelineDisplay(data.deliveryTimeline)}</td>
    </tr>
    <tr><th>Q9: Industry</th><td>${formatValue(data.industry)}</td></tr>
    <tr><th>Q10: Location</th><td>${formatValue(data.location)}</td></tr>
    <tr><th>Q11: Contact Time</th><td>${formatValue(data.contactTime)}</td></tr>
  </table>

  ${data.reasons && data.reasons.length > 0 ? `
  <p><strong>Legacy Reasons for Recommendation:</strong></p>
  <ul class="reason-list">
    ${data.reasons.map(r => `<li>${escapeHtml(r)}</li>`).join("")}
  </ul>
  ` : ""}

  <h2>${data.reportUrl ? '5' : '4'}. Enrichment Data</h2>
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
    <h2 style="margin-top: 0;">${data.reportUrl ? '6' : '5'}. Meta</h2>
    <table>
      <tr><th>Submission Timestamp</th><td>${submissionTimestamp}</td></tr>
      <tr><th>Session ID</th><td>${sessionId}</td></tr>
      <tr><th>Client IP</th><td>${escapeHtml(clientIp)}</td></tr>
    </table>
  </div>
</body>
</html>
    `;

    // PRODUCTION RECIPIENT - HARDCODED
    console.log("Sending lead email to production inbox: hello@chosepayments.com");

    const emailResponse = await resend.emails.send({
      from: "ChosePayments <leads@chosepayments.com>",
      to: "hello@chosepayments.com",
      subject: `New Lead – ${escapeHtml(providerName)} (${data.matchScore !== undefined ? `${data.matchScore}% Match` : 'Quiz Complete'})`,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in send-lead-email function:", error);
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
