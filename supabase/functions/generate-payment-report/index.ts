// ChosePayments PDF Report Generation Edge Function
// Generates personalized payment risk & pricing report

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ReportRequest {
  // User Contact Details
  fullName: string;
  email: string;
  businessName?: string;
  
  // All 11 Assessment Answers
  salesChannel: string;
  terminalType?: string;
  businessType: string;
  monthlyVolume: string;
  avgTransaction: string;
  priorities: string[];
  riskProfile: string;
  deliveryTimeline: string;
  industry: string;
  location: string;
  contactTime: string;
  
  // Recommendation Context
  recommendedProvider: string;
  matchScore: number;
  matchDrivers: string[];
  alternativeProviders: string[];
  
  // Meta
  market: string;
}

// Map risk profile to display text
const getRiskProfileDisplay = (riskProfile: string): { level: string; description: string } => {
  switch (riskProfile) {
    case 'low':
      return { level: 'Low Risk', description: 'Your business has a clean processing history, making you an attractive merchant for most providers.' };
    case 'medium':
      return { level: 'Medium Risk', description: 'Minor processing challenges may require attention, but most providers can accommodate your business.' };
    case 'high':
      return { level: 'High Risk', description: 'Previous processing challenges require a specialist provider with experience in complex merchant scenarios.' };
    default:
      return { level: 'Not Assessed', description: 'Risk profile was not disclosed. Provider will assess during onboarding.' };
  }
};

// Map delivery timeline to display text
const getTimelineDisplay = (timeline: string): string => {
  switch (timeline) {
    case 'urgent':
      return '1-2 days (Urgent)';
    case 'standard':
      return '1-2 weeks';
    case 'planned':
      return '1-3 months';
    default:
      return 'Flexible timeline';
  }
};

// Estimate pricing based on volume and provider
const estimatePricing = (monthlyVolume: string, avgTransaction: string, provider: string): { transactionFee: string; monthlyFee: string; notes: string } => {
  const volumeRanges: Record<string, { min: number; max: number }> = {
    'Under £1,000': { min: 0, max: 1000 },
    '£1,000 - £10,000': { min: 1000, max: 10000 },
    '£10,000 - £50,000': { min: 10000, max: 50000 },
    '£50,000 - £100,000': { min: 50000, max: 100000 },
    'Over £100,000': { min: 100000, max: 500000 },
  };

  const volume = volumeRanges[monthlyVolume] || { min: 10000, max: 50000 };
  const isHighVolume = volume.min >= 50000;
  const isLowVolume = volume.max <= 10000;

  // Provider-specific pricing estimates
  const pricingMap: Record<string, { transactionFee: string; monthlyFee: string; notes: string }> = {
    'Stripe': {
      transactionFee: '1.5% + 20p (UK cards)',
      monthlyFee: 'No monthly fee',
      notes: isHighVolume ? 'Custom pricing available for high volume' : 'Standard pricing applies'
    },
    'Square': {
      transactionFee: '1.75% (in-person)',
      monthlyFee: 'No monthly fee',
      notes: 'Simple flat-rate pricing'
    },
    'PayPal': {
      transactionFee: '2.9% + 30p',
      monthlyFee: 'No monthly fee',
      notes: 'Volume discounts available'
    },
    'SumUp': {
      transactionFee: '1.69% (card reader)',
      monthlyFee: 'No monthly fee',
      notes: 'One-time hardware purchase required'
    },
    'Worldpay': {
      transactionFee: '0.75% - 2.75%',
      monthlyFee: '£19.95/month',
      notes: 'Negotiable based on volume'
    },
    'Adyen': {
      transactionFee: 'Interchange++',
      monthlyFee: 'Custom',
      notes: 'Enterprise pricing - typically for £1M+ annual volume'
    },
    'Checkout.com': {
      transactionFee: 'Interchange++',
      monthlyFee: 'Custom',
      notes: 'Enterprise pricing with dedicated support'
    },
    'Trust Payments': {
      transactionFee: '1.5% - 3.5%',
      monthlyFee: '£25+/month',
      notes: 'Specialist in higher-risk merchants'
    },
  };

  return pricingMap[provider] || {
    transactionFee: 'Contact for quote',
    monthlyFee: 'Contact for quote',
    notes: 'Pricing varies based on business profile'
  };
};

