import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// ========================================
// EMAIL RECIPIENT CONFIGURATION
// Change this to switch between test and production
// Production: "hello@chosepayments.com"
// Testing:    "aymen.elmardi@gmail.com"
// ========================================
const RECIPIENT_EMAIL = "aymen.elmardi@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LeadEmailRequest {
  // Contact info
  fullName: string;
  email: string;
  phone?: string;
  businessName?: string;
  businessWebsite?: string;
  // Recommendation
  recommendedProvider: string | null;
  reasons?: string[];
  logicPath: string;
  // Quiz answers
  businessType: string;
  salesChannel: string;
  monthlyVolume: string;
  avgTransaction: string;
  international: string;
  recurring: string;
  priorities: string[];
  region: string;
  // Enrichment data
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

const formatValue = (value: unknown): string => {
  if (value === null || value === undefined || value === "") return "Not provided";
  if (Array.isArray(value)) return value.length > 0 ? value.join(", ") : "None";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") return value.toString();
  return String(value);
};

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send-lead-email");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: LeadEmailRequest = await req.json();
    console.log("Lead data received:", JSON.stringify(data, null, 2));

    const providerName = data.recommendedProvider || "Expert Consultation";
    const submissionTimestamp = new Date().toISOString();
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const enrichment: Partial<EnrichmentData> = data.enrichment || {};

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
  <h1>New ChosePayments Lead – ${providerName}</h1>

  <h2>1. Contact Information</h2>
  <table>
    <tr><th>Full Name</th><td>${formatValue(data.fullName)}</td></tr>
    <tr><th>Email</th><td>${formatValue(data.email)}</td></tr>
    <tr><th>Phone</th><td>${formatValue(data.phone)}</td></tr>
    <tr><th>Business Name</th><td>${formatValue(data.businessName)}</td></tr>
    <tr><th>Business Website</th><td>${formatValue(data.businessWebsite)}</td></tr>
  </table>

  <h2>2. Recommendation Details</h2>
  <table>
    <tr class="highlight"><th>Recommended Provider</th><td><strong>${providerName}</strong></td></tr>
    <tr><th>Logic Path</th><td>${formatValue(data.logicPath)}</td></tr>
  </table>
  ${data.reasons && data.reasons.length > 0 ? `
  <p><strong>Reasons for Recommendation:</strong></p>
  <ul class="reason-list">
    ${data.reasons.map(r => `<li>${r}</li>`).join("")}
  </ul>
  ` : ""}

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
    </table>
  </div>
</body>
</html>
    `;

    console.log(`Sending email to ${RECIPIENT_EMAIL}`);

    const emailResponse = await resend.emails.send({
      from: "ChosePayments <onboarding@resend.dev>",
      to: [RECIPIENT_EMAIL],
      subject: `New ChosePayments Lead – ${providerName}`,
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
