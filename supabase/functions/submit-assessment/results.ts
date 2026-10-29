// Presentation rules for the assessment results, as the results page used to
// render them. The page no longer shows results (they are emailed instead), so
// the rules live here, next to the email that uses them.
//
// SEGMENT_LABELS, SEGMENT_RESULTS and estimateSavings mirror
// src/lib/quiz/quizSegment.ts and src/lib/quiz/segmentResults.ts, which the site
// still uses. Edge functions cannot import from src/, so keep the two in step.

import type { EliminatedProvider, RecommendationResult, Segment } from "../_shared/recommendationEngine.ts";

export const SEGMENT_LABELS: Record<Segment, string> = {
  "self-hosted": "Self-Hosted Ecommerce",
  marketplace: "Marketplace Operator",
  saas: "SaaS / Subscription",
  "multi-location": "Multi-Location Retail",
  "high-risk": "High-Risk Vertical",
  shopify: "Shopify Merchant",
  unknown: "General",
};

export const SEGMENT_RESULTS: Record<Segment, { headline: string; intro: string }> = {
  "self-hosted": {
    headline: "Your Payment Processor Misalignment Report",
    intro: "Based on your platform and volume, here's where your current setup may be costing you — and which processors fit better.",
  },
  marketplace: {
    headline: "Your Multi-Merchant Payment Stack Analysis",
    intro: "Marketplaces need split settlement, seller payouts and built-in compliance. Here's how the right processors line up for your model.",
  },
  saas: {
    headline: "Your Recurring Billing Optimization Report",
    intro: "Subscription businesses live and die by involuntary churn and dunning. Here's where you can recover revenue and which processors help.",
  },
  "multi-location": {
    headline: "Your Omnichannel Payment Optimization Report",
    intro: "Running multiple locations means unifying online and POS into one settlement and reporting layer. Here's how the right platforms compare.",
  },
  "high-risk": {
    headline: "Your High-Risk Payment Solution",
    intro: "Your industry faces termination risk and limited options. Here's a stable, specialist-led path to long-term processing.",
  },
  shopify: {
    headline: "You're on Shopify",
    intro: "Shopify merchants already have Shopify Payments built in. We specialise in self-hosted, marketplace and SaaS businesses — but we can still help you compare costs.",
  },
  unknown: {
    headline: "Your Risk Profile Results",
    intro: "Based on your business profile, here's how providers align with your risk signals.",
  },
};

const SEGMENTS = Object.keys(SEGMENT_LABELS) as Segment[];

export const toSegment = (value: unknown): Segment =>
  SEGMENTS.includes(value as Segment) ? (value as Segment) : "unknown";

// Whitelist for the "avoid" list. Names must match the engine roster exactly or
// they are silently dropped. Only the first two are shown.
const CURATED_AVOID = [
  "Square", "PayPal", "Adyen", "Datman", "SumUp",
  "Braintree", "Shift4", "Fiserv (Clover)", "Authorize.Net",
  // US roster
  "Quantum ePay", "Easy Pay Direct", "Payline Data", "Helcim", "Stax",
];

// Region mismatches are left out: telling a US merchant to avoid a UK-only
// provider is noise, not advice.
export const providersToAvoid = (avoid: EliminatedProvider[]): EliminatedProvider[] =>
  avoid.filter((p) => CURATED_AVOID.includes(p.name) && !p.reason.startsWith("Region mismatch")).slice(0, 2);

/** The "Match Alignment" percentage: engine score scaled to 155, capped at 99. */
export const matchPercent = (rec: RecommendationResult): number | null =>
  rec.bestMatch.score ? Math.min(Math.round((rec.bestMatch.score / 155) * 100), 99) : null;

// --- Savings estimate (self-hosted on a flat-rate processor) ------------------

const VOLUME_MIDPOINTS: Record<string, number> = {
  "Just getting started": 3000,
  "Under £10k": 7000,
  "£10k–£50k": 30000,
  "£50k+": 75000,
  // US assessment (2026-10-29)
  "Under $10k": 7000,
  "$10k–$50k": 30000,
  "$50k–$250k": 125000,
  "$250k+": 400000,
};

const FLAT_RATE_PROCESSORS = new Set(["Stripe", "PayPal", "Square", "Wise / Skrill"]);

// Effective percentage rates. UK: the original figures. US: Stripe's 2.9%
// flat rate against interchange-plus at an assumed 2.2% interchange and
// network cost plus a 0.5% margin, the assumptions used in
// insights/stripe-alternatives. Per-transaction fees are left out because the
// assessment does not ask for an average ticket.
const RATES: Record<"UK" | "US", { flat: number; icpp: number }> = {
  UK: { flat: 0.019, icpp: 0.009 },
  US: { flat: 0.029, icpp: 0.027 },
};

export interface SavingsEstimate {
  applicable: boolean;
  currentMonthlyFees: number;
  optimizedMonthlyFees: number;
  monthlySavingsLow: number;
  monthlySavingsHigh: number;
  annualSavingsLow: number;
  annualSavingsHigh: number;
}

export const estimateSavings = (currentProcessor: string, monthlyVolumeRaw: string, market: string): SavingsEstimate => {
  const monthlyVolume = VOLUME_MIDPOINTS[monthlyVolumeRaw] || 0;
  const applicable = FLAT_RATE_PROCESSORS.has(currentProcessor) && monthlyVolume >= 10000;
  const rates = RATES[market === "US" ? "US" : "UK"];

  const currentMonthlyFees = Math.round(monthlyVolume * rates.flat);
  const optimizedMonthlyFees = Math.round(monthlyVolume * rates.icpp);
  const monthlySavings = currentMonthlyFees - optimizedMonthlyFees;
  const monthlySavingsLow = Math.round((monthlySavings * 0.8) / 5) * 5;
  const monthlySavingsHigh = Math.round((monthlySavings * 1.2) / 5) * 5;

  return {
    applicable,
    currentMonthlyFees,
    optimizedMonthlyFees,
    monthlySavingsLow,
    monthlySavingsHigh,
    annualSavingsLow: monthlySavingsLow * 12,
    annualSavingsHigh: monthlySavingsHigh * 12,
  };
};

export const formatMoney = (n: number, market: string): string =>
  market === "US"
    ? `$${Math.round(n).toLocaleString("en-US")}`
    : `£${Math.round(n).toLocaleString("en-GB")}`;
