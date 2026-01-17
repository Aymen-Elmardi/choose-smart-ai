// Server-side Quiz Recommendation Engine
// Returns primary recommendation + 2 alternatives based on quiz answers
// All decision logic runs server-side with static provider configuration

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
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
  minimumMonthlyVolume: number; // in GBP
  riskAppetite: Record<string, RiskLevel>;
  exclusions: string[]; // Hard no industries
  strengths: string[]; // For scoring and reasons
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
  primary: {
    name: string;
    description: string;
    reasons: string[];
  };
  alternatives: {
    name: string;
    description: string;
    reasons: string[];
  }[];
}

// ============================================================================
// PROVIDER REGISTRY - 20+ UK/EU Payment Providers
// ============================================================================

const PROVIDER_REGISTRY: ProviderConfig[] = [
  // Major Global Players
  {
    id: "stripe",
    name: "Stripe",
    description: "The leading payment platform for online businesses, offering powerful APIs and seamless international payment support.",
    paymentTypes: ["online", "subscriptions", "marketplace"],
    terminalSupport: ["wired", "portable-sim"],
    marketplaceCapability: true,
    splitPaymentsSupport: true,
    regions: ["both"],
    minimumMonthlyVolume: 0,
    riskAppetite: {
      "ecommerce": "green",
      "saas": "green",
      "marketplace": "green",
      "retail": "green",
      "hospitality": "green",
      "professional-services": "green",
      "gambling": "red",
      "adult": "red",
      "crypto": "amber",
      "cbd": "amber",
      "nutraceuticals": "amber",
      "travel": "green",
      "subscription-box": "green",
    },
    exclusions: ["gambling", "adult"],
    strengths: ["developer-friendly", "international", "subscriptions", "api-first", "scalable"],
  },
  {
    id: "square",
    name: "Square",
    description: "All-in-one solution for businesses that sell in-person, with easy-to-use POS hardware and integrated online tools.",
    paymentTypes: ["online", "in-person"],
    terminalSupport: ["wired", "portable-sim"],
    marketplaceCapability: false,
    splitPaymentsSupport: false,
    regions: ["both"],
    minimumMonthlyVolume: 0,
    riskAppetite: {
      "retail": "green",
      "hospitality": "green",
      "food-beverage": "green",
      "professional-services": "green",
      "ecommerce": "green",
      "gambling": "red",
      "adult": "red",
      "crypto": "red",
    },
    exclusions: ["gambling", "adult", "crypto"],
    strengths: ["in-person", "pos-hardware", "easy-setup", "retail", "restaurants"],
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Trusted by millions of buyers worldwide, ideal for businesses wanting instant credibility and easy checkout.",
    paymentTypes: ["online"],
    terminalSupport: ["none"],
    marketplaceCapability: false,
    splitPaymentsSupport: false,
    regions: ["both"],
    minimumMonthlyVolume: 0,
    riskAppetite: {
      "ecommerce": "green",
      "retail": "green",
      "digital-goods": "green",
      "gambling": "red",
      "adult": "red",
      "crypto": "red",
    },
    exclusions: ["gambling", "adult", "crypto"],
    strengths: ["trusted-brand", "buyer-protection", "easy-setup", "low-volume-friendly"],
  },
  {
    id: "adyen",
    name: "Adyen",
    description: "Enterprise-grade payment platform for high-volume international businesses and marketplaces.",
    paymentTypes: ["online", "in-person", "marketplace", "subscriptions"],
    terminalSupport: ["wired", "portable-sim"],
    marketplaceCapability: true,
    splitPaymentsSupport: true,
    regions: ["both"],
    minimumMonthlyVolume: 50000,
    riskAppetite: {
      "ecommerce": "green",
      "marketplace": "green",
      "travel": "green",
      "retail": "green",
      "hospitality": "green",
      "gambling": "amber",
      "adult": "red",
    },
    exclusions: ["adult"],
    strengths: ["enterprise", "international", "omnichannel", "high-volume", "unified-commerce"],
  },
  // UK Specialists
  {
    id: "datman",
    name: "Datman",
    description: "Specialist in native split payments, revenue sharing, and marketplace payouts for UK platforms.",
    paymentTypes: ["online", "marketplace"],
    terminalSupport: ["none"],
    marketplaceCapability: true,
    splitPaymentsSupport: true,
    regions: ["UK"],
    minimumMonthlyVolume: 10000,
    riskAppetite: {
      "marketplace": "green",
      "franchise": "green",
      "hospitality": "green",
      "delivery": "green",
      "ecommerce": "green",
      "gambling": "red",
      "adult": "red",
    },
    exclusions: ["gambling", "adult"],
    strengths: ["marketplace", "split-payments", "revenue-share", "uk-specialist"],
  },
  {
    id: "sumup",
    name: "SumUp",
    description: "Perfect for small businesses with affordable card readers and no monthly fees.",
    paymentTypes: ["in-person", "online"],
    terminalSupport: ["portable-sim"],
    marketplaceCapability: false,
    splitPaymentsSupport: false,
    regions: ["both"],
    minimumMonthlyVolume: 0,
    riskAppetite: {
      "retail": "green",
      "hospitality": "green",
      "mobile-vendor": "green",
      "market-stall": "green",
      "professional-services": "green",
      "gambling": "red",
      "adult": "red",
    },
    exclusions: ["gambling", "adult"],
    strengths: ["low-volume", "portable", "no-monthly-fees", "simple-pricing"],
  },
  {
    id: "zettle",
    name: "Zettle (PayPal)",
    description: "PayPal's POS solution for in-person payments with seamless PayPal integration.",
    paymentTypes: ["in-person", "online"],
    terminalSupport: ["portable-sim", "wired"],
    marketplaceCapability: false,
    splitPaymentsSupport: false,
    regions: ["both"],
    minimumMonthlyVolume: 0,
    riskAppetite: {
      "retail": "green",
      "hospitality": "green",
      "food-beverage": "green",
      "gambling": "red",
      "adult": "red",
    },
    exclusions: ["gambling", "adult"],
    strengths: ["in-person", "paypal-integration", "small-business"],
  },
  {
    id: "worldpay",
    name: "Worldpay",
    description: "One of the UK's largest payment processors with comprehensive merchant services.",
    paymentTypes: ["online", "in-person", "subscriptions"],
    terminalSupport: ["wired", "portable-sim"],
    marketplaceCapability: false,
    splitPaymentsSupport: false,
    regions: ["both"],
    minimumMonthlyVolume: 5000,
    riskAppetite: {
      "retail": "green",
      "hospitality": "green",
      "ecommerce": "green",
      "travel": "amber",
      "gambling": "amber",
      "adult": "red",
    },
    exclusions: ["adult"],
    strengths: ["established", "uk-presence", "traditional-merchant-services"],
  },
  {
    id: "barclaycard",
    name: "Barclaycard Payments",
    description: "Traditional UK bank-backed payment processing with strong high-street presence.",
    paymentTypes: ["online", "in-person"],
    terminalSupport: ["wired", "portable-sim"],
    marketplaceCapability: false,
    splitPaymentsSupport: false,
    regions: ["UK"],
    minimumMonthlyVolume: 3000,
    riskAppetite: {
      "retail": "green",
      "hospitality": "green",
      "professional-services": "green",
      "ecommerce": "green",
      "gambling": "red",
      "adult": "red",
      "crypto": "red",
    },
    exclusions: ["gambling", "adult", "crypto"],
    strengths: ["bank-backed", "uk-established", "traditional"],
  },
  {
    id: "takepayments",
    name: "takepayments",
    description: "UK-focused card machine provider with straightforward pricing for small businesses.",
    paymentTypes: ["in-person", "online"],
    terminalSupport: ["wired", "portable-sim"],
    marketplaceCapability: false,
    splitPaymentsSupport: false,
    regions: ["UK"],
    minimumMonthlyVolume: 0,
    riskAppetite: {
      "retail": "green",
      "hospitality": "green",
      "mobile-vendor": "green",
      "professional-services": "green",
      "gambling": "red",
      "adult": "red",
    },
    exclusions: ["gambling", "adult"],
    strengths: ["uk-focused", "simple", "card-machines"],
  },
  {
    id: "braintree",
    name: "Braintree",
    description: "PayPal-owned platform with robust subscription billing and developer tools.",
    paymentTypes: ["online", "subscriptions", "marketplace"],
    terminalSupport: ["none"],
    marketplaceCapability: true,
    splitPaymentsSupport: true,
    regions: ["both"],
    minimumMonthlyVolume: 5000,
    riskAppetite: {
      "ecommerce": "green",
      "saas": "green",
      "subscription": "green",
      "marketplace": "green",
      "gambling": "red",
      "adult": "red",
    },
    exclusions: ["gambling", "adult"],
    strengths: ["subscriptions", "developer-friendly", "paypal-venmo", "recurring-billing"],
  },
  // EU Specialists
  {
    id: "mollie",
    name: "Mollie",
    description: "European payment service provider known for simple integration and local payment methods.",
    paymentTypes: ["online", "subscriptions"],
    terminalSupport: ["portable-sim"],
    marketplaceCapability: true,
    splitPaymentsSupport: true,
    regions: ["both"],
    minimumMonthlyVolume: 0,
    riskAppetite: {
      "ecommerce": "green",
      "saas": "green",
      "retail": "green",
      "hospitality": "green",
      "gambling": "red",
      "adult": "red",
    },
    exclusions: ["gambling", "adult"],
    strengths: ["european", "local-payment-methods", "simple-integration", "transparent-pricing"],
  },
  {
    id: "klarna",
    name: "Klarna",
    description: "Buy now, pay later specialist with strong consumer brand recognition.",
    paymentTypes: ["online"],
    terminalSupport: ["none"],
    marketplaceCapability: false,
    splitPaymentsSupport: false,
    regions: ["both"],
    minimumMonthlyVolume: 10000,
    riskAppetite: {
      "ecommerce": "green",
      "fashion": "green",
      "retail": "green",
      "gambling": "red",
      "adult": "red",
      "crypto": "red",
    },
    exclusions: ["gambling", "adult", "crypto"],
    strengths: ["bnpl", "consumer-financing", "checkout-boost", "fashion-retail"],
  },
  {
    id: "checkout-com",
    name: "Checkout.com",
    description: "Enterprise payment platform with global coverage and advanced fraud prevention.",
    paymentTypes: ["online", "subscriptions", "marketplace"],
    terminalSupport: ["none"],
    marketplaceCapability: true,
    splitPaymentsSupport: true,
    regions: ["both"],
    minimumMonthlyVolume: 100000,
    riskAppetite: {
      "ecommerce": "green",
      "travel": "green",
      "gaming": "amber",
      "crypto": "amber",
      "gambling": "amber",
      "adult": "red",
    },
    exclusions: ["adult"],
    strengths: ["enterprise", "global", "high-volume", "fraud-prevention"],
  },
  {
    id: "trust-payments",
    name: "Trust Payments",
    description: "Specializes in higher-risk industries and complex payment requirements.",
    paymentTypes: ["online", "in-person"],
    terminalSupport: ["wired", "portable-sim"],
    marketplaceCapability: false,
    splitPaymentsSupport: false,
    regions: ["both"],
    minimumMonthlyVolume: 10000,
    riskAppetite: {
      "travel": "green",
      "hospitality": "green",
      "ecommerce": "green",
      "nutraceuticals": "amber",
      "cbd": "amber",
      "gambling": "amber",
      "adult": "red",
    },
    exclusions: ["adult"],
    strengths: ["higher-risk", "travel", "specialist-industries"],
  },
  {
    id: "revolut-business",
    name: "Revolut Business",
    description: "Modern business account with integrated payment acceptance and multi-currency support.",
    paymentTypes: ["online", "in-person"],
    terminalSupport: ["portable-sim"],
    marketplaceCapability: false,
    splitPaymentsSupport: false,
    regions: ["both"],
    minimumMonthlyVolume: 0,
    riskAppetite: {
      "ecommerce": "green",
      "saas": "green",
      "professional-services": "green",
      "retail": "green",
      "gambling": "red",
      "adult": "red",
      "crypto": "amber",
    },
    exclusions: ["gambling", "adult"],
    strengths: ["multi-currency", "modern-banking", "international", "fast-setup"],
  },
  {
    id: "gocardless",
    name: "GoCardless",
    description: "Specialist in recurring Direct Debit payments for subscriptions and invoicing.",
    paymentTypes: ["subscriptions"],
    terminalSupport: ["none"],
    marketplaceCapability: false,
    splitPaymentsSupport: false,
    regions: ["both"],
    minimumMonthlyVolume: 0,
    riskAppetite: {
      "saas": "green",
      "subscription": "green",
      "utilities": "green",
      "membership": "green",
      "professional-services": "green",
      "gambling": "red",
      "adult": "red",
    },
    exclusions: ["gambling", "adult"],
    strengths: ["direct-debit", "recurring", "low-fees", "subscription-focused"],
  },
  {
    id: "dojo",
    name: "Dojo",
    description: "UK card machine provider with next-day settlements and simple pricing.",
    paymentTypes: ["in-person", "online"],
    terminalSupport: ["wired", "portable-sim"],
    marketplaceCapability: false,
    splitPaymentsSupport: false,
    regions: ["UK"],
    minimumMonthlyVolume: 0,
    riskAppetite: {
      "retail": "green",
      "hospitality": "green",
      "food-beverage": "green",
      "professional-services": "green",
      "gambling": "red",
      "adult": "red",
    },
    exclusions: ["gambling", "adult"],
    strengths: ["fast-settlement", "uk-focused", "card-machines", "hospitality"],
  },
  {
    id: "opp",
    name: "OPP (Online Payment Platform)",
    description: "Specialist marketplace payment platform with strong support for complex payout structures.",
    paymentTypes: ["online", "marketplace"],
    terminalSupport: ["none"],
    marketplaceCapability: true,
    splitPaymentsSupport: true,
    regions: ["both"],
    minimumMonthlyVolume: 20000,
    riskAppetite: {
      "marketplace": "green",
      "franchise": "green",
      "platform": "green",
      "ecommerce": "green",
      "gambling": "red",
      "adult": "red",
    },
    exclusions: ["gambling", "adult"],
    strengths: ["marketplace-specialist", "split-payments", "flexible-payouts", "platform-focus"],
  },
  {
    id: "elavon",
    name: "Elavon",
    description: "Major global payment processor with strong presence in hospitality and retail.",
    paymentTypes: ["online", "in-person"],
    terminalSupport: ["wired", "portable-sim"],
    marketplaceCapability: false,
    splitPaymentsSupport: false,
    regions: ["both"],
    minimumMonthlyVolume: 5000,
    riskAppetite: {
      "retail": "green",
      "hospitality": "green",
      "travel": "green",
      "ecommerce": "green",
      "gambling": "red",
      "adult": "red",
    },
    exclusions: ["gambling", "adult"],
    strengths: ["hospitality", "global", "established", "multi-currency"],
  },
  {
    id: "payoneer",
    name: "Payoneer",
    description: "Cross-border payment platform ideal for international freelancers and marketplaces.",
    paymentTypes: ["online", "marketplace"],
    terminalSupport: ["none"],
    marketplaceCapability: true,
    splitPaymentsSupport: true,
    regions: ["both"],
    minimumMonthlyVolume: 0,
    riskAppetite: {
      "freelance": "green",
      "marketplace": "green",
      "ecommerce": "green",
      "professional-services": "green",
      "gambling": "red",
      "adult": "red",
    },
    exclusions: ["gambling", "adult"],
    strengths: ["cross-border", "freelancers", "international-payouts"],
  },
  {
    id: "wise-business",
    name: "Wise Business",
    description: "Best-in-class international transfers with transparent, low-cost currency conversion.",
    paymentTypes: ["online"],
    terminalSupport: ["none"],
    marketplaceCapability: false,
    splitPaymentsSupport: false,
    regions: ["both"],
    minimumMonthlyVolume: 0,
    riskAppetite: {
      "ecommerce": "green",
      "professional-services": "green",
      "saas": "green",
      "freelance": "green",
      "gambling": "red",
      "adult": "red",
      "crypto": "red",
    },
    exclusions: ["gambling", "adult", "crypto"],
    strengths: ["international-transfers", "low-fx-fees", "multi-currency"],
  },
  // High-risk / Complex Merchant Specialist
  {
    id: "shift4",
    name: "Shift4",
    description: "Built for more complex payment setups. Better suited for businesses with higher approval requirements and sophisticated payment flows.",
    paymentTypes: ["online", "in-person", "marketplace", "subscriptions"],
    terminalSupport: ["wired", "portable-sim"],
    marketplaceCapability: true,
    splitPaymentsSupport: true,
    regions: ["both"],
    minimumMonthlyVolume: 10000,
    riskAppetite: {
      "ecommerce": "green",
      "marketplace": "green",
      "travel": "green",
      "hospitality": "green",
      "retail": "green",
      "nutraceuticals": "green",
      "cbd": "green",
      "crypto": "amber",
      "gambling": "amber",
      "adult": "red",
      "high-risk": "green",
      "complex": "green",
    },
    exclusions: ["adult"],
    strengths: ["high-risk", "complex-payments", "approval-reliability", "international", "enterprise", "scalable", "split-payments"],
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const parseMonthlyVolume = (volume: string): number => {
  // Handle early-stage expectation-based options
  if (volume === "Just testing / very low volume") return 1000;
  if (volume === "Small but growing") return 5000;
  if (volume === "Moderate volume") return 25000;
  if (volume === "Planning to scale quickly") return 75000;
  
  // Handle numeric ranges
  if (volume === "< £5k") return 2500;
  if (volume === "£5k–20k") return 12500;
  if (volume === "£20k–50k") return 35000;
  if (volume === "£50k–100k") return 75000;
  if (volume === "£100k+") return 150000;
  
  return 5000; // Default
};

const getRequiredPaymentTypes = (answers: QuizAnswers): PaymentType[] => {
  const types: PaymentType[] = [];
  
  const { salesChannel, features, businessType } = answers;
  
  if (salesChannel === "Online only" || salesChannel === "Both online and in person") {
    types.push("online");
  }
  if (salesChannel === "In person" || salesChannel === "Both online and in person") {
    types.push("in-person");
  }
  if (salesChannel === "Through a marketplace or platform" || businessType === "Marketplace / platform") {
    types.push("marketplace");
  }
  if (features.includes("Subscriptions / recurring billing")) {
    types.push("subscriptions");
  }
  
  return types.length > 0 ? types : ["online"]; // Default to online
};

const getRequiredRegion = (location: string): Region | null => {
  if (location === "UK") return "UK";
  if (location === "EU") return "EU";
  if (location === "US" || location === "Other") return null; // No region filter for US/Other
  return null;
};

const getIndustryFromBusinessType = (businessType: string): string => {
  switch (businessType) {
    case "Early-stage / just getting started": return "ecommerce";
    case "Online business": return "ecommerce";
    case "Physical business": return "retail";
    case "Marketplace / platform": return "marketplace";
    case "Other / mixed": return "ecommerce";
    default: return "ecommerce";
  }
};

// ============================================================================
// ELIMINATION LOGIC
// ============================================================================

const applyHardElimination = (
  providers: ProviderConfig[],
  answers: QuizAnswers
): ProviderConfig[] => {
  const requiredPaymentTypes = getRequiredPaymentTypes(answers);
  const requiredRegion = getRequiredRegion(answers.location);
  const industry = getIndustryFromBusinessType(answers.businessType);
  const monthlyVolume = parseMonthlyVolume(answers.monthlyVolume);
  
  return providers.filter(provider => {
    // Check payment type support
    const hasRequiredPaymentTypes = requiredPaymentTypes.every(type => 
      provider.paymentTypes.includes(type)
    );
    if (!hasRequiredPaymentTypes) return false;
    
    // Check region support
    if (requiredRegion) {
      const supportsRegion = provider.regions.includes("both") || 
        provider.regions.includes(requiredRegion);
      if (!supportsRegion) return false;
    }
    
    // Check industry risk - eliminate if red
    const riskLevel = provider.riskAppetite[industry];
    if (riskLevel === "red") return false;
    
    // Check hard exclusions
    if (provider.exclusions.includes(industry)) return false;
    
    // Check minimum volume (be lenient - only eliminate if significantly below)
    if (monthlyVolume < provider.minimumMonthlyVolume * 0.5) return false;
    
    return true;
  });
};

// ============================================================================
// SCORING LOGIC
// ============================================================================

interface ScoredProvider {
  provider: ProviderConfig;
  score: number;
  matchReasons: string[];
}

const scoreProviders = (
  providers: ProviderConfig[],
  answers: QuizAnswers
): ScoredProvider[] => {
  const { salesChannel, businessType, priorities, features, monthlyVolume, location, deliveryTimeline } = answers;
  const volume = parseMonthlyVolume(monthlyVolume);
  const industry = getIndustryFromBusinessType(businessType);
  
  const needsMarketplace = businessType === "Marketplace / platform" || 
    salesChannel === "Through a marketplace or platform" ||
    features.includes("Multiple sellers");
  const needsSplitPayments = features.includes("Split payments") || needsMarketplace;
  const needsSubscriptions = features.includes("Subscriptions / recurring billing");
  const needsInternational = features.includes("International customers") || 
    priorities.includes("International payments");
  const needsInPerson = salesChannel === "In person" || salesChannel === "Both online and in person";
  const needsOnline = salesChannel === "Online only" || salesChannel === "Both online and in person";
  const wantsEasySetup = priorities.includes("Easy setup");
  const wantsLowFees = priorities.includes("Keeping fees low");
  const wantsScalability = priorities.includes("Ability to scale") || 
    priorities.includes("Flexibility / future-proofing");
  const isLowVolume = volume < 10000;
  const isHighVolume = volume > 50000;
  
  // Delivery timeline risk assessment
  const hasLongDeliveryTimeline = deliveryTimeline === "More than 30 days";
  const hasMediumDeliveryTimeline = deliveryTimeline === "Within 8-30 Days";
  
  return providers.map(provider => {
    let score = 50; // Base score
    const matchReasons: string[] = [];
    
    // Business model fit (high weight)
    if (needsMarketplace && provider.marketplaceCapability) {
      score += 25;
      matchReasons.push("Strong marketplace and multi-vendor support");
    }
    if (needsSplitPayments && provider.splitPaymentsSupport) {
      score += 20;
      matchReasons.push("Native split payment capabilities");
    }
    if (needsSubscriptions && provider.paymentTypes.includes("subscriptions")) {
      score += 20;
      matchReasons.push("Robust recurring billing infrastructure");
    }
    
    // Channel fit
    if (needsInPerson && provider.terminalSupport.length > 0 && provider.terminalSupport[0] !== "none") {
      score += 15;
      matchReasons.push("Comprehensive in-person payment solutions");
    }
    if (needsOnline && provider.paymentTypes.includes("online")) {
      score += 10;
    }
    
    // Volume alignment
    if (isLowVolume && provider.minimumMonthlyVolume === 0) {
      score += 10;
      matchReasons.push("No minimum volume requirements");
    }
    if (isHighVolume && provider.minimumMonthlyVolume > 0) {
      score += 10;
      matchReasons.push("Built for high-volume processing");
    }
    
    // Priority alignment
    if (wantsEasySetup && provider.strengths.includes("easy-setup")) {
      score += 15;
      matchReasons.push("Quick and straightforward setup process");
    }
    if (wantsLowFees && (provider.strengths.includes("low-fees") || provider.strengths.includes("transparent-pricing"))) {
      score += 15;
      matchReasons.push("Competitive and transparent pricing");
    }
    if (wantsScalability && (provider.strengths.includes("scalable") || provider.strengths.includes("enterprise"))) {
      score += 15;
      matchReasons.push("Scales seamlessly as your business grows");
    }
    if (needsInternational && (provider.strengths.includes("international") || provider.strengths.includes("multi-currency"))) {
      score += 20;
      matchReasons.push("Excellent international payment support");
    }
    
    // Risk comfort (prefer green over amber)
    const riskLevel = provider.riskAppetite[industry];
    if (riskLevel === "green") {
      score += 10;
    } else if (riskLevel === "amber") {
      score -= 5;
    }
    
    // Delivery timeline scoring - "Future Delivery Risk" handling
    // Long delivery timelines (>30 days) are high-risk for automated/low-risk providers
    if (hasLongDeliveryTimeline) {
      // Penalize automated, low-risk-averse providers (they may freeze funds)
      if (provider.id === "square" || provider.id === "paypal" || provider.id === "sumup" || provider.id === "zettle") {
        score -= 25;
      }
      // Stripe can handle but may impose reserves
      if (provider.id === "stripe") {
        score -= 15;
      }
      // Enterprise/specialized providers handle this well
      if (provider.id === "adyen" || provider.id === "checkout-com" || provider.id === "shift4" || provider.id === "trust-payments") {
        score += 20;
        matchReasons.push("Equipped to manage future delivery risk without freezing funds");
      }
      // Worldpay/Elavon have experience with travel/events
      if (provider.id === "worldpay" || provider.id === "elavon") {
        score += 15;
        matchReasons.push("Experience with extended delivery timelines and rolling reserves");
      }
    }
    
    // Medium delivery timelines (8-30 days) - slight adjustment
    if (hasMediumDeliveryTimeline) {
      if (provider.id === "square" || provider.id === "paypal" || provider.id === "sumup") {
        score -= 10;
      }
      if (provider.id === "adyen" || provider.id === "shift4" || provider.id === "worldpay") {
        score += 10;
      }
    }
    
    // Provider maturity bonus for complex use cases
    if (needsMarketplace && provider.strengths.includes("marketplace-specialist")) {
      score += 15;
    }
    
    // Special elevation: OPP for genuine marketplace fit
    if (provider.id === "opp" && needsMarketplace && needsSplitPayments) {
      score += 20;
      matchReasons.push("Specialist platform with flexible payout structures");
    }
    
    // Datman elevation for UK marketplaces
    if (provider.id === "datman" && needsMarketplace && location === "UK") {
      score += 15;
      matchReasons.push("UK specialist for marketplace revenue sharing");
    }
    
    // Shift4 scoring for complex/high-risk cases
    if (provider.id === "shift4") {
      // Strong preference (+3) conditions
      if (needsMarketplace) {
        score += 25;
        matchReasons.push("Built for marketplace and platform business models");
      }
      if (needsInternational) {
        score += 20;
        matchReasons.push("Strong cross-border and multi-region capabilities");
      }
      if (needsSplitPayments) {
        score += 20;
        matchReasons.push("Advanced multi-party settlement support");
      }
      if (isHighVolume) {
        score += 15;
        matchReasons.push("Designed for high-volume transaction processing");
      }
      
      // Moderate preference (+2) conditions
      if (needsInPerson && needsOnline) {
        score += 15;
        matchReasons.push("Unified online and in-person payment solutions");
      }
      if (wantsScalability) {
        score += 15;
        matchReasons.push("Enterprise-grade scalability and reliability");
      }
      
      // De-prioritise (-2) conditions: very small, fee-sensitive, simple use cases
      if (isLowVolume && wantsLowFees && !needsMarketplace && !needsSplitPayments && !needsInternational) {
        score -= 30; // Significantly deprioritise for simple low-volume cases
      }
    }
    
    // Region-specific bonuses
    if (location === "UK" && provider.regions.includes("UK")) {
      score += 5;
    }
    
    // Ensure we have at least one reason
    if (matchReasons.length === 0) {
      matchReasons.push("Suitable for your business requirements");
    }
    
    return { provider, score, matchReasons };
  });
};

// ============================================================================
// MAIN RECOMMENDATION FUNCTION
// ============================================================================

const getRecommendations = (answers: QuizAnswers): RecommendationResult | null => {
  // Start with all providers
  let eligible = [...PROVIDER_REGISTRY];
  
  // Apply hard elimination
  eligible = applyHardElimination(eligible, answers);
  
  if (eligible.length === 0) {
    return null; // No suitable providers
  }
  
  // Score remaining providers
  const scored = scoreProviders(eligible, answers);
  
  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);
  
  // Get primary (highest score)
  const primary = scored[0];
  
  // Get alternatives (next 2 highest, if available)
  const alternatives = scored.slice(1, 3);
  
  return {
    primary: {
      name: primary.provider.name,
      description: primary.provider.description,
      reasons: primary.matchReasons.slice(0, 4), // Limit to 4 reasons
    },
    alternatives: alternatives.map(alt => ({
      name: alt.provider.name,
      description: alt.provider.description,
      reasons: alt.matchReasons.slice(0, 3), // Limit to 3 reasons for alternatives
    })),
  };
};

// ============================================================================
// RATE LIMITING
// ============================================================================

const rateLimitStore = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 30; // Max 30 requests per minute per IP (quiz may have retries)

// Get client IP from request
const getClientIp = (req: Request): string => {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
         req.headers.get("x-real-ip") ||
         "unknown";
};

// Check rate limit by IP
const checkRateLimit = (clientIp: string): boolean => {
  const now = Date.now();
  const record = rateLimitStore.get(clientIp);
  
  // Clean up old entries
  if (rateLimitStore.size > 1000) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (now - value.timestamp > RATE_LIMIT_WINDOW_MS) {
        rateLimitStore.delete(key);
      }
    }
  }
  
  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(clientIp, { count: 1, timestamp: now });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  record.count++;
  return true;
};

