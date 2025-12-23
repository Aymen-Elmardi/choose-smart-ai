// Recommendation logic for UK and US markets

export interface QuizAnswers {
  salesChannel: string;
  businessType: string;
  priorities: string[];
  location: string;
  monthlyVolume: string;
  avgTransaction: string;
  features: string[];
}

export interface Provider {
  name: string;
  description: string;
  reasons: string[];
}

export type Market = "UK" | "US";

// UK Recommendation Logic (existing)
export const getUKRecommendation = (answers: QuizAnswers): Provider | null => {
  const {
    businessType,
    salesChannel,
    monthlyVolume,
    features,
    priorities,
    location,
  } = answers;

  // Derive feature flags from features array
  const acceptsInternational = features.includes("International customers");
  const needsRecurring = features.includes("Subscriptions / recurring billing");
  const hasMultipleSellers = features.includes("Multiple sellers");

  const sellsOnline =
    salesChannel === "Online only" || salesChannel === "Both online and in person";
  const sellsInPerson =
    salesChannel === "In person" || salesChannel === "Both online and in person";
  const isDeveloperFriendly = priorities.includes("Ability to scale");
  const wantsGlobalReach = priorities.includes("International payments");
  const wantsEasySetup = priorities.includes("Easy setup");
  const wantsLowestFees = priorities.includes("Keeping fees low");
  const wantsFlexibility = priorities.includes("Flexibility / future-proofing");

  // Handle both numeric ranges and early-stage expectation-based options
  const isLowVolume = 
    monthlyVolume === "< £5k" || 
    monthlyVolume === "Just testing / very low volume" ||
    monthlyVolume === "Small but growing";
  const isMediumVolume =
    monthlyVolume === "£5k–20k" || 
    monthlyVolume === "£20k–50k" ||
    monthlyVolume === "Moderate volume";
  const volumeOver20k =
    monthlyVolume === "£20k–50k" ||
    monthlyVolume === "£50k–100k" ||
    monthlyVolume === "£100k+" ||
    monthlyVolume === "Planning to scale quickly";
  const volumeOver50k = 
    monthlyVolume === "£50k–100k" || 
    monthlyVolume === "£100k+" ||
    monthlyVolume === "Planning to scale quickly";

  const isRestaurantOrRetail = businessType === "Physical business";
  const isMarketplace = businessType === "Marketplace / platform";
  const isSubscription = needsRecurring;
  const isEarlyStage = businessType === "Early-stage / just getting started";
  const isUK = location === "UK";
  const wantsBothChannels = salesChannel === "Both online and in person";

  // DATMAN - UK Marketplaces with high volume
  if (isMarketplace && volumeOver20k && isUK && (isDeveloperFriendly || wantsLowestFees)) {
    return {
      name: "Datman",
      description:
        "Datman is ideal for UK marketplaces needing built-in revenue share and instant multi-party splitting at the point of transaction. Perfect for platforms scaling quickly and looking to earn income from every sale.",
      reasons: [
        "Your marketplace business model requires complex payment flows",
        "Your monthly volume of " + monthlyVolume + " qualifies for competitive rates",
        "UK-based with specialized marketplace payment infrastructure",
        "Built-in revenue share and split payment capabilities",
      ],
    };
  }

  // ADYEN - High volume international marketplaces
  if (isMarketplace && volumeOver50k && acceptsInternational) {
    return {
      name: "Adyen",
      description:
        "Adyen is a global payment platform built for enterprise marketplaces and platforms processing high volumes internationally.",
      reasons: [
        "Your marketplace handles international customers",
        "Your volume of " + monthlyVolume + " meets enterprise thresholds",
        "Single platform for global payment processing",
        "Advanced fraud protection and analytics",
      ],
    };
  }

  // STRIPE - Online businesses with developer needs or global reach
  if (sellsOnline && (acceptsInternational || needsRecurring || isDeveloperFriendly || wantsGlobalReach)) {
    return {
      name: "Stripe",
      description:
        "Stripe is the leading payment platform for online businesses, offering powerful APIs and seamless international payment support.",
      reasons: [
        sellsOnline ? "You sell products or services online" : "",
        acceptsInternational ? "You accept international customers" : "",
        needsRecurring ? "You need recurring billing capabilities" : "",
        isDeveloperFriendly ? "Developer-friendly tools are important to you" : "",
        wantsGlobalReach ? "Global reach is a priority for your business" : "",
      ].filter(Boolean),
    };
  }

  // SQUARE - Physical businesses or in-person focused
  if (isRestaurantOrRetail || sellsInPerson || wantsBothChannels) {
    return {
      name: "Square",
      description:
        "Square provides an all-in-one solution for businesses that sell in-person, with easy-to-use point-of-sale hardware and integrated online tools.",
      reasons: [
        isRestaurantOrRetail ? "Perfect for your physical business" : "",
        sellsInPerson ? "Optimized for in-person sales" : "",
        wantsBothChannels ? "Combined online and in-person support in one platform" : "",
        "Simple setup with no long-term contracts",
        "Integrated POS hardware and software",
      ].filter(Boolean),
    };
  }

  // SUMUP - Low volume, in-person, simplicity focused
  if (isLowVolume && sellsInPerson && wantsEasySetup) {
    return {
      name: "SumUp",
      description:
        "SumUp is perfect for small businesses processing lower volumes who want a simple, affordable card reader with no monthly fees.",
      reasons: [
        "Your monthly volume under £5k qualifies for their simple pricing",
        "Ideal for in-person transactions",
        "No monthly fees — just pay per transaction",
        "Easy setup with portable card readers",
      ],
    };
  }

  // BRAINTREE - Subscriptions or developer control
  if (isSubscription || needsRecurring || isDeveloperFriendly || (isMediumVolume && sellsOnline)) {
    return {
      name: "Braintree",
      description:
        "Braintree (a PayPal service) offers robust subscription billing and developer tools for businesses needing flexible payment solutions.",
      reasons: [
        isSubscription ? "Built for subscription-based businesses" : "",
        needsRecurring ? "Strong recurring billing infrastructure" : "",
        isDeveloperFriendly ? "Developer-friendly APIs and documentation" : "",
        sellsOnline ? "Optimized for online transactions" : "",
        "Supports PayPal, Venmo, and card payments",
      ].filter(Boolean),
    };
  }

  // PAYPAL - Early stage, trust-focused, or low-value transactions
  if (isLowVolume || wantsEasySetup || isEarlyStage || businessType === "Other / mixed") {
    return {
      name: "PayPal",
      description:
        "PayPal is trusted by millions of buyers worldwide, making it ideal for businesses that want instant credibility and easy checkout.",
      reasons: [
        "Trusted by customers worldwide for secure payments",
        "Quick and easy setup with no technical knowledge required",
        isLowVolume || isEarlyStage ? "Great for businesses just starting out" : "",
        "Buyers feel confident paying with PayPal",
      ].filter(Boolean),
    };
  }

  return null;
};

