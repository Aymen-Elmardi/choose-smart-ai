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

interface RecommendationResult {
  primary: { name: string; description: string; reasons: string[] };
  alternatives: { name: string; description: string; reasons: string[] }[];
}

// ============================================================================
// PROVIDER REGISTRY
// ============================================================================

const PROVIDER_REGISTRY: ProviderConfig[] = [
  { id: "stripe", name: "Stripe", description: "The leading payment platform for online businesses, offering powerful APIs and seamless international payment support.", paymentTypes: ["online", "subscriptions", "marketplace"], terminalSupport: ["wired", "portable-sim"], marketplaceCapability: true, splitPaymentsSupport: true, regions: ["both"], minimumMonthlyVolume: 0, riskAppetite: { "ecommerce": "green", "saas": "green", "marketplace": "green", "retail": "green", "hospitality": "green", "professional-services": "green", "gambling": "red", "adult": "red", "crypto": "amber", "cbd": "amber", "nutraceuticals": "amber", "travel": "green", "subscription-box": "green" }, exclusions: ["gambling", "adult"], strengths: ["developer-friendly", "international", "subscriptions", "api-first", "scalable"] },
  { id: "square", name: "Square", description: "All-in-one solution for businesses that sell in-person, with easy-to-use POS hardware and integrated online tools.", paymentTypes: ["online", "in-person"], terminalSupport: ["wired", "portable-sim"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["both"], minimumMonthlyVolume: 0, riskAppetite: { "retail": "green", "hospitality": "green", "food-beverage": "green", "professional-services": "green", "ecommerce": "green", "gambling": "red", "adult": "red", "crypto": "red" }, exclusions: ["gambling", "adult", "crypto"], strengths: ["in-person", "pos-hardware", "easy-setup", "retail", "restaurants"] },
  { id: "paypal", name: "PayPal", description: "Trusted by millions of buyers worldwide, ideal for businesses wanting instant credibility and easy checkout.", paymentTypes: ["online"], terminalSupport: ["none"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["both"], minimumMonthlyVolume: 0, riskAppetite: { "ecommerce": "green", "retail": "green", "digital-goods": "green", "gambling": "red", "adult": "red", "crypto": "red" }, exclusions: ["gambling", "adult", "crypto"], strengths: ["trusted-brand", "buyer-protection", "easy-setup", "low-volume-friendly"] },
  { id: "adyen", name: "Adyen", description: "Enterprise-grade payment platform for high-volume international businesses and marketplaces.", paymentTypes: ["online", "in-person", "marketplace", "subscriptions"], terminalSupport: ["wired", "portable-sim"], marketplaceCapability: true, splitPaymentsSupport: true, regions: ["both"], minimumMonthlyVolume: 50000, riskAppetite: { "ecommerce": "green", "marketplace": "green", "travel": "green", "retail": "green", "hospitality": "green", "gambling": "amber", "adult": "red" }, exclusions: ["adult"], strengths: ["enterprise", "international", "omnichannel", "high-volume", "unified-commerce"] },
  { id: "datman", name: "Datman", description: "Specialist in native split payments, revenue sharing, and marketplace payouts for UK platforms.", paymentTypes: ["online", "marketplace"], terminalSupport: ["none"], marketplaceCapability: true, splitPaymentsSupport: true, regions: ["UK"], minimumMonthlyVolume: 10000, riskAppetite: { "marketplace": "green", "franchise": "green", "hospitality": "green", "delivery": "green", "ecommerce": "green", "gambling": "red", "adult": "red" }, exclusions: ["gambling", "adult"], strengths: ["marketplace", "split-payments", "revenue-share", "uk-specialist"] },
  { id: "sumup", name: "SumUp", description: "Perfect for small businesses with affordable card readers and no monthly fees.", paymentTypes: ["in-person", "online"], terminalSupport: ["portable-sim"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["both"], minimumMonthlyVolume: 0, riskAppetite: { "retail": "green", "hospitality": "green", "mobile-vendor": "green", "market-stall": "green", "professional-services": "green", "gambling": "red", "adult": "red" }, exclusions: ["gambling", "adult"], strengths: ["low-volume", "portable", "no-monthly-fees", "simple-pricing"] },
  { id: "zettle", name: "Zettle (PayPal)", description: "PayPal's POS solution for in-person payments with seamless PayPal integration.", paymentTypes: ["in-person", "online"], terminalSupport: ["portable-sim", "wired"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["both"], minimumMonthlyVolume: 0, riskAppetite: { "retail": "green", "hospitality": "green", "food-beverage": "green", "gambling": "red", "adult": "red" }, exclusions: ["gambling", "adult"], strengths: ["in-person", "paypal-integration", "small-business"] },
  { id: "worldpay", name: "Worldpay", description: "One of the UK's largest payment processors with comprehensive merchant services.", paymentTypes: ["online", "in-person", "subscriptions"], terminalSupport: ["wired", "portable-sim"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["both"], minimumMonthlyVolume: 5000, riskAppetite: { "retail": "green", "hospitality": "green", "ecommerce": "green", "travel": "amber", "gambling": "amber", "adult": "red" }, exclusions: ["adult"], strengths: ["established", "uk-presence", "traditional-merchant-services"] },
  { id: "barclaycard", name: "Barclaycard Payments", description: "Traditional UK bank-backed payment processing with strong high-street presence.", paymentTypes: ["online", "in-person"], terminalSupport: ["wired", "portable-sim"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["UK"], minimumMonthlyVolume: 3000, riskAppetite: { "retail": "green", "hospitality": "green", "professional-services": "green", "ecommerce": "green", "gambling": "red", "adult": "red", "crypto": "red" }, exclusions: ["gambling", "adult", "crypto"], strengths: ["bank-backed", "uk-established", "traditional"] },
  { id: "takepayments", name: "takepayments", description: "UK-focused card machine provider with straightforward pricing for small businesses.", paymentTypes: ["in-person", "online"], terminalSupport: ["wired", "portable-sim"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["UK"], minimumMonthlyVolume: 0, riskAppetite: { "retail": "green", "hospitality": "green", "mobile-vendor": "green", "professional-services": "green", "gambling": "red", "adult": "red" }, exclusions: ["gambling", "adult"], strengths: ["uk-focused", "simple", "card-machines"] },
  { id: "braintree", name: "Braintree", description: "PayPal-owned platform with robust subscription billing and developer tools.", paymentTypes: ["online", "subscriptions", "marketplace"], terminalSupport: ["none"], marketplaceCapability: true, splitPaymentsSupport: true, regions: ["both"], minimumMonthlyVolume: 5000, riskAppetite: { "ecommerce": "green", "saas": "green", "subscription": "green", "marketplace": "green", "gambling": "red", "adult": "red" }, exclusions: ["gambling", "adult"], strengths: ["subscriptions", "developer-friendly", "paypal-venmo", "recurring-billing"] },
  { id: "mollie", name: "Mollie", description: "European payment service provider known for simple integration and local payment methods.", paymentTypes: ["online", "subscriptions"], terminalSupport: ["portable-sim"], marketplaceCapability: true, splitPaymentsSupport: true, regions: ["both"], minimumMonthlyVolume: 0, riskAppetite: { "ecommerce": "green", "saas": "green", "retail": "green", "hospitality": "green", "gambling": "red", "adult": "red" }, exclusions: ["gambling", "adult"], strengths: ["european", "local-payment-methods", "simple-integration", "transparent-pricing"] },
  { id: "klarna", name: "Klarna", description: "Buy now, pay later specialist with strong consumer brand recognition.", paymentTypes: ["online"], terminalSupport: ["none"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["both"], minimumMonthlyVolume: 10000, riskAppetite: { "ecommerce": "green", "fashion": "green", "retail": "green", "gambling": "red", "adult": "red", "crypto": "red" }, exclusions: ["gambling", "adult", "crypto"], strengths: ["bnpl", "consumer-financing", "checkout-boost", "fashion-retail"] },
  { id: "checkout-com", name: "Checkout.com", description: "Enterprise payment platform with global coverage and advanced fraud prevention.", paymentTypes: ["online", "subscriptions", "marketplace"], terminalSupport: ["none"], marketplaceCapability: true, splitPaymentsSupport: true, regions: ["both"], minimumMonthlyVolume: 100000, riskAppetite: { "ecommerce": "green", "travel": "green", "gaming": "amber", "crypto": "amber", "gambling": "amber", "adult": "red" }, exclusions: ["adult"], strengths: ["enterprise", "global", "high-volume", "fraud-prevention"] },
  { id: "trust-payments", name: "Trust Payments", description: "Specializes in higher-risk industries and complex payment requirements.", paymentTypes: ["online", "in-person"], terminalSupport: ["wired", "portable-sim"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["both"], minimumMonthlyVolume: 10000, riskAppetite: { "travel": "green", "hospitality": "green", "ecommerce": "green", "nutraceuticals": "amber", "cbd": "amber", "gambling": "amber", "adult": "red" }, exclusions: ["adult"], strengths: ["higher-risk", "travel", "specialist-industries"] },
  { id: "revolut-business", name: "Revolut Business", description: "Modern business account with integrated payment acceptance and multi-currency support.", paymentTypes: ["online", "in-person"], terminalSupport: ["portable-sim"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["both"], minimumMonthlyVolume: 0, riskAppetite: { "ecommerce": "green", "saas": "green", "professional-services": "green", "retail": "green", "gambling": "red", "adult": "red", "crypto": "amber" }, exclusions: ["gambling", "adult"], strengths: ["multi-currency", "modern-banking", "international", "fast-setup"] },
  { id: "gocardless", name: "GoCardless", description: "Specialist in recurring Direct Debit payments for subscriptions and invoicing.", paymentTypes: ["subscriptions"], terminalSupport: ["none"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["both"], minimumMonthlyVolume: 0, riskAppetite: { "saas": "green", "subscription": "green", "utilities": "green", "membership": "green", "professional-services": "green", "gambling": "red", "adult": "red" }, exclusions: ["gambling", "adult"], strengths: ["direct-debit", "recurring", "low-fees", "subscription-focused"] },
  { id: "dojo", name: "Dojo", description: "UK card machine provider with next-day settlements and simple pricing.", paymentTypes: ["in-person", "online"], terminalSupport: ["wired", "portable-sim"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["UK"], minimumMonthlyVolume: 0, riskAppetite: { "retail": "green", "hospitality": "green", "food-beverage": "green", "professional-services": "green", "gambling": "red", "adult": "red" }, exclusions: ["gambling", "adult"], strengths: ["fast-settlement", "uk-focused", "card-machines", "hospitality"] },
  { id: "opp", name: "OPP (Online Payment Platform)", description: "Specialist marketplace payment platform with strong support for complex payout structures.", paymentTypes: ["online", "marketplace"], terminalSupport: ["none"], marketplaceCapability: true, splitPaymentsSupport: true, regions: ["both"], minimumMonthlyVolume: 20000, riskAppetite: { "marketplace": "green", "franchise": "green", "platform": "green", "ecommerce": "green", "gambling": "red", "adult": "red" }, exclusions: ["gambling", "adult"], strengths: ["marketplace-specialist", "split-payments", "flexible-payouts", "platform-focus"] },
  { id: "elavon", name: "Elavon", description: "Major global payment processor with strong presence in hospitality and retail.", paymentTypes: ["online", "in-person"], terminalSupport: ["wired", "portable-sim"], marketplaceCapability: false, splitPaymentsSupport: false, regions: ["both"], minimumMonthlyVolume: 5000, riskAppetite: { "retail": "green", "hospitality": "green", "travel": "green", "ecommerce": "green", "gambling": "red", "adult": "red" }, exclusions: ["gambling", "adult"], strengths: ["enterprise", "hospitality", "global-reach", "travel"] },
  { id: "airwallex", name: "Airwallex", description: "Global payments platform optimized for international businesses and multi-currency operations.", paymentTypes: ["online"], terminalSupport: ["none"], marketplaceCapability: true, splitPaymentsSupport: true, regions: ["both"], minimumMonthlyVolume: 10000, riskAppetite: { "ecommerce": "green", "saas": "green", "marketplace": "green", "professional-services": "green", "gambling": "red", "adult": "red" }, exclusions: ["gambling", "adult"], strengths: ["multi-currency", "international", "fx-optimization", "global-payouts"] },
];

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
  const industryMap: Record<string, string> = { "ecommerce": "ecommerce", "retail": "retail", "saas": "saas", "marketplace": "marketplace", "hospitality": "hospitality", "restaurant": "food-beverage", "professional-services": "professional-services", "travel": "travel", "subscription": "subscription", "gambling": "gambling", "adult": "adult", "crypto": "crypto", "cbd": "cbd", "nutraceuticals": "nutraceuticals" };
  for (const [key, value] of Object.entries(industryMap)) {
    if (businessType.toLowerCase().includes(key)) return value;
  }
  return "ecommerce";
};

const applyHardElimination = (providers: ProviderConfig[], answers: QuizAnswers): ProviderConfig[] => {
  const requiredPaymentTypes = getRequiredPaymentTypes(answers);
  const requiredRegion = getRequiredRegion(answers.location);
  const monthlyVolume = parseMonthlyVolume(answers.monthlyVolume);
  const industry = answers.industry || getIndustryFromBusinessType(answers.businessType);

  return providers.filter((provider) => {
    if (!requiredPaymentTypes.every((type) => provider.paymentTypes.includes(type))) return false;
    if (requiredRegion && requiredRegion !== "both" && !provider.regions.includes(requiredRegion) && !provider.regions.includes("both")) return false;
    if (monthlyVolume < provider.minimumMonthlyVolume) return false;
    if (provider.exclusions.includes(industry)) return false;
    if (provider.riskAppetite[industry] === "red") return false;
    if (requiredPaymentTypes.includes("marketplace") && !provider.marketplaceCapability) return false;
    return true;
  });
};

interface ScoredProvider { provider: ProviderConfig; score: number; reasons: string[]; }

const scoreProviders = (providers: ProviderConfig[], answers: QuizAnswers): ScoredProvider[] => {
  const monthlyVolume = parseMonthlyVolume(answers.monthlyVolume);
  const industry = answers.industry || getIndustryFromBusinessType(answers.businessType);
  const priorities = answers.priorities || [];

  return providers.map((provider) => {
    let score = 50;
    const reasons: string[] = [];

    const riskLevel = provider.riskAppetite[industry];
    if (riskLevel === "green") { score += 20; reasons.push(`Strong fit for ${industry} businesses`); }
    else if (riskLevel === "amber") { score += 5; reasons.push(`Accepts ${industry} businesses with additional review`); }

    if (monthlyVolume >= 100000 && provider.strengths.includes("enterprise")) { score += 15; reasons.push("Built for high-volume operations"); }
    else if (monthlyVolume < 10000 && provider.strengths.includes("low-volume")) { score += 15; reasons.push("Perfect for growing businesses"); }

    if (priorities.includes("low-fees") && provider.strengths.includes("transparent-pricing")) { score += 10; reasons.push("Competitive and transparent pricing"); }
    if (priorities.includes("fast-setup") && provider.strengths.includes("easy-setup")) { score += 10; reasons.push("Quick and easy onboarding"); }
    if (priorities.includes("international") && provider.strengths.includes("international")) { score += 10; reasons.push("Excellent international payment support"); }
    if (priorities.includes("developer-friendly") && provider.strengths.includes("developer-friendly")) { score += 10; reasons.push("Developer-friendly APIs and documentation"); }

    if (answers.features?.includes("subscriptions") && provider.strengths.includes("subscriptions")) { score += 10; reasons.push("Robust subscription billing capabilities"); }
    if (answers.features?.includes("split-payments") && provider.splitPaymentsSupport) { score += 15; reasons.push("Native split payment support"); }
    if (answers.salesChannel?.includes("in-person") && provider.strengths.includes("in-person")) { score += 10; reasons.push("Excellent in-person payment solutions"); }

    return { provider, score, reasons };
  });
};

const getRecommendations = (answers: QuizAnswers): RecommendationResult | null => {
  let eligible = applyHardElimination(PROVIDER_REGISTRY, answers);

  if (eligible.length < 3) {
    const industry = answers.industry || getIndustryFromBusinessType(answers.businessType);
    eligible = PROVIDER_REGISTRY.filter((p) => !p.exclusions.includes(industry) && p.riskAppetite[industry] !== "red");
  }

  if (eligible.length === 0) return null;

  const scored = scoreProviders(eligible, answers);
  scored.sort((a, b) => b.score - a.score);

  const primary = scored[0];
  const alternatives = scored.slice(1, 3);

  return {
    primary: { name: primary.provider.name, description: primary.provider.description, reasons: primary.reasons.slice(0, 4) },
    alternatives: alternatives.map((alt) => ({ name: alt.provider.name, description: alt.provider.description, reasons: alt.reasons.slice(0, 3) })),
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

    const result = getRecommendations(answers);

    if (!result) {
      console.warn("No suitable providers found for answers");
      return errorResponse("We couldn't find a suitable provider for your specific requirements. Please contact us for personalized assistance.", 404);
    }

    console.log("Recommendation result:", result.primary.name);
    return successResponse({ recommendation: result });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in quiz-recommendation function:", error);
    return errorResponse(errorMessage, 500);
  }
};

serve(handler);