// ============================================================================
// HTTP HANDLER
// ============================================================================

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting check
  const clientIp = getClientIp(req);
  
  if (!checkRateLimit(clientIp)) {
    console.warn(`Rate limit exceeded for IP: ${clientIp}`);
    return new Response(
      JSON.stringify({ success: false, error: "Too many requests. Please try again later." }),
      {
        status: 429,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }

  const startTime = performance.now();

  try {
    const body = await req.json();
    
    // Basic input validation
    if (!body || typeof body !== 'object') {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid request body" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    const answers: QuizAnswers = {
      salesChannel: String(body.salesChannel || "").slice(0, 100),
      businessType: String(body.businessType || "").slice(0, 100),
      priorities: Array.isArray(body.priorities) ? body.priorities.slice(0, 10).map((p: unknown) => String(p).slice(0, 100)) : [],
      location: String(body.location || "").slice(0, 100),
      monthlyVolume: String(body.monthlyVolume || "").slice(0, 50),
      avgTransaction: String(body.avgTransaction || "").slice(0, 50),
      features: Array.isArray(body.features) ? body.features.slice(0, 10).map((f: unknown) => String(f).slice(0, 100)) : [],
    };

    console.log(`Quiz recommendation request from IP ${clientIp}:`, JSON.stringify(answers));

    const result = getRecommendations(answers);

    const executionTime = performance.now() - startTime;
    console.log(`Recommendation computed in ${executionTime.toFixed(2)}ms`);

    if (!result) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "No suitable providers found for your requirements" 
        }),
        {
          status: 200, // Still 200 as it's a valid outcome
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        recommendation: result,
        executionTimeMs: executionTime,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Error in quiz-recommendation:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
