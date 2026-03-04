// Provider registry and scoring data extracted from the recommendation engine
// This is the single source of truth for the scoring logic visualization

export type PaymentType = "online" | "in-person" | "marketplace" | "subscriptions";
export type TerminalType = "wired" | "portable-sim" | "none";
export type Region = "UK" | "EU" | "both";
export type RiskLevel = "green" | "amber" | "red";

export interface ProviderConfig {
  id: string;
  name: string;
  description: string;
  paymentTypes: PaymentType[];
  terminalSupport: TerminalType[];
  marketplaceCapability: boolean;
  splitPaymentsSupport: boolean;
  regions: Region[];
  minimumMonthlyVolume: number;
  riskAppetite: Record<string, RiskLevel>;
  exclusions: string[];
  strengths: string[];
}

export const PROVIDER_REGISTRY: ProviderConfig[] = [
  { id: "stripe", name: "Stripe", description: "The leading payment platform for online businesses, offering powerful APIs and seamless international payment support.", paymentTypes: ["online", "subscriptions", "marketplace"], terminalSupport: ["wired", "portable-sim"], marketplaceCapability: true, splitPaymentsSupport: true, regions: ["both"], minimumMonthlyVolume: 0, riskAppetite: { "ecommerce": "green", "saas": "green", "marketplace": "green", "retail": "green", "hospitality": "green", "professional-services": "green", "gambling": "red", "adult": "red", "crypto": "amber", "cbd": "amber", "nutraceuticals": "amber", "travel": "green", "subscription-box": "green", "subscription-ecommerce": "green", "food-delivery": "green", "ticketing": "green", "education": "green", "gaming": "green" }, exclusions: ["gambling", "adult"], strengths: ["developer-friendly", "international", "subscriptions", "api-first", "scalable"] },
  { id: "square", name: "Square", description: "All-in-one solution for businesses that sell in-person.", paymentTypes: ["online", "in-person"], terminalSupport: ["wired", "portable-sim"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["both"], minimumMonthlyVolume: 0, riskAppetite: { "retail": "green", "hospitality": "green", "food-beverage": "green", "professional-services": "green", "ecommerce": "green", "gambling": "red", "adult": "red", "crypto": "red", "subscription-ecommerce": "amber", "food-delivery": "green", "ticketing": "red", "education": "green", "gaming": "red" }, exclusions: ["gambling", "adult", "crypto"], strengths: ["in-person", "pos-hardware", "easy-setup", "retail", "restaurants"] },
  { id: "paypal", name: "PayPal", description: "Trusted by millions of buyers worldwide.", paymentTypes: ["online"], terminalSupport: ["none"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["both"], minimumMonthlyVolume: 0, riskAppetite: { "ecommerce": "green", "retail": "green", "digital-goods": "green", "gambling": "red", "adult": "red", "crypto": "red", "subscription-ecommerce": "green", "food-delivery": "amber", "ticketing": "amber", "education": "green", "gaming": "red" }, exclusions: ["gambling", "adult", "crypto"], strengths: ["trusted-brand", "buyer-protection", "easy-setup", "low-volume-friendly"] },
  { id: "adyen", name: "Adyen", description: "Enterprise-grade payment platform for high-volume international businesses.", paymentTypes: ["online", "in-person", "marketplace", "subscriptions"], terminalSupport: ["wired", "portable-sim"], marketplaceCapability: true, splitPaymentsSupport: true, regions: ["both"], minimumMonthlyVolume: 50000, riskAppetite: { "ecommerce": "green", "marketplace": "green", "travel": "green", "retail": "green", "hospitality": "green", "gambling": "amber", "adult": "red", "subscription-ecommerce": "green", "food-delivery": "green", "ticketing": "green", "education": "green", "gaming": "amber" }, exclusions: ["adult"], strengths: ["enterprise", "international", "omnichannel", "high-volume", "unified-commerce"] },
  { id: "datman", name: "Datman", description: "Specialist in native split payments and marketplace payouts for UK platforms.", paymentTypes: ["online", "marketplace"], terminalSupport: ["none"], marketplaceCapability: true, splitPaymentsSupport: true, regions: ["UK"], minimumMonthlyVolume: 10000, riskAppetite: { "marketplace": "green", "franchise": "green", "hospitality": "green", "delivery": "green", "ecommerce": "green", "gambling": "red", "adult": "red", "subscription-ecommerce": "amber", "food-delivery": "green", "ticketing": "amber", "education": "amber", "gaming": "red" }, exclusions: ["gambling", "adult"], strengths: ["marketplace", "split-payments", "revenue-share", "uk-specialist"] },
  { id: "sumup", name: "SumUp", description: "Perfect for small businesses with affordable card readers.", paymentTypes: ["in-person", "online"], terminalSupport: ["portable-sim"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["both"], minimumMonthlyVolume: 0, riskAppetite: { "retail": "green", "hospitality": "green", "mobile-vendor": "green", "market-stall": "green", "professional-services": "green", "gambling": "red", "adult": "red", "subscription-ecommerce": "red", "food-delivery": "green", "ticketing": "red", "education": "green", "gaming": "red" }, exclusions: ["gambling", "adult"], strengths: ["low-volume", "portable", "no-monthly-fees", "simple-pricing"] },
  { id: "zettle", name: "Zettle (PayPal)", description: "PayPal's POS solution for in-person payments.", paymentTypes: ["in-person", "online"], terminalSupport: ["portable-sim", "wired"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["both"], minimumMonthlyVolume: 0, riskAppetite: { "retail": "green", "hospitality": "green", "food-beverage": "green", "gambling": "red", "adult": "red", "subscription-ecommerce": "red", "food-delivery": "green", "ticketing": "red", "education": "green", "gaming": "red" }, exclusions: ["gambling", "adult"], strengths: ["in-person", "paypal-integration", "small-business"] },
  { id: "worldpay", name: "Worldpay", description: "One of the UK's largest payment processors.", paymentTypes: ["online", "in-person", "subscriptions"], terminalSupport: ["wired", "portable-sim"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["both"], minimumMonthlyVolume: 5000, riskAppetite: { "retail": "green", "hospitality": "green", "ecommerce": "green", "travel": "amber", "gambling": "amber", "adult": "red", "subscription-ecommerce": "green", "food-delivery": "green", "ticketing": "amber", "education": "green", "gaming": "amber" }, exclusions: ["adult"], strengths: ["established", "uk-presence", "traditional-merchant-services"] },
  { id: "barclaycard", name: "Barclaycard Payments", description: "Traditional UK bank-backed payment processing.", paymentTypes: ["online", "in-person"], terminalSupport: ["wired", "portable-sim"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["UK"], minimumMonthlyVolume: 3000, riskAppetite: { "retail": "green", "hospitality": "green", "professional-services": "green", "ecommerce": "green", "gambling": "red", "adult": "red", "crypto": "red", "subscription-ecommerce": "green", "food-delivery": "green", "ticketing": "amber", "education": "green", "gaming": "red" }, exclusions: ["gambling", "adult", "crypto"], strengths: ["bank-backed", "uk-established", "traditional"] },
  { id: "takepayments", name: "takepayments", description: "UK-focused card machine provider.", paymentTypes: ["in-person", "online"], terminalSupport: ["wired", "portable-sim"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["UK"], minimumMonthlyVolume: 0, riskAppetite: { "retail": "green", "hospitality": "green", "mobile-vendor": "green", "professional-services": "green", "gambling": "red", "adult": "red", "subscription-ecommerce": "red", "food-delivery": "green", "ticketing": "red", "education": "green", "gaming": "red" }, exclusions: ["gambling", "adult"], strengths: ["uk-focused", "simple", "card-machines"] },
  { id: "braintree", name: "Braintree", description: "PayPal-owned platform with robust subscription billing.", paymentTypes: ["online", "subscriptions", "marketplace"], terminalSupport: ["none"], marketplaceCapability: true, splitPaymentsSupport: true, regions: ["both"], minimumMonthlyVolume: 5000, riskAppetite: { "ecommerce": "green", "saas": "green", "subscription": "green", "marketplace": "green", "gambling": "red", "adult": "red", "subscription-ecommerce": "green", "food-delivery": "amber", "ticketing": "green", "education": "green", "gaming": "red" }, exclusions: ["gambling", "adult"], strengths: ["subscriptions", "developer-friendly", "paypal-venmo", "recurring-billing"] },
  { id: "mollie", name: "Mollie", description: "European PSP known for simple integration.", paymentTypes: ["online", "subscriptions"], terminalSupport: ["portable-sim"], marketplaceCapability: true, splitPaymentsSupport: true, regions: ["both"], minimumMonthlyVolume: 0, riskAppetite: { "ecommerce": "green", "saas": "green", "retail": "green", "hospitality": "green", "gambling": "red", "adult": "red", "subscription-ecommerce": "green", "food-delivery": "green", "ticketing": "green", "education": "green", "gaming": "red" }, exclusions: ["gambling", "adult"], strengths: ["european", "local-payment-methods", "simple-integration", "transparent-pricing"] },
  { id: "klarna", name: "Klarna", description: "Buy now, pay later specialist.", paymentTypes: ["online"], terminalSupport: ["none"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["both"], minimumMonthlyVolume: 10000, riskAppetite: { "ecommerce": "green", "fashion": "green", "retail": "green", "gambling": "red", "adult": "red", "crypto": "red", "subscription-ecommerce": "amber", "food-delivery": "red", "ticketing": "red", "education": "red", "gaming": "red" }, exclusions: ["gambling", "adult", "crypto"], strengths: ["bnpl", "consumer-financing", "checkout-boost", "fashion-retail"] },
  { id: "checkout-com", name: "Checkout.com", description: "Enterprise payment platform with global coverage.", paymentTypes: ["online", "subscriptions", "marketplace"], terminalSupport: ["none"], marketplaceCapability: true, splitPaymentsSupport: true, regions: ["both"], minimumMonthlyVolume: 100000, riskAppetite: { "ecommerce": "green", "travel": "green", "gaming": "amber", "crypto": "amber", "gambling": "amber", "adult": "red", "subscription-ecommerce": "green", "food-delivery": "green", "ticketing": "green", "education": "green" }, exclusions: ["adult"], strengths: ["enterprise", "global", "high-volume", "fraud-prevention"] },
  { id: "trust-payments", name: "Trust Payments", description: "Specializes in higher-risk industries.", paymentTypes: ["online", "in-person"], terminalSupport: ["wired", "portable-sim"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["both"], minimumMonthlyVolume: 10000, riskAppetite: { "travel": "green", "hospitality": "green", "ecommerce": "green", "nutraceuticals": "amber", "cbd": "amber", "gambling": "amber", "adult": "red", "subscription-ecommerce": "green", "food-delivery": "amber", "ticketing": "green", "education": "green", "gaming": "amber" }, exclusions: ["adult"], strengths: ["higher-risk", "travel", "specialist-industries"] },
  { id: "revolut-business", name: "Revolut Business", description: "Modern business account with integrated payment acceptance.", paymentTypes: ["online", "in-person"], terminalSupport: ["portable-sim"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["both"], minimumMonthlyVolume: 0, riskAppetite: { "ecommerce": "green", "saas": "green", "professional-services": "green", "retail": "green", "gambling": "red", "adult": "red", "crypto": "amber", "subscription-ecommerce": "green", "food-delivery": "green", "ticketing": "amber", "education": "green", "gaming": "red" }, exclusions: ["gambling", "adult"], strengths: ["multi-currency", "modern-banking", "international", "fast-setup", "fast-settlement"] },
  { id: "gocardless", name: "GoCardless", description: "Specialist in recurring Direct Debit payments.", paymentTypes: ["subscriptions"], terminalSupport: ["none"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["both"], minimumMonthlyVolume: 0, riskAppetite: { "saas": "green", "subscription": "green", "utilities": "green", "membership": "green", "professional-services": "green", "gambling": "red", "adult": "red", "subscription-ecommerce": "green", "food-delivery": "red", "ticketing": "red", "education": "green", "gaming": "red" }, exclusions: ["gambling", "adult"], strengths: ["direct-debit", "recurring", "low-fees", "subscription-focused"] },
  { id: "dojo", name: "Dojo", description: "UK card machine provider with next-day settlements.", paymentTypes: ["in-person", "online"], terminalSupport: ["wired", "portable-sim"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["UK"], minimumMonthlyVolume: 0, riskAppetite: { "retail": "green", "hospitality": "green", "food-beverage": "green", "professional-services": "green", "gambling": "red", "adult": "red", "subscription-ecommerce": "red", "food-delivery": "green", "ticketing": "red", "education": "green", "gaming": "red" }, exclusions: ["gambling", "adult"], strengths: ["fast-settlement", "uk-focused", "card-machines", "hospitality"] },
  { id: "opp", name: "OPP", description: "Specialist marketplace payment platform.", paymentTypes: ["online", "marketplace"], terminalSupport: ["none"], marketplaceCapability: true, splitPaymentsSupport: true, regions: ["both"], minimumMonthlyVolume: 20000, riskAppetite: { "marketplace": "green", "franchise": "green", "platform": "green", "ecommerce": "green", "gambling": "red", "adult": "red", "subscription-ecommerce": "amber", "food-delivery": "amber", "ticketing": "green", "education": "amber", "gaming": "red" }, exclusions: ["gambling", "adult"], strengths: ["marketplace-specialist", "split-payments", "flexible-payouts", "platform-focus"] },
  { id: "elavon", name: "Elavon", description: "Major global payment processor.", paymentTypes: ["online", "in-person"], terminalSupport: ["wired", "portable-sim"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["both"], minimumMonthlyVolume: 5000, riskAppetite: { "retail": "green", "hospitality": "green", "travel": "green", "ecommerce": "green", "gambling": "red", "adult": "red", "subscription-ecommerce": "green", "food-delivery": "green", "ticketing": "green", "education": "green", "gaming": "red" }, exclusions: ["gambling", "adult"], strengths: ["enterprise", "hospitality", "global-reach", "travel"] },
  { id: "airwallex", name: "Airwallex", description: "Global payments platform for international businesses.", paymentTypes: ["online"], terminalSupport: ["none"], marketplaceCapability: true, splitPaymentsSupport: true, regions: ["both"], minimumMonthlyVolume: 10000, riskAppetite: { "ecommerce": "green", "saas": "green", "marketplace": "green", "professional-services": "green", "gambling": "red", "adult": "red", "subscription-ecommerce": "green", "food-delivery": "amber", "ticketing": "amber", "education": "green", "gaming": "red" }, exclusions: ["gambling", "adult"], strengths: ["multi-currency", "international", "fx-optimization", "global-payouts"] },
];

// All industry categories used across providers
export const ALL_INDUSTRIES = [
  "ecommerce", "saas", "marketplace", "retail", "hospitality", "food-beverage",
  "professional-services", "travel", "subscription", "subscription-box", "digital-goods",
  "fashion", "mobile-vendor", "market-stall", "franchise", "delivery", "platform",
  "utilities", "membership", "gaming", "nutraceuticals", "cbd", "crypto", "gambling", "adult",
  "subscription-ecommerce", "food-delivery", "ticketing", "education"
];

// Scoring dimensions for display — REBALANCED
export const SCORING_DIMENSIONS = [
  { dimension: "Base Score", maxPoints: 50, logic: "Every surviving provider starts here" },
  { dimension: "Risk Fit", maxPoints: 40, logic: "Green industry match = +40, Amber = +10. Risk dominates." },
  { dimension: "Volume Alignment", maxPoints: 20, logic: "5 tiers: <£10k, £10k-50k, £50k-250k, £250k-1M, £1M+" },
  { dimension: "Priority Match", maxPoints: "5 each (cap 20)", logic: "low-fees, fast-setup, international, developer-friendly, fast-settlement" },
  { dimension: "Feature Fit", maxPoints: 15, logic: "Subscriptions (+10), split payments (+15)" },
  { dimension: "Channel Match", maxPoints: 10, logic: "In-person channel + in-person strength" },
];

// Hard elimination rules for display
export const ELIMINATION_RULES = [
  {
    rule: "Missing Payment Type",
    description: "Provider doesn't support the required payment type (online, in-person, marketplace, or subscriptions).",
    example: "A marketplace business would eliminate PayPal, Square, SumUp, and others that lack marketplace capability.",
    typicallyEliminates: ["PayPal", "Square", "SumUp", "Zettle", "GoCardless"],
  },
  {
    rule: "Region Mismatch",
    description: "Provider doesn't operate in the required region (UK only, EU only, or both).",
    example: "An EU-only business would eliminate Datman, Barclaycard, takepayments, and Dojo (UK-only providers).",
    typicallyEliminates: ["Datman", "Barclaycard", "takepayments", "Dojo"],
  },
  {
    rule: "Volume Below Minimum",
    description: "Monthly volume is below the provider's minimum threshold.",
    example: "A business processing £2,000/month would eliminate Adyen (£50k min), Checkout.com (£100k min), and others.",
    typicallyEliminates: ["Adyen", "Checkout.com", "OPP", "Klarna"],
  },
  {
    rule: "Industry Exclusion",
    description: "The business operates in an industry the provider explicitly excludes.",
    example: "A gambling business is excluded by most providers outright — only Trust Payments and Worldpay consider it.",
    typicallyEliminates: ["Most providers"],
  },
  {
    rule: "Red Risk Appetite",
    description: "Provider rates the industry as 'red' risk — not accepted even if not explicitly excluded.",
    example: "A crypto business is rated red by Square, PayPal, Barclaycard, and Klarna.",
    typicallyEliminates: ["Square", "PayPal", "Barclaycard", "Klarna"],
  },
  {
    rule: "Marketplace Required",
    description: "Business needs marketplace/split-payment capability but the provider doesn't support it.",
    example: "A platform needing split payments eliminates Square, PayPal, SumUp, Worldpay, and most traditional providers.",
    typicallyEliminates: ["Square", "PayPal", "SumUp", "Worldpay", "Barclaycard"],
  },
];

// Sample walkthrough data
export const SAMPLE_WALKTHROUGH = {
  answers: {
    salesChannel: "online",
    businessType: "marketplace",
    priorities: ["low-fees", "international"],
    location: "uk",
    monthlyVolume: "20k-50k",
    avgTransaction: "50-100",
    features: ["split-payments"],
    industry: "ecommerce",
  },
  label: "UK online marketplace, £20k-50k/month, needs split payments",
};
