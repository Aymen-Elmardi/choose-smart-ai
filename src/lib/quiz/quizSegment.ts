// Segment routing brain for the quiz.
// Maps platform + industry + business type into one of the target segments,
// and derives the lead-routing volume tier.
import type { QuizAnswers, QuizSegment, VolumeTier } from "@/types/quiz";

/**
 * Platform options shown in the "What platform powers your business?" question.
 * The label is what the user sees; the value is stored on answers.platform.
 */
export const PLATFORM_OPTIONS = [
  "Shopify / Shopify Plus",
  "WooCommerce (self-hosted WordPress)",
  "Magento / Adobe Commerce",
  "Custom-built solution",
  "BigCommerce",
  "Wix / Squarespace",
  "Marketplace platform (Amazon, eBay, Etsy, etc.)",
  "SaaS / Subscription platform",
  "Other",
];

const SELF_HOSTED_PLATFORMS = new Set([
  "WooCommerce (self-hosted WordPress)",
  "Magento / Adobe Commerce",
  "Custom-built solution",
  "BigCommerce",
  "Wix / Squarespace",
  "Other",
]);

/**
 * Industry values (from INDUSTRY_OPTIONS) that are treated as high-risk.
 * High-risk dominates segment routing because it most constrains which
 * providers will even accept the application.
 */
export const HIGH_RISK_INDUSTRIES = new Set([
  "adult",
  "gambling",
  "cbd",
  "crypto",
  "firearms",
  "tobacco",
  "supplements",
  "financial-services",
]);

/**
 * SaaS / subscription industries.
 */
const SAAS_INDUSTRIES = new Set(["saas", "subscription"]);

/**
 * Derive the business segment from the full answer set.
 * Precedence (most consequential first):
 *   1. Shopify platform        -> soft-capture exit
 *   2. High-risk industry      -> risk specialist flow
 *   3. Marketplace             -> multi-merchant flow
 *   4. SaaS / subscription     -> recurring billing flow
 *   5. Multi-location / franchise -> omnichannel flow
 *   6. default                 -> self-hosted ecommerce
 */
export const deriveSegment = (answers: QuizAnswers): QuizSegment => {
  const platform = answers.platform || "";
  const industry = answers.industry || "";
  const businessType = answers.businessType || "";

  // 1. Shopify lock-in (soft capture)
  if (platform === "Shopify / Shopify Plus") {
    return "shopify";
  }

  // 2. High-risk industry dominates
  if (HIGH_RISK_INDUSTRIES.has(industry)) {
    return "high-risk";
  }

  // 3. Marketplace (platform choice, sales channel flag, or business type)
  if (
    platform === "Marketplace platform (Amazon, eBay, Etsy, etc.)" ||
    answers.needsMarketplace ||
    businessType === "Marketplace or platform" ||
    businessType === "Platform" ||
    industry === "marketplace"
  ) {
    return "marketplace";
  }

  // 4. SaaS / subscription
  if (platform === "SaaS / Subscription platform" || SAAS_INDUSTRIES.has(industry)) {
    return "saas";
  }

  // 5. Multi-location retail / hospitality
  if (
    businessType === "Multi-location business" ||
    businessType === "Franchise" ||
    industry === "hospitality"
  ) {
    return "multi-location";
  }

  // 6. Self-hosted ecommerce (default for WooCommerce/Magento/Custom/etc.)
  if (SELF_HOSTED_PLATFORMS.has(platform) || platform === "") {
    return "self-hosted";
  }

  return "self-hosted";
};

/**
 * Derive the lead-routing volume tier from the raw monthlyVolume answer.
 * We TAG and KEEP every lead (no hard gating) so the sales team can prioritise.
 *   < £10k          -> too-small (resources, low priority)
 *   £10k–£50k       -> nurture   (revisit in 6–12 months)
 *   £50k+           -> qualified (full advisory)
 */
export const deriveVolumeTier = (monthlyVolume: string): VolumeTier => {
  switch (monthlyVolume) {
    case "Just getting started":
    case "Under £10k":
      return "too-small";
    case "£10k–£50k":
      return "nurture";
    case "£50k+":
      return "qualified";
    default:
      return "unknown";
  }
};

/**
 * Human-readable label for a segment (used in results + lead routing).
 */
export const SEGMENT_LABELS: Record<QuizSegment, string> = {
  "self-hosted": "Self-Hosted Ecommerce",
  marketplace: "Marketplace Operator",
  saas: "SaaS / Subscription",
  "multi-location": "Multi-Location Retail",
  "high-risk": "High-Risk Vertical",
  shopify: "Shopify Merchant",
  unknown: "General",
};
