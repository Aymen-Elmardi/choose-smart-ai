// Quiz question configurations and industry options
import type { Question, QuizAnswers } from "@/types/quiz";

/**
 * Industry options for the dropdown question
 * Values map to engine risk keys
 */
export const INDUSTRY_OPTIONS = [
  { label: "E-commerce / Online Retail", value: "ecommerce" },
  { label: "Retail / Physical Store", value: "retail" },
  { label: "Food & Beverage", value: "food-beverage" },
  { label: "Hospitality / Hotels", value: "hospitality" },
  { label: "Professional Services", value: "professional-services" },
  { label: "SaaS / Software", value: "saas" },
  { label: "Travel & Tourism", value: "travel" },
  { label: "Subscription Business", value: "subscription" },
  { label: "Health & Wellness", value: "nutraceuticals" },
  { label: "Fashion & Apparel", value: "fashion" },
  { label: "Digital Products / Services", value: "digital-goods" },
  { label: "Marketplace / Platform", value: "marketplace" },
  { label: "Mobile Vendor / Market Stall", value: "mobile-vendor" },
  { label: "Franchise", value: "franchise" },
  { label: "Delivery Services", value: "delivery" },
  // High-risk verticals (route to the high-risk segment)
  { label: "Adult / Dating", value: "adult" },
  { label: "Gaming / Gambling", value: "gambling" },
  { label: "CBD / Cannabis", value: "cbd" },
  { label: "Cryptocurrency / NFTs", value: "crypto" },
  { label: "Firearms / Weapons", value: "firearms" },
  { label: "Tobacco / Vaping", value: "tobacco" },
  { label: "Supplements / Nutraceuticals", value: "supplements" },
  { label: "Financial Services (non-bank)", value: "financial-services" },
  { label: "Other", value: "ecommerce" },
];

/**
 * "What best describes your business?" options. Each one sets the platform and
 * business type that deriveSegment and the engine already read, so this one
 * question replaces the old platform and business-type questions.
 */
export const BUSINESS_MODEL_OPTIONS: {
  label: string;
  platform: string;
  businessType: string;
  marketplace?: boolean;
}[] = [
  { label: "Online store on Shopify", platform: "Shopify / Shopify Plus", businessType: "Solo business" },
  { label: "Online store on another platform (WooCommerce, Magento, custom)", platform: "Custom-built solution", businessType: "Solo business" },
  { label: "SaaS or subscription business", platform: "SaaS / Subscription platform", businessType: "Solo business" },
  { label: "Marketplace or platform that pays out sellers", platform: "", businessType: "Marketplace or platform", marketplace: true },
  { label: "Shop, restaurant or service business", platform: "", businessType: "Solo business" },
  { label: "Several locations or a franchise", platform: "", businessType: "Multi-location business" },
];

export const VOLUME_OPTIONS = [
  "Just getting started",
  "Under $10k",
  "$10k–$50k",
  "$50k–$250k",
  "$250k+",
];

/**
 * "What's the main problem you want to fix?" options, with what each one
 * feeds into the engine: a priority code (scored against provider strengths)
 * and, for seller payouts, the split-payments feature.
 */
export const CHALLENGE_OPTIONS: { label: string; priority?: string; feature?: string }[] = [
  { label: "Fees are too high", priority: "low-fees" },
  { label: "Account frozen, restricted or funds held", priority: "account-stability" },
  { label: "Declined or turned away by providers", priority: "account-stability" },
  { label: "Chargebacks or fraud", priority: "fraud-prevention" },
  { label: "Slow payouts", priority: "fast-settlement" },
  { label: "Failed recurring payments", priority: "recurring-billing" },
  { label: "Paying out sellers", feature: "split-payments" },
  { label: "Starting out and need my first provider", priority: "fast-setup" },
];

/**
 * The US assessment: five questions, the same for everyone. Location is no
 * longer asked; every assessment is treated as a US business (owner decision,
 * 2026-10-29).
 */
export const getQuestions = (_answers: QuizAnswers): Question[] => [
  {
    id: "salesChannel",
    question: "How do you take payments?",
    subtext: "",
    options: ["Online only", "In person only", "Online and in person"],
  },
  {
    id: "businessModel",
    question: "What best describes your business?",
    subtext: "This tells us which processors are built for a business like yours.",
    options: BUSINESS_MODEL_OPTIONS.map((o) => o.label),
  },
  {
    id: "industry",
    question: "What industry are you in?",
    subtext: "Industry is the biggest factor in which providers will accept your application.",
    type: "dropdown",
    dropdownOptions: INDUSTRY_OPTIONS,
  },
  {
    id: "monthlyVolume",
    question: "How much do you process in card payments each month?",
    subtext: "A rough figure is fine.",
    options: VOLUME_OPTIONS,
  },
  {
    id: "challenges",
    question: "What's the main problem you want to fix?",
    subtext: "Select up to 2.",
    multiSelect: true,
    maxSelect: 2,
    options: CHALLENGE_OPTIONS.map((o) => o.label),
  },
];

/**
 * Get the total number of questions based on current answers
 */
export const getQuestionCount = (answers: QuizAnswers): number => {
  return getQuestions(answers).length;
};
