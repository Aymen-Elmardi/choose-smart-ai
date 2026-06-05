// Segment-specific results content + ROI framing for the recommendation page.
// Presentation layer only — provider rankings come from the (segment-aware)
// recommendation engine. This drives the headline, situation analysis and CTA.
import type { QuizSegment } from "@/types/quiz";

export interface SegmentResultContent {
  headline: string;
  intro: string;
  alertLabel: string; // shown in the amber "detected" banner
  ctaLabel: string;
  ctaSubtext: string;
}

export const SEGMENT_RESULTS: Record<QuizSegment, SegmentResultContent> = {
  "self-hosted": {
    headline: "Your Payment Processor Misalignment Report",
    intro: "Based on your platform and volume, here's where your current setup may be costing you — and which processors fit better.",
    alertLabel: "Misalignment check",
    ctaLabel: "Get Personalized Quotes",
    ctaSubtext: "We'll handle the negotiation and setup with your recommended providers.",
  },
  marketplace: {
    headline: "Your Multi-Merchant Payment Stack Analysis",
    intro: "Marketplaces need split settlement, seller payouts and built-in compliance. Here's how the right processors line up for your model.",
    alertLabel: "Settlement complexity",
    ctaLabel: "Schedule Technical Review",
    ctaSubtext: "A free 30-minute call to map your multi-merchant migration.",
  },
  saas: {
    headline: "Your Recurring Billing Optimization Report",
    intro: "Subscription businesses live and die by involuntary churn and dunning. Here's where you can recover revenue and which processors help.",
    alertLabel: "Involuntary churn opportunity",
    ctaLabel: "Get Churn Analysis",
    ctaSubtext: "A free 20-minute review of your dunning and retry strategy.",
  },
  "multi-location": {
    headline: "Your Omnichannel Payment Optimization Report",
    intro: "Running multiple locations means unifying online and POS into one settlement and reporting layer. Here's how the right platforms compare.",
    alertLabel: "Omnichannel fragmentation",
    ctaLabel: "Schedule Implementation Review",
    ctaSubtext: "A free 30-minute call to coordinate your omnichannel migration.",
  },
  "high-risk": {
    headline: "Your High-Risk Payment Solution",
    intro: "Your industry faces termination risk and limited options. Here's a stable, specialist-led path to long-term processing.",
    alertLabel: "High-risk classification",
    ctaLabel: "Get Risk Mitigation Plan",
    ctaSubtext: "A free 30-minute consultation with our high-risk specialists.",
  },
  shopify: {
    headline: "You're on Shopify",
    intro: "Shopify merchants already have Shopify Payments built in. We specialise in self-hosted, marketplace and SaaS businesses — but we can still help you compare costs.",
    alertLabel: "Shopify Payments available",
    ctaLabel: "Compare My Costs",
    ctaSubtext: "Optional, low-pressure. We'll show how Shopify Payments compares to alternatives.",
  },
  unknown: {
    headline: "Your Risk Profile Results",
    intro: "Based on your business profile, here's how providers align with your risk signals.",
    alertLabel: "Profile summary",
    ctaLabel: "Get Personalized Guidance",
    ctaSubtext: "Free. No commitment. Your risk profile is included automatically.",
  },
};

// Representative monthly processing volume per raw quiz answer (GBP).
const VOLUME_MIDPOINTS: Record<string, number> = {
  "Just getting started": 3000,
  "Under £10k": 7000,
  "£10k–£50k": 30000,
  "£50k+": 75000,
};

// Processors typically charging blended flat rates (vs. Interchange++).
const FLAT_RATE_PROCESSORS = new Set([
  "Stripe",
  "PayPal",
  "Square",
  "Wise / Skrill",
]);

const FLAT_RATE = 0.019; // ~1.9% blended flat
const ICPP_EFFECTIVE_RATE = 0.009; // ~0.9% effective on Interchange++

export interface SavingsEstimate {
  applicable: boolean;
  monthlyVolume: number;
  currentMonthlyFees: number;
  optimizedMonthlyFees: number;
  monthlySavingsLow: number;
  monthlySavingsHigh: number;
  annualSavingsLow: number;
  annualSavingsHigh: number;
}

/**
 * Rough, clearly-labelled savings estimate for self-hosted merchants currently
 * on a flat-rate processor. Returns applicable:false when we can't responsibly
 * estimate (unknown processor, already on IC++, or volume too small to matter).
 */
export const estimateSavings = (
  currentProcessor: string | undefined,
  monthlyVolumeRaw: string | undefined
): SavingsEstimate => {
  const monthlyVolume = VOLUME_MIDPOINTS[monthlyVolumeRaw || ""] || 0;
  const onFlatRate = !!currentProcessor && FLAT_RATE_PROCESSORS.has(currentProcessor);
  const applicable = onFlatRate && monthlyVolume >= 10000;

  const currentMonthlyFees = Math.round(monthlyVolume * FLAT_RATE);
  const optimizedMonthlyFees = Math.round(monthlyVolume * ICPP_EFFECTIVE_RATE);
  const monthlySavings = currentMonthlyFees - optimizedMonthlyFees;

  // Present a band (±20%) rather than false precision.
  const monthlySavingsLow = Math.round((monthlySavings * 0.8) / 5) * 5;
  const monthlySavingsHigh = Math.round((monthlySavings * 1.2) / 5) * 5;

  return {
    applicable,
    monthlyVolume,
    currentMonthlyFees,
    optimizedMonthlyFees,
    monthlySavingsLow,
    monthlySavingsHigh,
    annualSavingsLow: monthlySavingsLow * 12,
    annualSavingsHigh: monthlySavingsHigh * 12,
  };
};

export const formatGBP = (n: number): string =>
  `£${Math.round(n).toLocaleString("en-GB")}`;
