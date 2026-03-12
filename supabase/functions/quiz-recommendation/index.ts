import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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

const checkIpRateLimit = (clientIp: string, max: number = 10): boolean => {
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

// ============================================================================
// TYPES
// ============================================================================

type PaymentType = "online" | "in-person" | "marketplace" | "subscriptions";
type TerminalType = "wired" | "portable-sim" | "none";
type Region = "UK" | "EU" | "both";
type RiskLevel = "green" | "amber" | "red";

interface ProviderConfig {
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

interface QuizAnswers {
  salesChannel: string;
  businessType: string;
  priorities: string[];
  location: string;
  monthlyVolume: string;
  avgTransaction: string;
  features: string[];
  industry?: string;
  deliveryTimeline?: string;
}

interface EliminatedProvider {
  name: string;
  reason: string;
}

interface RecommendationResult {
  bestMatch: { name: string; description: string; reasons: string[] };
  acceptable: { name: string; description: string; reasons: string[] }[];
  avoid: EliminatedProvider[];
  riskConfidence: "high" | "medium" | "low";
  reserveProbability: "low" | "moderate" | "elevated";
}

// ============================================================================
// PROVIDER REGISTRY
// ============================================================================

const PROVIDER_REGISTRY: ProviderConfig[] = [
  { id: "stripe", name: "Stripe", description: "The leading payment platform for online businesses, offering powerful APIs and seamless international payment support.", paymentTypes: ["online", "subscriptions", "marketplace"], terminalSupport: ["wired", "portable-sim"], marketplaceCapability: true, splitPaymentsSupport: true, regions: ["both"], minimumMonthlyVolume: 0, riskAppetite: { "ecommerce": "green", "saas": "green", "marketplace": "green", "retail": "green", "hospitality": "green", "professional-services": "green", "gambling": "red", "adult": "red", "crypto": "amber", "cbd": "amber", "nutraceuticals": "amber", "travel": "green", "subscription-box": "green", "subscription-ecommerce": "green", "food-delivery": "green", "ticketing": "green", "education": "green", "gaming": "green" }, exclusions: ["gambling", "adult"], strengths: ["developer-friendly", "international", "subscriptions", "api-first", "scalable"] },
  { id: "square", name: "Square", description: "All-in-one solution for businesses that sell in-person, with easy-to-use POS hardware and integrated online tools.", paymentTypes: ["online", "in-person"], terminalSupport: ["wired", "portable-sim"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["both"], minimumMonthlyVolume: 0, riskAppetite: { "retail": "green", "hospitality": "green", "food-beverage": "green", "professional-services": "green", "ecommerce": "green", "gambling": "red", "adult": "red", "crypto": "red", "subscription-ecommerce": "amber", "food-delivery": "green", "ticketing": "red", "education": "green", "gaming": "red" }, exclusions: ["gambling", "adult", "crypto"], strengths: ["in-person", "pos-hardware", "easy-setup", "retail", "restaurants"] },
  { id: "paypal", name: "PayPal", description: "Trusted by millions of buyers worldwide, ideal for businesses wanting instant credibility and easy checkout.", paymentTypes: ["online"], terminalSupport: ["none"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["both"], minimumMonthlyVolume: 0, riskAppetite: { "ecommerce": "green", "retail": "green", "digital-goods": "green", "gambling": "red", "adult": "red", "crypto": "red", "subscription-ecommerce": "green", "food-delivery": "amber", "ticketing": "amber", "education": "green", "gaming": "red" }, exclusions: ["gambling", "adult", "crypto"], strengths: ["trusted-brand", "buyer-protection", "easy-setup", "low-volume-friendly"] },
  { id: "adyen", name: "Adyen", description: "Enterprise-grade payment platform for high-volume international businesses and marketplaces.", paymentTypes: ["online", "in-person", "marketplace", "subscriptions"], terminalSupport: ["wired", "portable-sim"], marketplaceCapability: true, splitPaymentsSupport: true, regions: ["both"], minimumMonthlyVolume: 50000, riskAppetite: { "ecommerce": "green", "marketplace": "green", "travel": "green", "retail": "green", "hospitality": "green", "gambling": "amber", "adult": "red", "subscription-ecommerce": "green", "food-delivery": "green", "ticketing": "green", "education": "green", "gaming": "amber" }, exclusions: ["adult"], strengths: ["enterprise", "international", "omnichannel", "high-volume", "unified-commerce"] },
  { id: "datman", name: "Datman", description: "Specialist in native split payments, revenue sharing, and marketplace payouts for UK platforms.", paymentTypes: ["online", "marketplace"], terminalSupport: ["none"], marketplaceCapability: true, splitPaymentsSupport: true, regions: ["UK"], minimumMonthlyVolume: 10000, riskAppetite: { "marketplace": "green", "franchise": "green", "hospitality": "green", "delivery": "green", "ecommerce": "green", "gambling": "red", "adult": "red", "subscription-ecommerce": "amber", "food-delivery": "green", "ticketing": "amber", "education": "amber", "gaming": "red" }, exclusions: ["gambling", "adult"], strengths: ["marketplace", "split-payments", "revenue-share", "uk-specialist"] },
  { id: "sumup", name: "SumUp", description: "Perfect for small businesses with affordable card readers and no monthly fees.", paymentTypes: ["in-person", "online"], terminalSupport: ["portable-sim"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["both"], minimumMonthlyVolume: 0, riskAppetite: { "retail": "green", "hospitality": "green", "mobile-vendor": "green", "market-stall": "green", "professional-services": "green", "gambling": "red", "adult": "red", "subscription-ecommerce": "red", "food-delivery": "green", "ticketing": "red", "education": "green", "gaming": "red" }, exclusions: ["gambling", "adult"], strengths: ["low-volume", "portable", "no-monthly-fees", "simple-pricing"] },
  { id: "zettle", name: "Zettle (PayPal)", description: "PayPal's POS solution for in-person payments with seamless PayPal integration.", paymentTypes: ["in-person", "online"], terminalSupport: ["portable-sim", "wired"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["both"], minimumMonthlyVolume: 0, riskAppetite: { "retail": "green", "hospitality": "green", "food-beverage": "green", "gambling": "red", "adult": "red", "subscription-ecommerce": "red", "food-delivery": "green", "ticketing": "red", "education": "green", "gaming": "red" }, exclusions: ["gambling", "adult"], strengths: ["in-person", "paypal-integration", "small-business"] },
  { id: "worldpay", name: "Worldpay", description: "One of the UK's largest payment processors with comprehensive merchant services.", paymentTypes: ["online", "in-person", "subscriptions"], terminalSupport: ["wired", "portable-sim"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["both"], minimumMonthlyVolume: 5000, riskAppetite: { "retail": "green", "hospitality": "green", "ecommerce": "green", "travel": "amber", "gambling": "amber", "adult": "red", "subscription-ecommerce": "green", "food-delivery": "green", "ticketing": "amber", "education": "green", "gaming": "amber" }, exclusions: ["adult"], strengths: ["established", "uk-presence", "traditional-merchant-services"] },
  { id: "barclaycard", name: "Barclaycard Payments", description: "Traditional UK bank-backed payment processing with strong high-street presence.", paymentTypes: ["online", "in-person"], terminalSupport: ["wired", "portable-sim"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["UK"], minimumMonthlyVolume: 3000, riskAppetite: { "retail": "green", "hospitality": "green", "professional-services": "green", "ecommerce": "green", "gambling": "red", "adult": "red", "crypto": "red", "subscription-ecommerce": "green", "food-delivery": "green", "ticketing": "amber", "education": "green", "gaming": "red" }, exclusions: ["gambling", "adult", "crypto"], strengths: ["bank-backed", "uk-established", "traditional"] },
  { id: "takepayments", name: "takepayments", description: "UK-focused card machine provider with straightforward pricing for small businesses.", paymentTypes: ["in-person", "online"], terminalSupport: ["wired", "portable-sim"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["UK"], minimumMonthlyVolume: 0, riskAppetite: { "retail": "green", "hospitality": "green", "mobile-vendor": "green", "professional-services": "green", "gambling": "red", "adult": "red", "subscription-ecommerce": "red", "food-delivery": "green", "ticketing": "red", "education": "green", "gaming": "red" }, exclusions: ["gambling", "adult"], strengths: ["uk-focused", "simple", "card-machines"] },
  { id: "braintree", name: "Braintree", description: "PayPal-owned platform with robust subscription billing and developer tools.", paymentTypes: ["online", "subscriptions", "marketplace"], terminalSupport: ["none"], marketplaceCapability: true, splitPaymentsSupport: true, regions: ["both"], minimumMonthlyVolume: 5000, riskAppetite: { "ecommerce": "green", "saas": "green", "subscription": "green", "marketplace": "green", "gambling": "red", "adult": "red", "subscription-ecommerce": "green", "food-delivery": "amber", "ticketing": "green", "education": "green", "gaming": "red" }, exclusions: ["gambling", "adult"], strengths: ["subscriptions", "developer-friendly", "paypal-venmo", "recurring-billing"] },
  { id: "mollie", name: "Mollie", description: "European payment service provider known for simple integration and local payment methods.", paymentTypes: ["online", "subscriptions"], terminalSupport: ["portable-sim"], marketplaceCapability: true, splitPaymentsSupport: true, regions: ["both"], minimumMonthlyVolume: 0, riskAppetite: { "ecommerce": "green", "saas": "green", "retail": "green", "hospitality": "green", "gambling": "red", "adult": "red", "subscription-ecommerce": "green", "food-delivery": "green", "ticketing": "green", "education": "green", "gaming": "red" }, exclusions: ["gambling", "adult"], strengths: ["european", "local-payment-methods", "simple-integration", "transparent-pricing"] },
  { id: "klarna", name: "Klarna", description: "Buy now, pay later specialist with strong consumer brand recognition.", paymentTypes: ["online"], terminalSupport: ["none"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["both"], minimumMonthlyVolume: 10000, riskAppetite: { "ecommerce": "green", "fashion": "green", "retail": "green", "gambling": "red", "adult": "red", "crypto": "red", "subscription-ecommerce": "amber", "food-delivery": "red", "ticketing": "red", "education": "red", "gaming": "red" }, exclusions: ["gambling", "adult", "crypto"], strengths: ["bnpl", "consumer-financing", "checkout-boost", "fashion-retail"] },
  { id: "checkout-com", name: "Checkout.com", description: "Enterprise payment platform with global coverage and advanced fraud prevention.", paymentTypes: ["online", "subscriptions", "marketplace"], terminalSupport: ["none"], marketplaceCapability: true, splitPaymentsSupport: true, regions: ["both"], minimumMonthlyVolume: 100000, riskAppetite: { "ecommerce": "green", "travel": "green", "gaming": "amber", "crypto": "amber", "gambling": "amber", "adult": "red", "subscription-ecommerce": "green", "food-delivery": "green", "ticketing": "green", "education": "green" }, exclusions: ["adult"], strengths: ["enterprise", "global", "high-volume", "fraud-prevention"] },
  { id: "trust-payments", name: "Trust Payments", description: "Specializes in higher-risk industries and complex payment requirements.", paymentTypes: ["online", "in-person"], terminalSupport: ["wired", "portable-sim"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["both"], minimumMonthlyVolume: 10000, riskAppetite: { "travel": "green", "hospitality": "green", "ecommerce": "green", "nutraceuticals": "amber", "cbd": "amber", "gambling": "amber", "adult": "red", "subscription-ecommerce": "green", "food-delivery": "amber", "ticketing": "green", "education": "green", "gaming": "amber" }, exclusions: ["adult"], strengths: ["higher-risk", "travel", "specialist-industries"] },
  { id: "revolut-business", name: "Revolut Business", description: "Modern business account with integrated payment acceptance and multi-currency support.", paymentTypes: ["online", "in-person"], terminalSupport: ["portable-sim"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["both"], minimumMonthlyVolume: 0, riskAppetite: { "ecommerce": "green", "saas": "green", "professional-services": "green", "retail": "green", "gambling": "red", "adult": "red", "crypto": "amber", "subscription-ecommerce": "green", "food-delivery": "green", "ticketing": "amber", "education": "green", "gaming": "red" }, exclusions: ["gambling", "adult"], strengths: ["multi-currency", "modern-banking", "international", "fast-setup", "fast-settlement"] },
  { id: "gocardless", name: "GoCardless", description: "Specialist in recurring Direct Debit payments for subscriptions and invoicing.", paymentTypes: ["subscriptions"], terminalSupport: ["none"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["both"], minimumMonthlyVolume: 0, riskAppetite: { "saas": "green", "subscription": "green", "utilities": "green", "membership": "green", "professional-services": "green", "gambling": "red", "adult": "red", "subscription-ecommerce": "green", "food-delivery": "red", "ticketing": "red", "education": "green", "gaming": "red" }, exclusions: ["gambling", "adult"], strengths: ["direct-debit", "recurring", "low-fees", "subscription-focused"] },
  { id: "dojo", name: "Dojo", description: "UK card machine provider with next-day settlements and simple pricing.", paymentTypes: ["in-person", "online"], terminalSupport: ["wired", "portable-sim"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["UK"], minimumMonthlyVolume: 0, riskAppetite: { "retail": "green", "hospitality": "green", "food-beverage": "green", "professional-services": "green", "gambling": "red", "adult": "red", "subscription-ecommerce": "red", "food-delivery": "green", "ticketing": "red", "education": "green", "gaming": "red" }, exclusions: ["gambling", "adult"], strengths: ["fast-settlement", "uk-focused", "card-machines", "hospitality"] },
  { id: "opp", name: "OPP (Online Payment Platform)", description: "Specialist marketplace payment platform with strong support for complex payout structures.", paymentTypes: ["online", "marketplace"], terminalSupport: ["none"], marketplaceCapability: true, splitPaymentsSupport: true, regions: ["both"], minimumMonthlyVolume: 20000, riskAppetite: { "marketplace": "green", "franchise": "green", "platform": "green", "ecommerce": "green", "gambling": "red", "adult": "red", "subscription-ecommerce": "amber", "food-delivery": "amber", "ticketing": "green", "education": "amber", "gaming": "red" }, exclusions: ["gambling", "adult"], strengths: ["marketplace-specialist", "split-payments", "flexible-payouts", "platform-focus"] },
  { id: "elavon", name: "Elavon", description: "Major global payment processor with strong presence in hospitality and retail.", paymentTypes: ["online", "in-person"], terminalSupport: ["wired", "portable-sim"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["both"], minimumMonthlyVolume: 5000, riskAppetite: { "retail": "green", "hospitality": "green", "travel": "green", "ecommerce": "green", "gambling": "red", "adult": "red", "subscription-ecommerce": "green", "food-delivery": "green", "ticketing": "green", "education": "green", "gaming": "red" }, exclusions: ["gambling", "adult"], strengths: ["enterprise", "hospitality", "global-reach", "travel"] },
  { id: "airwallex", name: "Airwallex", description: "Global payments platform optimized for international businesses and multi-currency operations.", paymentTypes: ["online"], terminalSupport: ["none"], marketplaceCapability: true, splitPaymentsSupport: true, regions: ["both"], minimumMonthlyVolume: 10000, riskAppetite: { "ecommerce": "green", "saas": "green", "marketplace": "green", "professional-services": "green", "gambling": "red", "adult": "red", "subscription-ecommerce": "green", "food-delivery": "amber", "ticketing": "amber", "education": "green", "gaming": "red" }, exclusions: ["gambling", "adult"], strengths: ["multi-currency", "international", "fx-optimization", "global-payouts"] },
];

// ============================================================================
// INPUT VALIDATION
// ============================================================================

const MAX_STRING_LENGTH = 200;
const MAX_ARRAY_LENGTH = 20;

const isValidString = (value: unknown): value is string => 
  typeof value === "string" && value.length <= MAX_STRING_LENGTH;

const isValidOptionalString = (value: unknown): value is string | undefined => 
  value === undefined || isValidString(value);

const isValidStringArray = (value: unknown): value is string[] => {
  if (!Array.isArray(value) || value.length > MAX_ARRAY_LENGTH) return false;
  return value.every((item) => isValidString(item));
};

const isValidOptionalStringArray = (value: unknown): value is string[] | undefined =>
  value === undefined || isValidStringArray(value);

const validateQuizAnswers = (data: unknown): QuizAnswers | null => {
  if (!data || typeof data !== "object") return null;
  
  const obj = data as Record<string, unknown>;
  
  if (!isValidString(obj.salesChannel)) return null;
  if (!isValidString(obj.businessType)) return null;
  if (!isValidString(obj.location)) return null;
  if (!isValidString(obj.monthlyVolume)) return null;
  if (!isValidString(obj.avgTransaction)) return null;
  if (!isValidStringArray(obj.priorities)) return null;
  if (!isValidStringArray(obj.features)) return null;
  if (!isValidOptionalString(obj.industry)) return null;
  if (!isValidOptionalString(obj.deliveryTimeline)) return null;
  
  return {
    salesChannel: obj.salesChannel as string,
    businessType: obj.businessType as string,
    priorities: obj.priorities as string[],
    location: obj.location as string,
    monthlyVolume: obj.monthlyVolume as string,
    avgTransaction: obj.avgTransaction as string,
    features: obj.features as string[],
    industry: obj.industry as string | undefined,
    deliveryTimeline: obj.deliveryTimeline as string | undefined,
  };
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const parseMonthlyVolume = (volume: string): number => {
  const volumeMap: Record<string, number> = { "under-5k": 2500, "5k-20k": 12500, "20k-50k": 35000, "50k-100k": 75000, "100k-500k": 300000, "500k-plus": 750000, "under-1k": 500, "1k-5k": 3000, "10k-50k": 30000, "50k-200k": 125000, "200k-plus": 400000 };
  return volumeMap[volume] || 10000;
};

const getRequiredPaymentTypes = (answers: QuizAnswers): PaymentType[] => {
  const types: PaymentType[] = [];
  if (answers.salesChannel?.includes("online") || answers.salesChannel?.includes("website")) types.push("online");
  if (answers.salesChannel?.includes("in-person") || answers.salesChannel?.includes("physical")) types.push("in-person");
  if (answers.businessType?.includes("marketplace") || answers.businessType?.includes("platform")) types.push("marketplace");
  if (answers.features?.includes("recurring") || answers.features?.includes("subscriptions")) types.push("subscriptions");
  return types.length > 0 ? types : ["online"];
};

const getRequiredRegion = (location: string): Region | null => {
  if (!location) return null;
  if (location.includes("uk") || location === "united-kingdom") return "UK";
  if (location.includes("eu") || location.includes("europe")) return "EU";
  return "both";
};

const getIndustryFromBusinessType = (businessType: string): string => {
  const industryMap: Record<string, string> = { "ecommerce": "ecommerce", "retail": "retail", "saas": "saas", "marketplace": "marketplace", "hospitality": "hospitality", "restaurant": "food-beverage", "professional-services": "professional-services", "travel": "travel", "subscription": "subscription", "gambling": "gambling", "adult": "adult", "crypto": "crypto", "cbd": "cbd", "nutraceuticals": "nutraceuticals", "subscription-ecommerce": "subscription-ecommerce", "food-delivery": "food-delivery", "ticketing": "ticketing", "education": "education", "gaming": "gaming" };
  for (const [key, value] of Object.entries(industryMap)) {
    if (businessType.toLowerCase().includes(key)) return value;
  }
  return "ecommerce";
};

// ============================================================================
// HARD ELIMINATION (with reasons)
// ============================================================================

const applyHardElimination = (providers: ProviderConfig[], answers: QuizAnswers): { survivors: ProviderConfig[]; eliminated: EliminatedProvider[] } => {
  const requiredPaymentTypes = getRequiredPaymentTypes(answers);
  const requiredRegion = getRequiredRegion(answers.location);
  const monthlyVolume = parseMonthlyVolume(answers.monthlyVolume);
  const industry = answers.industry || getIndustryFromBusinessType(answers.businessType);

  const survivors: ProviderConfig[] = [];
  const eliminated: EliminatedProvider[] = [];

  for (const provider of providers) {
    if (!requiredPaymentTypes.every((type) => provider.paymentTypes.includes(type))) {
      eliminated.push({ name: provider.name, reason: `Does not support required payment type` });
      continue;
    }
    if (requiredRegion && requiredRegion !== "both" && !provider.regions.includes(requiredRegion) && !provider.regions.includes("both")) {
      eliminated.push({ name: provider.name, reason: `Region mismatch (${requiredRegion} required)` });
      continue;
    }
    if (monthlyVolume < provider.minimumMonthlyVolume) {
      eliminated.push({ name: provider.name, reason: `Volume below minimum (£${provider.minimumMonthlyVolume.toLocaleString()})` });
      continue;
    }
    if (provider.exclusions.includes(industry)) {
      eliminated.push({ name: provider.name, reason: `Industry excluded (${industry})` });
      continue;
    }
    if (provider.riskAppetite[industry] === "red") {
      eliminated.push({ name: provider.name, reason: `Risk tolerance exceeded for ${industry}` });
      continue;
    }
    if (requiredPaymentTypes.includes("marketplace") && !provider.marketplaceCapability) {
      eliminated.push({ name: provider.name, reason: `No marketplace capability` });
      continue;
    }
    survivors.push(provider);
  }

  return { survivors, eliminated };
};

// ============================================================================
// SCORING (rebalanced: risk dominates)
// ============================================================================

interface ScoredProvider { provider: ProviderConfig; score: number; reasons: string[]; }

const scoreProviders = (providers: ProviderConfig[], answers: QuizAnswers): ScoredProvider[] => {
  const monthlyVolume = parseMonthlyVolume(answers.monthlyVolume);
  const industry = answers.industry || getIndustryFromBusinessType(answers.businessType);
  const priorities = answers.priorities || [];

  return providers.map((provider) => {
    let score = 50;
    const reasons: string[] = [];

    // Risk Fit — DOMINANT axis (+40 green, +10 amber)
    const riskLevel = provider.riskAppetite[industry];
    if (riskLevel === "green") { score += 40; reasons.push(`Strong risk fit for ${industry} businesses`); }
    else if (riskLevel === "amber") { score += 10; reasons.push(`Accepts ${industry} businesses with additional review`); }

    // Volume Alignment — 5-tier system
    if (monthlyVolume < 10000) {
      if (provider.strengths.includes("low-volume") || provider.strengths.includes("simple-pricing") || provider.strengths.includes("no-monthly-fees")) { score += 10; reasons.push("Suited to lower-volume businesses"); }
    } else if (monthlyVolume >= 10000 && monthlyVolume < 50000) {
      if (provider.minimumMonthlyVolume <= 10000) { score += 10; reasons.push("Good fit for small-business volume"); }
    } else if (monthlyVolume >= 50000 && monthlyVolume < 250000) {
      if (provider.strengths.includes("enterprise") || provider.strengths.includes("high-volume")) { score += 15; reasons.push("Built for mid-market volume"); }
    } else if (monthlyVolume >= 250000 && monthlyVolume < 1000000) {
      if (provider.strengths.includes("enterprise") || provider.strengths.includes("high-volume")) { score += 20; reasons.push("Enterprise-grade volume handling"); }
    } else if (monthlyVolume >= 1000000) {
      if (provider.strengths.includes("enterprise") || provider.strengths.includes("high-volume")) { score += 20; reasons.push("Built for high-volume operations"); }
    }

    // Priority Match — +5 each, capped at +20
    let priorityScore = 0;
    if (priorities.includes("low-fees") && provider.strengths.includes("transparent-pricing")) { priorityScore += 5; reasons.push("Transparent pricing"); }
    if (priorities.includes("fast-setup") && provider.strengths.includes("easy-setup")) { priorityScore += 5; reasons.push("Quick onboarding"); }
    if (priorities.includes("international") && provider.strengths.includes("international")) { priorityScore += 5; reasons.push("International payment support"); }
    if (priorities.includes("developer-friendly") && provider.strengths.includes("developer-friendly")) { priorityScore += 5; reasons.push("Developer-friendly APIs"); }
    if (priorities.includes("fast-settlement") && provider.strengths.includes("fast-settlement")) { priorityScore += 5; reasons.push("Fast settlement times"); }
    score += Math.min(priorityScore, 20);

    // Feature Fit — unchanged
    if (answers.features?.includes("subscriptions") && provider.strengths.includes("subscriptions")) { score += 10; reasons.push("Subscription billing capabilities"); }
    if (answers.features?.includes("split-payments") && provider.splitPaymentsSupport) { score += 15; reasons.push("Native split payment support"); }

    // Channel Match — unchanged
    if (answers.salesChannel?.includes("in-person") && provider.strengths.includes("in-person")) { score += 10; reasons.push("In-person payment solutions"); }

    return { provider, score, reasons };
  });
};

// ============================================================================
// RISK CONFIDENCE + RESERVE PROBABILITY
// ============================================================================

const computeRiskConfidence = (bestMatch: ScoredProvider, survivorCount: number, industry: string, fallbackTriggered: boolean): "high" | "medium" | "low" => {
  if (fallbackTriggered || survivorCount < 3) return "low";
  const riskLevel = bestMatch.provider.riskAppetite[industry];
  if (riskLevel === "green" && survivorCount >= 5) return "high";
  return "medium";
};

const HIGH_RISK_INDUSTRIES = ["gambling", "adult", "crypto", "cbd", "nutraceuticals", "gaming", "ticketing"];

const computeReserveProbability = (industry: string, bestMatchRisk: RiskLevel | undefined): "low" | "moderate" | "elevated" => {
  if (HIGH_RISK_INDUSTRIES.includes(industry)) return "elevated";
  if (bestMatchRisk === "amber") return "moderate";
  return "low";
};

// ============================================================================
// RECOMMENDATION ENGINE
// ============================================================================

const getRecommendations = (answers: QuizAnswers): RecommendationResult | null => {
  const industry = answers.industry || getIndustryFromBusinessType(answers.businessType);
  let { survivors, eliminated } = applyHardElimination(PROVIDER_REGISTRY, answers);

  let fallbackTriggered = false;
  if (survivors.length < 3) {
    fallbackTriggered = true;
    survivors = PROVIDER_REGISTRY.filter((p) => !p.exclusions.includes(industry) && p.riskAppetite[industry] !== "red");
  }

  if (survivors.length === 0) return null;

  const scored = scoreProviders(survivors, answers);
  scored.sort((a, b) => b.score - a.score);

  const bestMatch = scored[0];
  const acceptable = scored.slice(1, 3);

  // Top 5 eliminated providers for the avoid list
  const avoid = eliminated.slice(0, 5);

  const riskConfidence = computeRiskConfidence(bestMatch, survivors.length, industry, fallbackTriggered);
  const reserveProbability = computeReserveProbability(industry, bestMatch.provider.riskAppetite[industry]);

  return {
    bestMatch: { name: bestMatch.provider.name, description: bestMatch.provider.description, reasons: bestMatch.reasons.slice(0, 4), score: bestMatch.score },
    acceptable: acceptable.map((alt) => ({ name: alt.provider.name, description: alt.provider.description, reasons: alt.reasons.slice(0, 3) })),
    avoid,
    riskConfidence,
    reserveProbability,
  };
};

// ============================================================================
// HANDLER
// ============================================================================

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to quiz-recommendation");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIp = getClientIp(req);
  console.log(`Request from IP: ${clientIp}`);

  if (!checkIpRateLimit(clientIp, 10)) {
    console.warn(`Rate limit exceeded for IP: ${clientIp}`);
    return errorResponse("Too many requests. Please try again later.", 429);
  }

  try {
    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      console.warn("Failed to parse JSON body");
      return errorResponse("Invalid JSON format", 400);
    }

    const answers = validateQuizAnswers(rawBody);
    if (!answers) {
      console.warn("Invalid quiz answers structure");
      return errorResponse("Invalid quiz data. Please ensure all required fields are provided.", 400);
    }
    
    console.log("Processing quiz answers");

    const startTime = performance.now();
    const result = getRecommendations(answers);
    const executionTimeMs = performance.now() - startTime;

    if (!result) {
      console.warn("No suitable providers found for answers");
      return errorResponse("We couldn't find a suitable provider for your specific requirements. Please contact us for personalized assistance.", 404);
    }

    console.log("Recommendation result:", result.bestMatch.name, `(${executionTimeMs.toFixed(2)}ms)`);
    return successResponse({ recommendation: result, executionTimeMs });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in quiz-recommendation function:", error);
    return errorResponse(errorMessage, 500);
  }
};

serve(handler);
