// Email templates for submit-assessment: the results email sent to the visitor
// and the internal lead notification sent to hello@.
//
// Email clients ignore most of CSS, so layout is tables and inline styles only.
// Colours are the site's design tokens (app/globals.css) converted to hex.

import type { RecommendationResult, Segment } from "../_shared/recommendationEngine.ts";
import {
  SEGMENT_LABELS,
  SEGMENT_RESULTS,
  estimateSavings,
  formatGBP,
  matchPercent,
  providersToAvoid,
} from "./results.ts";

const SITE_URL = "https://chosepayments.com";
const CONTACT_URL = `${SITE_URL}/contact`;
// Same schedule as BOOKING_URL in src/lib/booking.ts.
const BOOKING_URL = "https://calendar.app.google/qJhK6KM2XjdWcCkS6";

const C = {
  primary: "#11ac63",      // --primary 152 82% 37%
  primaryTint: "#e8f7f0",  // primary at ~10% on white
  primaryBorder: "#b8e6d0",
  text: "#0c1520",         // --foreground
  muted: "#677380",        // --muted-foreground
  surface: "#f3f5f7",      // --muted
  border: "#e2e6ea",       // --border
  danger: "#ef4444",       // --destructive
  dangerTint: "#fdf0f0",
  amber: "#b45309",
  amberTint: "#fdf6e7",
};

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

export interface RawAnswers {
  salesChannel: string;
  businessType: string;
  industry: string;
  monthlyVolume: string;
  avgTransaction: string;
  location: string;
  priorities: string[];
  deliveryTimeline: string;
  previousRestriction: string;
  platform: string;
  currentProcessor: string;
  painPoints: string[];
  terminalType: string;
  buyingIntent: string;
  contactTime: string;
  marketplaceModel: string;
  marketplaceChallenge: string;
  revenueModel: string;
  billingChallenge: string;
  locationCount: string;
  salesMix: string;
  declineHistory: string;
  volumeTier: string;
}

export interface AssessmentContext {
  fullName: string;
  firstName: string;
  email: string;
  market: string;
  segment: Segment;
  raw: RawAnswers;
  recommendation: RecommendationResult | null;
  leadId: string | null;
  submittedAt: string;
  ip: string;
}

export const escapeHtml = (str: string): string =>
  str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");

const e = escapeHtml;

// ============================================================================
// RESULTS EMAIL (to the visitor)
// ============================================================================

const sectionLabel = (label: string, color = C.muted) =>
  `<div style="font-size:12px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:${color};margin:0 0 10px;">${e(label)}</div>`;