// US Recommendation Logic
export const getUSRecommendation = (answers: QuizAnswers): Provider | null => {
  const {
    businessType,
    salesChannel,
    monthlyVolume,
    features,
    priorities,
  } = answers;

  // Derive feature flags from features array
  const acceptsInternational = features.includes("International customers");
  const needsRecurring = features.includes("Subscriptions / recurring billing");
  const needsSplitPayments = features.includes("Split payments");
  const hasMultipleSellers = features.includes("Multiple sellers");

  const sellsOnline =
    salesChannel === "Online only" || salesChannel === "Both online and in person";
  const sellsInPerson =
    salesChannel === "In person" || salesChannel === "Both online and in person";
  const isDeveloperFriendly = priorities.includes("Ability to scale");
  const wantsGlobalReach = priorities.includes("International payments");
  const wantsEasySetup = priorities.includes("Easy setup");
  const wantsLowestFees = priorities.includes("Keeping fees low");
  const wantsFlexibility = priorities.includes("Flexibility / future-proofing");

  // Volume flags - handle both UK currency format and early-stage options
  const isLowVolume = 
    monthlyVolume === "< £5k" || 
    monthlyVolume === "Just testing / very low volume" ||
    monthlyVolume === "Small but growing";
  const isMediumVolume =
    monthlyVolume === "£5k–20k" || 
    monthlyVolume === "£20k–50k" ||
    monthlyVolume === "Moderate volume";
  const isHighVolume =
    monthlyVolume === "£50k–100k" ||
    monthlyVolume === "£100k+" ||
    monthlyVolume === "Planning to scale quickly";

  const isRestaurantOrRetail = businessType === "Physical business";
  const isMarketplace = businessType === "Marketplace / platform";
  const isOnlineBusiness = businessType === "Online business";
  const isSubscription = needsRecurring;
  const isEarlyStage = businessType === "Early-stage / just getting started";
  const isSaaS = isOnlineBusiness && needsRecurring && isDeveloperFriendly;

  // DATMAN - Native splits, revenue sharing, or marketplace payouts required
  if (needsSplitPayments || hasMultipleSellers || (isMarketplace && (needsSplitPayments || wantsFlexibility))) {
    return {
      name: "Datman",
      description:
        "Datman specializes in native split payments, revenue sharing, and marketplace payouts. Ideal for platforms that need to distribute funds between multiple parties at the point of transaction.",
      reasons: [
        needsSplitPayments ? "You need native split payment capabilities" : "",
        hasMultipleSellers ? "Your platform has multiple sellers requiring payouts" : "",
        isMarketplace ? "Built specifically for marketplace payment flows" : "",
        "Revenue sharing and instant multi-party splitting",
        "Purpose-built for complex payout structures",
      ].filter(Boolean),
    };
  }

  // STRIPE - Online, SaaS, subscription-based businesses with technical resources
  if (isSaaS || (sellsOnline && isDeveloperFriendly && (needsRecurring || wantsFlexibility))) {
    return {
      name: "Stripe",
      description:
        "Stripe is the leading payment platform for online and SaaS businesses. Its powerful APIs, subscription billing tools, and developer-first approach make it ideal for technically sophisticated teams.",
      reasons: [
        isSaaS ? "Perfect for SaaS and subscription-based businesses" : "",
        sellsOnline ? "Optimized for online transactions" : "",
        isDeveloperFriendly ? "Industry-leading developer tools and documentation" : "",
        needsRecurring ? "Robust recurring billing and subscription management" : "",
        wantsFlexibility ? "Highly flexible and future-proof platform" : "",
      ].filter(Boolean),
    };
  }

  // BRAINTREE - Marketplaces or businesses with PayPal-centric flows
  if (isMarketplace || (sellsOnline && wantsEasySetup && !isDeveloperFriendly)) {
    return {
      name: "Braintree",
      description:
        "Braintree (a PayPal company) is excellent for marketplaces and businesses that want seamless PayPal integration. Offers strong support for PayPal, Venmo, and card payments in one platform.",
      reasons: [
        isMarketplace ? "Strong marketplace payment capabilities" : "",
        "Native PayPal and Venmo integration",
        "Unified platform for multiple payment methods",
        sellsOnline ? "Optimized for online checkout experiences" : "",
        "Trusted PayPal infrastructure and buyer protection",
      ].filter(Boolean),
    };
  }

  // ADYEN - High-volume, global, or enterprise-level businesses with complex needs
  if (isHighVolume && (acceptsInternational || wantsGlobalReach)) {
    return {
      name: "Adyen",
      description:
        "Adyen is the payment platform of choice for enterprise-level businesses processing high volumes globally. A single integration gives you access to local and international payment methods worldwide.",
      reasons: [
        "Your high volume of " + monthlyVolume + " qualifies for enterprise pricing",
        acceptsInternational ? "Seamless international payment processing" : "",
        wantsGlobalReach ? "Global reach with local payment methods" : "",
        "Enterprise-grade fraud protection and analytics",
        "Single platform for all markets and payment methods",
      ].filter(Boolean),
    };
  }

  // FISERV (CLOVER) - In-person retail or hospitality businesses prioritizing POS and simplicity
  if ((isRestaurantOrRetail || sellsInPerson) && (wantsEasySetup || !isDeveloperFriendly)) {
    return {
      name: "Fiserv (Clover)",
      description:
        "Fiserv's Clover POS system is ideal for retail and hospitality businesses in the US. It combines easy-to-use point-of-sale hardware with integrated payment processing for seamless in-person transactions.",
      reasons: [
        isRestaurantOrRetail ? "Built for retail and hospitality businesses" : "",
        sellsInPerson ? "Optimized for in-person sales" : "",
        wantsEasySetup ? "Simple setup and intuitive interface" : "",
        "All-in-one POS hardware and payment processing",
        "Established US payment infrastructure",
      ].filter(Boolean),
    };
  }

  // AUTHORIZE.NET - Legacy or low-complexity SMBs seeking stability
  if (isLowVolume || isEarlyStage || (wantsEasySetup && !isDeveloperFriendly)) {
    return {
      name: "Authorize.Net",
      description:
        "Authorize.Net is a reliable, established payment gateway trusted by US small and medium businesses for decades. Ideal for businesses seeking stability and straightforward payment processing.",
      reasons: [
        "Trusted by US businesses for over 20 years",
        isLowVolume || isEarlyStage ? "Great for small and growing businesses" : "",
        wantsEasySetup ? "Straightforward setup and integration" : "",
        "Stable, reliable payment processing",
        "Wide compatibility with existing systems",
      ].filter(Boolean),
    };
  }

  // Fallback to Stripe for any remaining online cases
  if (sellsOnline) {
    return {
      name: "Stripe",
      description:
        "Stripe is the leading payment platform for online businesses, offering powerful APIs and seamless payment support across the US and internationally.",
      reasons: [
        "You sell products or services online",
        "Industry-leading developer tools",
        "Easy to get started and scale",
        "Comprehensive payment solution",
      ],
    };
  }

  return null;
};

// Main recommendation function that routes to the correct market logic
export const getRecommendation = (answers: QuizAnswers, market: Market = "UK"): Provider | null => {
  if (market === "US") {
    return getUSRecommendation(answers);
  }
  return getUKRecommendation(answers);
};