// Generate HTML report content
const generateReportHtml = (data: ReportRequest): string => {
  const riskProfile = getRiskProfileDisplay(data.riskProfile);
  const timeline = getTimelineDisplay(data.deliveryTimeline);
  const pricing = estimatePricing(data.monthlyVolume, data.avgTransaction, data.recommendedProvider);
  const generatedDate = new Date().toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    @page { size: A4; margin: 40px; }
    * { box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
      line-height: 1.6; 
      color: #1a1a1a; 
      max-width: 800px; 
      margin: 0 auto; 
      padding: 40px;
      background: #fff;
    }
    .header { 
      text-align: center; 
      margin-bottom: 40px;
      padding-bottom: 30px;
      border-bottom: 3px solid #3b82f6;
    }
    .logo { 
      font-size: 28px; 
      font-weight: 700; 
      color: #1a1a1a; 
      margin-bottom: 8px;
    }
    .logo span { color: #3b82f6; }
    .report-title { 
      font-size: 24px; 
      color: #374151; 
      margin: 20px 0 10px;
    }
    .report-subtitle { 
      font-size: 14px; 
      color: #6b7280; 
    }
    .business-name {
      font-size: 18px;
      color: #1a1a1a;
      font-weight: 600;
      margin-top: 15px;
    }
    
    .section { 
      margin: 30px 0;
      page-break-inside: avoid;
    }
    .section-title { 
      font-size: 18px; 
      font-weight: 600; 
      color: #1a1a1a; 
      margin-bottom: 15px;
      padding-bottom: 8px;
      border-bottom: 2px solid #e5e7eb;
    }
    
    .score-card {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      color: white;
      padding: 30px;
      border-radius: 12px;
      text-align: center;
      margin: 30px 0;
    }
    .score-number {
      font-size: 56px;
      font-weight: 700;
      margin: 10px 0;
    }
    .score-label {
      font-size: 18px;
      opacity: 0.9;
    }
    .provider-name {
      font-size: 24px;
      font-weight: 600;
      margin-top: 20px;
    }
    
    .drivers-list {
      list-style: none;
      padding: 0;
      margin: 20px 0;
    }
    .drivers-list li {
      padding: 12px 15px;
      background: #f0f9ff;
      margin: 8px 0;
      border-radius: 8px;
      border-left: 4px solid #3b82f6;
    }
    
    .risk-card {
      padding: 20px;
      border-radius: 10px;
      margin: 15px 0;
    }
    .risk-low { background: #ecfdf5; border: 1px solid #10b981; }
    .risk-medium { background: #fffbeb; border: 1px solid #f59e0b; }
    .risk-high { background: #fef2f2; border: 1px solid #ef4444; }
    .risk-unknown { background: #f3f4f6; border: 1px solid #9ca3af; }
    
    .risk-level {
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 8px;
    }
    
    .pricing-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    .pricing-table th, .pricing-table td {
      padding: 12px 15px;
      text-align: left;
      border-bottom: 1px solid #e5e7eb;
    }
    .pricing-table th {
      background: #f9fafb;
      font-weight: 600;
      color: #374151;
    }
    
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin: 15px 0;
    }
    .info-item {
      padding: 15px;
      background: #f9fafb;
      border-radius: 8px;
    }
    .info-label {
      font-size: 12px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 5px;
    }
    .info-value {
      font-size: 15px;
      color: #1a1a1a;
      font-weight: 500;
    }
    
    .alternatives {
      margin: 20px 0;
    }
    .alt-provider {
      display: inline-block;
      padding: 8px 15px;
      background: #f3f4f6;
      border-radius: 20px;
      margin: 5px 5px 5px 0;
      font-size: 14px;
    }
    
    .next-steps {
      background: #eff6ff;
      padding: 25px;
      border-radius: 10px;
      margin: 30px 0;
    }
    .next-steps ol {
      margin: 15px 0;
      padding-left: 20px;
    }
    .next-steps li {
      margin: 10px 0;
    }
    
    .footer {
      margin-top: 50px;
      padding-top: 30px;
      border-top: 2px solid #e5e7eb;
      text-align: center;
      color: #6b7280;
      font-size: 14px;
    }
    .footer-logo {
      font-size: 18px;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 10px;
    }
    .footer-logo span { color: #3b82f6; }
    
    .disclaimer {
      margin-top: 30px;
      padding: 15px;
      background: #f9fafb;
      border-radius: 8px;
      font-size: 12px;
      color: #6b7280;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">Chose<span>Payments</span></div>
    <div class="report-title">Personalized Payment Risk & Pricing Report</div>
    <div class="report-subtitle">Generated ${generatedDate}</div>
    ${data.businessName ? `<div class="business-name">${data.businessName}</div>` : ''}
  </div>

  <div class="score-card">
    <div class="score-label">Your Match Score</div>
    <div class="score-number">${data.matchScore}%</div>
    <div class="provider-name">Recommended: ${data.recommendedProvider}</div>
  </div>

  <div class="section">
    <div class="section-title">Why ${data.recommendedProvider} is Your Best Match</div>
    <ul class="drivers-list">
      ${data.matchDrivers.map(driver => `<li>${driver}</li>`).join('')}
    </ul>
  </div>

  <div class="section">
    <div class="section-title">Your Business Profile</div>
    <div class="info-grid">
      <div class="info-item">
        <div class="info-label">Business Type</div>
        <div class="info-value">${data.businessType}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Sales Channel</div>
        <div class="info-value">${data.salesChannel}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Monthly Volume</div>
        <div class="info-value">${data.monthlyVolume}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Avg. Transaction</div>
        <div class="info-value">${data.avgTransaction}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Industry</div>
        <div class="info-value">${data.industry}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Location</div>
        <div class="info-value">${data.location}</div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Risk Profile Analysis</div>
    <div class="risk-card risk-${data.riskProfile || 'unknown'}">
      <div class="risk-level">${riskProfile.level}</div>
      <p>${riskProfile.description}</p>
    </div>
    <div class="info-grid">
      <div class="info-item">
        <div class="info-label">Setup Timeline</div>
        <div class="info-value">${timeline}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Key Priorities</div>
        <div class="info-value">${data.priorities.slice(0, 3).join(', ')}</div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Estimated Pricing for ${data.recommendedProvider}</div>
    <table class="pricing-table">
      <tr>
        <th>Fee Type</th>
        <th>Estimate</th>
      </tr>
      <tr>
        <td>Transaction Fee</td>
        <td>${pricing.transactionFee}</td>
      </tr>
      <tr>
        <td>Monthly Fee</td>
        <td>${pricing.monthlyFee}</td>
      </tr>
    </table>
    <p style="color: #6b7280; font-size: 14px; margin-top: 10px;">
      <strong>Note:</strong> ${pricing.notes}. Final pricing will be confirmed by the provider based on your complete application.
    </p>
  </div>

  ${data.alternativeProviders.length > 0 ? `
  <div class="section">
    <div class="section-title">Alternative Providers to Consider</div>
    <div class="alternatives">
      ${data.alternativeProviders.map(p => `<span class="alt-provider">${p}</span>`).join('')}
    </div>
    <p style="color: #6b7280; font-size: 14px;">
      If your primary match doesn't work out, these providers also scored well for your business profile.
    </p>
  </div>
  ` : ''}

  <div class="next-steps">
    <div class="section-title" style="border: none; padding: 0;">Recommended Next Steps</div>
    <ol>
      <li><strong>Expect a call within 24-48 hours</strong> — We've shared your details with ${data.recommendedProvider}.</li>
      <li><strong>Prepare your documents</strong> — Have your business registration, bank details, and ID ready.</li>
      <li><strong>Compare the quote</strong> — Use this report as a reference when reviewing their proposal.</li>
      <li><strong>Reach out if you need help</strong> — Reply to our email if anything doesn't feel right.</li>
    </ol>
  </div>

  <div class="disclaimer">
    <strong>Disclaimer:</strong> This report is based on the information you provided and general market data. 
    Actual pricing, approval decisions, and terms are determined by the payment provider based on their 
    underwriting criteria. ChosePayments does not guarantee any specific rates or approval outcomes.
  </div>

  <div class="footer">
    <div class="footer-logo">Chose<span>Payments</span></div>
    <p>Helping businesses find the right payment solution</p>
    <p><a href="mailto:hello@chosepayments.com" style="color: #3b82f6;">hello@chosepayments.com</a></p>
    <p style="margin-top: 15px; font-size: 12px;">© ${new Date().getFullYear()} ChosePayments. All rights reserved.</p>
  </div>
</body>
</html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to generate-payment-report");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ReportRequest = await req.json();
    
    console.log(`Generating report for: ${data.email}, Provider: ${data.recommendedProvider}`);

    // Validate required fields
    if (!data.recommendedProvider || !data.matchScore) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required recommendation data" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Generate HTML report
    const reportHtml = generateReportHtml(data);
    
    // Encode the HTML as base64 for easy transport
    const encoder = new TextEncoder();
    const reportBytes = encoder.encode(reportHtml);
    const reportBase64 = btoa(String.fromCharCode(...reportBytes));

    // Generate a unique report ID
    const reportId = `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    console.log(`Report generated successfully: ${reportId}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        reportId,
        reportHtml: reportBase64,
        // The report can be rendered as HTML or converted to PDF client-side
        // For now, we return the HTML which can be printed to PDF
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error generating report:", error);
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