const card = (inner: string, bg = "#ffffff", border = C.border) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;margin:0 0 20px;">
    <tr><td style="background:${bg};border:1px solid ${border};border-radius:12px;padding:20px 22px;">${inner}</td></tr>
  </table>`;

const checkList = (items: string[], color: string) =>
  items.map((item) =>
    `<tr>
      <td valign="top" style="width:22px;padding:3px 0;color:${color};font-size:14px;line-height:20px;">&#10003;</td>
      <td style="padding:3px 0;color:${C.muted};font-size:14px;line-height:20px;">${e(item)}</td>
    </tr>`
  ).join("");

const profileRows = (raw: RawAnswers): [string, string][] => {
  const rows: [string, string][] = [
    ["Sales channel", raw.salesChannel],
    ["Business type", raw.businessType],
    ["Industry", raw.industry],
    ["Monthly volume", raw.monthlyVolume],
    ["Avg. transaction", raw.avgTransaction],
    ["Location", raw.location],
    ["Priorities", raw.priorities.join(", ")],
    ["Delivery timeline", raw.deliveryTimeline],
    ["Previous restrictions", raw.previousRestriction],
  ];
  return rows.filter(([, v]) => v);
};

export const buildResultsEmail = (ctx: AssessmentContext): { subject: string; html: string; text: string } => {
  const { raw, recommendation: rec, segment } = ctx;
  const content = SEGMENT_RESULTS[segment];
  const isShopify = segment === "shopify";
  const savings = estimateSavings(raw.currentProcessor, raw.monthlyVolume);
  const showSavings = !isShopify && segment === "self-hosted" && savings.applicable;
  const match = rec && !isShopify ? matchPercent(rec) : null;
  const avoid = rec && !isShopify ? providersToAvoid(rec.avoid) : [];

  const profile = profileRows(raw).map(([label, value]) =>
    `<tr>
      <td style="padding:7px 0;border-bottom:1px solid ${C.primaryBorder};font-size:12px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:${C.muted};width:42%;vertical-align:top;">${e(label)}</td>
      <td style="padding:7px 0;border-bottom:1px solid ${C.primaryBorder};font-size:14px;font-weight:500;color:${C.text};vertical-align:top;">${e(value)}</td>
    </tr>`
  ).join("");

  const blocks: string[] = [];

  blocks.push(card(
    `${sectionLabel("Your business profile", C.text)}
     <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${profile}</table>`,
    C.primaryTint, C.primaryBorder,
  ));

  if (isShopify) {
    blocks.push(card(
      `${sectionLabel("Shopify Payments available", C.primary)}
       <p style="margin:0 0 10px;font-size:15px;line-height:24px;color:${C.text};">You're on Shopify, which means you already have access to <strong>Shopify Payments</strong> — a solution optimised for your platform. We specialise in helping businesses on self-hosted platforms (WooCommerce, Magento), marketplaces and SaaS companies find better processors.</p>
       <p style="margin:0;font-size:14px;line-height:22px;color:${C.muted};">If you'd like to compare Shopify Payments to other options, understand your true payment costs, or get strategic advice, get in touch below.</p>`,
      C.primaryTint, C.primaryBorder,
    ));
  }

  if (showSavings) {
    const cell = (label: string, value: string, color = C.text) =>
      `<td width="50%" style="padding:6px 0;vertical-align:top;">
        <div style="font-size:13px;color:${C.muted};">${e(label)}</div>
        <div style="font-size:15px;font-weight:600;color:${color};">${e(value)}</div>
      </td>`;
    blocks.push(card(
      `${sectionLabel("Misalignment detected", C.amber)}
       <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
         <tr>${cell("Currently with", raw.currentProcessor)}${cell("Est. current fees", `~${formatGBP(savings.currentMonthlyFees)}/mo`)}</tr>
         <tr>${cell("On Interchange++", `~${formatGBP(savings.optimizedMonthlyFees)}/mo`)}${cell("Potential saving", `${formatGBP(savings.monthlySavingsLow)}–${formatGBP(savings.monthlySavingsHigh)}/mo`, C.primary)}</tr>
       </table>
       <div style="margin:12px 0 0;padding:10px 14px;border-radius:8px;background:${C.primaryTint};text-align:center;font-size:14px;font-weight:600;color:${C.primary};">
         Estimated annual impact: ${e(formatGBP(savings.annualSavingsLow))}–${e(formatGBP(savings.annualSavingsHigh))}
       </div>
       <p style="margin:10px 0 0;font-size:12px;line-height:18px;color:${C.muted};text-align:center;">Illustrative estimate based on typical blended flat rates vs. Interchange++. Your actual rates depend on card mix and negotiation.</p>`,
      C.amberTint, "#f3dca8",
    ));
  }

  if (rec && !isShopify) {
    const matchBlock = match !== null
      ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 14px;">
          <tr>
            <td style="background:${C.primaryTint};border:1px solid ${C.primaryBorder};border-radius:12px;padding:10px 16px;">
              <span style="font-size:26px;font-weight:700;color:${C.primary};vertical-align:middle;">${match}%</span>
              <span style="display:inline-block;margin-left:10px;vertical-align:middle;">
                <span style="display:block;font-size:13px;font-weight:600;color:${C.text};">${segment === "high-risk" ? "Approval Fit" : "Match Alignment"}</span>
                <span style="display:block;font-size:12px;color:${C.muted};">Match confidence score</span>
              </span>
            </td>
          </tr>
        </table>`
      : "";
    blocks.push(card(
      `${sectionLabel("Recommended provider")}
       ${matchBlock}
       <div style="font-size:20px;font-weight:700;color:${C.text};margin:0 0 6px;">${e(rec.bestMatch.name)}</div>
       <p style="margin:0 0 12px;font-size:14px;line-height:22px;color:${C.muted};">${e(rec.bestMatch.description)}</p>
       ${rec.bestMatch.reasons.length > 0
         ? `<div style="font-size:13px;font-weight:600;color:${C.text};margin:0 0 6px;">Why it fits your business</div>
            <table role="presentation" cellpadding="0" cellspacing="0">${checkList(rec.bestMatch.reasons, C.primary)}</table>`
         : ""}`,
    ));
  }

  if (avoid.length > 0) {
    const rows = avoid.map((p) =>
      `<tr><td style="padding:10px 14px;background:#ffffff;border:1px solid #f6d3d3;border-radius:8px;">
        <div style="font-size:14px;font-weight:600;color:${C.text};">${e(p.name)}</div>
        <div style="font-size:12px;color:${C.muted};margin-top:2px;">${e(p.reason)}</div>
      </td></tr><tr><td style="height:8px;line-height:8px;font-size:0;">&nbsp;</td></tr>`
    ).join("");
    blocks.push(card(
      `${sectionLabel("Providers to avoid", C.danger)}
       <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;">${rows}</table>`,
      C.dangerTint, "#f6d3d3",
    ));
  }

  if (!rec) {
    blocks.push(card(
      `${sectionLabel("Manual review")}
       <p style="margin:0;font-size:15px;line-height:24px;color:${C.text};">We couldn't generate an automated match for your profile, so our team will review your situation personally and come back to you with options.</p>`,
    ));
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <title>${e(content.headline)}</title>
</head>
<body style="margin:0;padding:0;background:${C.surface};font-family:${FONT};">
  <div style="display:none;max-height:0;overflow:hidden;">Your payment provider assessment results from ChosePayments.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.surface};">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">
        <tr><td style="padding:0 4px 20px;">
          <a href="${SITE_URL}" style="text-decoration:none;">
            <img src="${SITE_URL}/logo-mark.png" alt="" width="22" height="24" style="vertical-align:middle;border:0;">
            <span style="vertical-align:middle;font-size:17px;font-weight:600;color:${C.text};margin-left:6px;">Chose<span style="color:${C.primary};">Payments</span></span>
          </a>
        </td></tr>
        <tr><td style="background:#ffffff;border:1px solid ${C.border};border-radius:16px;padding:32px 28px;">
          <p style="margin:0 0 20px;font-size:16px;line-height:24px;color:${C.text};">Hi ${e(ctx.firstName)},</p>
          <p style="margin:0 0 24px;font-size:15px;line-height:24px;color:${C.muted};">Thanks for completing the ChosePayments assessment. Here are your results.</p>

          <div style="text-align:center;margin:0 0 24px;">
            <span style="display:inline-block;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${C.primary};background:${C.primaryTint};border:1px solid ${C.primaryBorder};border-radius:999px;padding:4px 12px;margin:0 0 12px;">${e(SEGMENT_LABELS[segment])}</span>
            <h1 style="margin:0 0 8px;font-size:24px;line-height:32px;font-weight:700;color:${C.text};">${e(content.headline)}</h1>
            <p style="margin:0;font-size:15px;line-height:24px;color:${C.muted};">${e(content.intro)}</p>
          </div>

          ${blocks.join("\n")}

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 0;">
            <tr><td align="center" style="padding:20px 0 4px;border-top:1px solid ${C.border};">
              <p style="margin:0 0 16px;font-size:15px;line-height:24px;color:${C.text};">Want help getting approved${rec && !isShopify ? ` with ${e(rec.bestMatch.name)}` : ""}? We'll make the introduction and handle the details.</p>
              <a href="${CONTACT_URL}" style="display:inline-block;background:${C.primary};color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;padding:14px 28px;border-radius:12px;">Contact us &rarr;</a>
              <p style="margin:16px 0 0;font-size:14px;line-height:22px;color:${C.muted};">
                Prefer to talk? <a href="${BOOKING_URL}" style="color:${C.primary};text-decoration:none;font-weight:500;">Book a free 15-minute call</a><br>
                or just reply to this email.
              </p>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:20px 8px 0;text-align:center;font-size:12px;line-height:18px;color:${C.muted};">
          You're receiving this because you completed the assessment at <a href="${SITE_URL}" style="color:${C.muted};">chosepayments.com</a>.<br>
          ChosePayments · <a href="mailto:hello@chosepayments.com" style="color:${C.muted};">hello@chosepayments.com</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  // Plain-text alternative, for clients that block HTML and for spam scoring.
  const lines: string[] = [
    `Hi ${ctx.firstName},`,
    "",
    "Thanks for completing the ChosePayments assessment. Here are your results.",
    "",
    `${content.headline} (${SEGMENT_LABELS[segment]})`,
    content.intro,
    "",
    "YOUR BUSINESS PROFILE",
    ...profileRows(raw).map(([label, value]) => `- ${label}: ${value}`),
    "",
  ];
  if (isShopify) {
    lines.push("You're on Shopify, so you already have access to Shopify Payments. If you'd like to compare it with other options, get in touch.", "");
  }
  if (showSavings) {
    lines.push(
      "MISALIGNMENT DETECTED",
      `- Currently with: ${raw.currentProcessor}`,
      `- Potential saving: ${formatGBP(savings.monthlySavingsLow)}–${formatGBP(savings.monthlySavingsHigh)}/mo (illustrative)`,
      "",
    );
  }
  if (rec && !isShopify) {
    lines.push("RECOMMENDED PROVIDER", `${rec.bestMatch.name}${match !== null ? ` (${match}% match)` : ""}`, rec.bestMatch.description);
    lines.push(...rec.bestMatch.reasons.map((r) => `- ${r}`), "");
  }
  if (avoid.length > 0) {
    lines.push("PROVIDERS TO AVOID", ...avoid.map((p) => `- ${p.name}: ${p.reason}`), "");
  }
  if (!rec) {
    lines.push("We couldn't generate an automated match for your profile, so our team will review your situation personally.", "");
  }
  lines.push(
    `Contact us: ${CONTACT_URL}`,
    `Book a free 15-minute call: ${BOOKING_URL}`,
    "Or just reply to this email.",
    "",
    "ChosePayments · hello@chosepayments.com",
  );

  return {
    subject: rec && !isShopify
      ? `Your payment provider match: ${rec.bestMatch.name}`
      : "Your ChosePayments assessment results",
    html,
    text: lines.join("\n"),
  };
};

// ============================================================================
// LEAD EMAIL (internal, to hello@)
// ============================================================================

const formatValue = (value: unknown): string => {
  if (value === null || value === undefined || value === "") return "Not provided";
  if (Array.isArray(value)) return value.length === 0 ? "None" : value.map((v) => e(String(v))).join(", ");
  return e(String(value));
};

const row = (label: string, value: unknown, highlight = false) =>
  `<tr${highlight ? ' class="highlight"' : ""}><th>${e(label)}</th><td>${formatValue(value)}</td></tr>`;

export const buildLeadEmail = (ctx: AssessmentContext): { subject: string; html: string } => {
  const { raw, recommendation: rec } = ctx;
  const providerName = rec?.bestMatch.name || "Advisory Review";
  const match = rec ? matchPercent(rec) : null;

  const html = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: ${FONT}; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px; }
    h1 { color: #1a1a1a; border-bottom: 2px solid ${C.primary}; padding-bottom: 10px; }
    h2 { color: #374151; margin-top: 30px; border-left: 4px solid ${C.primary}; padding-left: 12px; }
    table { width: 100%; border-collapse: collapse; margin: 15px 0; }
    th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid #e5e7eb; vertical-align: top; }
    th { background: #f9fafb; font-weight: 600; color: #374151; width: 40%; }
    td { color: #4b5563; }
    .highlight { background: #ecfdf5; }
    ul { margin: 0; padding-left: 20px; }
    .meta-section { background: #f3f4f6; padding: 15px; border-radius: 8px; margin-top: 30px; }
  </style>
</head>
<body>
  <h1>New ChosePayments Lead – ${e(providerName)}</h1>
  <p>Source: risk assessment. The visitor has been emailed these results.</p>

  <h2>1. Contact</h2>
  <table>
    ${row("Full Name", ctx.fullName)}
    ${row("Email", ctx.email)}
    ${row("Current Provider", raw.currentProcessor)}
    ${row("Pain Points", raw.painPoints)}
  </table>

  <h2>2. Recommendation</h2>
  <table>
    ${row("Recommended Provider", providerName, true)}
    ${row("Market", ctx.market, true)}
    ${row("Segment", `${SEGMENT_LABELS[ctx.segment]} (${ctx.segment})`, true)}
    ${row("Match Alignment", match !== null ? `${match}% (score ${rec?.bestMatch.score})` : "")}
    ${row("Risk Confidence", rec?.riskConfidence)}
    ${row("Reserve Probability", rec?.reserveProbability)}
    ${row("Alternatives", rec?.acceptable.map((a) => a.name))}
    ${row("Logic Path", "tiered-engine (server-side, emailed)")}
  </table>
  ${rec && rec.bestMatch.reasons.length > 0
    ? `<p><strong>Reasons for recommendation:</strong></p><ul>${rec.bestMatch.reasons.map((r) => `<li>${e(r)}</li>`).join("")}</ul>`
    : ""}
  ${rec && rec.avoid.length > 0
    ? `<p><strong>Eliminated providers:</strong></p><ul>${rec.avoid.map((a) => `<li>${e(a.name)} – ${e(a.reason)}</li>`).join("")}</ul>`
    : ""}

  <h2>3. Quiz Answers</h2>
  <table>
    ${row("Sales Channel", raw.salesChannel)}
    ${row("Business Type", raw.businessType)}
    ${row("Industry", raw.industry)}
    ${row("Platform", raw.platform)}
    ${row("Monthly Volume", raw.monthlyVolume)}
    ${row("Volume Tier", raw.volumeTier)}
    ${row("Average Transaction", raw.avgTransaction)}
    ${row("Location", raw.location)}
    ${row("Priorities", raw.priorities)}
    ${row("Terminal Type", raw.terminalType)}
    ${row("Delivery Timeline", raw.deliveryTimeline)}
    ${row("Previous Restriction", raw.previousRestriction)}
    ${row("Decline History", raw.declineHistory)}
    ${row("Marketplace Model", raw.marketplaceModel)}
    ${row("Marketplace Challenge", raw.marketplaceChallenge)}
    ${row("Revenue Model", raw.revenueModel)}
    ${row("Billing Challenge", raw.billingChallenge)}
    ${row("Location Count", raw.locationCount)}
    ${row("Sales Mix", raw.salesMix)}
    ${row("Buying Intent", raw.buyingIntent)}
    ${row("Contact Time", raw.contactTime)}
  </table>

  <div class="meta-section">
    <h2 style="margin-top: 0;">4. Meta</h2>
    <table>
      ${row("Submission Timestamp", ctx.submittedAt)}
      ${row("Lead ID (assessment_leads)", ctx.leadId || "not stored")}
      ${row("Client IP", ctx.ip)}
    </table>
  </div>
</body>
</html>`;

  return { subject: `New ChosePayments Lead – ${providerName}`, html };
};
