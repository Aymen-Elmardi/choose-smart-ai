// Recommendation logic for UK and US markets
// Client-side fallback when server engine is unavailable

// Re-export types from canonical source
export type { QuizAnswers, Provider, Market } from "@/types/quiz";

import type { QuizAnswers, Provider } from "@/types/quiz";

// UK Recommendation Logic (existing)
export const getUKRecommendation = (answers: QuizAnswers): Provider | null => {
  const {
    businessType,
    salesChannel,
    monthlyVolume,
    features = [],
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

  // Complexity and risk flags for Shift4 routing
  const hasComplexityFlags = 
    isMarketplace || 
    hasMultipleSellers || 
    acceptsInternational || 
    volumeOver50k;
  const needsReliableApproval = priorities.includes("Flexibility / future-proofing") || 
    priorities.includes("Ability to scale");
  const isComplexCase = hasComplexityFlags && (needsReliableApproval || volumeOver50k);
  const isSimpleLowVolumeFocused = isLowVolume && wantsLowestFees && !isMarketplace && !hasMultipleSellers && !acceptsInternational;

  // SHIFT4 - Complex cases, marketplaces, international, high volume where mainstream may struggle
  if (isComplexCase && !isSimpleLowVolumeFocused) {
    if ((isMarketplace && acceptsInternational) || 
        (isMarketplace && volumeOver50k) || 
        (hasMultipleSellers && acceptsInternational)) {
      return {
        name: "Shift4",
        description:
          "Built for more complex payment setups. Better suited for businesses with higher approval requirements and sophisticated payment flows.",
        reasons: [
          isMarketplace ? "Your marketplace model benefits from specialist support" : "",
          acceptsInternational ? "Strong cross-border and multi-region capabilities" : "",
          volumeOver50k ? "Designed for high-volume transaction processing" : "",
          hasMultipleSellers ? "Advanced multi-party settlement support" : "",
        ].filter(Boolean),
      };
    }
  }

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

// US Recommendation Logic - mirrors UK logic structure with US provider mapping
export const getUSRecommendation = (answers: QuizAnswers): Provider | null => {
  const {
    businessType,
    salesChannel,
    monthlyVolume,
    features = [],
    priorities,
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
  const wantsBothChannels = salesChannel === "Both online and in person";

  // Complexity and risk flags
  const hasComplexityFlags = 
    isMarketplace || 
    hasMultipleSellers || 
    acceptsInternational || 
    volumeOver50k;
  const needsReliableApproval = priorities.includes("Flexibility / future-proofing") || 
    priorities.includes("Ability to scale");
  const isComplexCase = hasComplexityFlags && (needsReliableApproval || volumeOver50k);
  const isSimpleLowVolumeFocused = isLowVolume && wantsLowestFees && !isMarketplace && !hasMultipleSellers && !acceptsInternational;

  // SHIFT4 - Complex cases
  if (isComplexCase && !isSimpleLowVolumeFocused) {
    if ((isMarketplace && acceptsInternational) || 
        (isMarketplace && volumeOver50k) || 
        (hasMultipleSellers && acceptsInternational)) {
      return {
        name: "Shift4",
        description:
          "Built for more complex payment setups. Better suited for businesses with higher approval requirements and sophisticated payment flows.",
        reasons: [
          isMarketplace ? "Your marketplace model benefits from specialist support" : "",
          acceptsInternational ? "Strong cross-border and multi-region capabilities" : "",
          volumeOver50k ? "Designed for high-volume transaction processing" : "",
          hasMultipleSellers ? "Advanced multi-party settlement support" : "",
        ].filter(Boolean),
      };
    }
  }

  // DATMAN (US) - Marketplaces with high volume
  if (isMarketplace && volumeOver20k && (isDeveloperFriendly || wantsLowestFees || hasMultipleSellers)) {
    return {
      name: "Datman",
      description:
        "Datman specializes in native split payments, revenue sharing, and marketplace payouts. Ideal for US platforms that need to distribute funds between multiple parties at the point of transaction.",
      reasons: [
        "Your marketplace business model requires complex payment flows",
        "Your monthly volume of " + monthlyVolume + " qualifies for competitive rates",
        "Built-in revenue share and split payment capabilities",
        "Purpose-built for complex payout structures",
      ],
    };
  }

  // FISERV (Clover) - High volume international marketplaces
  if (isMarketplace && volumeOver50k && acceptsInternational) {
    return {
      name: "Fiserv (Clover)",
      description:
        "Fiserv's Clover ecosystem is built for larger SMBs and operationally heavy setups. Ideal for high-volume businesses with complex needs across multiple locations.",
      reasons: [
        "Your marketplace handles international customers",
        "Your volume of " + monthlyVolume + " meets enterprise thresholds",
        "Established US payment infrastructure",
        "Advanced operational tools and analytics",
      ],
    };
  }

  // STRIPE (US) - Online businesses with developer needs or global reach
  if (sellsOnline && (acceptsInternational || needsRecurring || isDeveloperFriendly || wantsGlobalReach)) {
    return {
      name: "Stripe",
      description:
        "Stripe is the leading payment platform for online businesses, offering powerful APIs and seamless international payment support across the US and globally.",
      reasons: [
        sellsOnline ? "You sell products or services online" : "",
        acceptsInternational ? "You accept international customers" : "",
        needsRecurring ? "You need recurring billing capabilities" : "",
        isDeveloperFriendly ? "Developer-friendly tools are important to you" : "",
        wantsGlobalReach ? "Global reach is a priority for your business" : "",
      ].filter(Boolean),
    };
  }

  // SQUARE (US) - Physical businesses or in-person focused
  if (isRestaurantOrRetail || sellsInPerson || wantsBothChannels) {
    return {
      name: "Square",
      description:
        "Square provides an all-in-one solution for US businesses that sell in-person, with easy-to-use point-of-sale hardware and integrated online tools.",
      reasons: [
        isRestaurantOrRetail ? "Perfect for your physical business" : "",
        sellsInPerson ? "Optimized for in-person sales" : "",
        wantsBothChannels ? "Combined online and in-person support in one platform" : "",
        "Simple setup with no long-term contracts",
        "Integrated POS hardware and software",
      ].filter(Boolean),
    };
  }

  // SQUARE (US) - Low volume, in-person, simplicity focused
  if (isLowVolume && sellsInPerson && wantsEasySetup) {
    return {
      name: "Square",
      description:
        "Square is perfect for small US businesses processing lower volumes who want a simple, affordable card reader with transparent pricing.",
      reasons: [
        "Your monthly volume qualifies for their simple pricing",
        "Ideal for in-person transactions",
        "No monthly fees on basic plan — just pay per transaction",
        "Easy setup with portable card readers",
      ],
    };
  }

  // STRIPE (US) - Subscriptions or developer control
  if (isSubscription || needsRecurring || isDeveloperFriendly || (isMediumVolume && sellsOnline)) {
    return {
      name: "Stripe",
      description:
        "Stripe offers robust subscription billing and developer tools for US businesses needing flexible payment solutions with recurring revenue models.",
      reasons: [
        isSubscription ? "Built for subscription-based businesses" : "",
        needsRecurring ? "Strong recurring billing infrastructure" : "",
        isDeveloperFriendly ? "Developer-friendly APIs and documentation" : "",
        sellsOnline ? "Optimized for online transactions" : "",
        "Industry-leading billing and invoicing tools",
      ].filter(Boolean),
    };
  }

  // AUTHORIZE.NET - Early stage, trust-focused, or low-complexity
  if (isLowVolume || wantsEasySetup || isEarlyStage || businessType === "Other / mixed") {
    return {
      name: "Authorize.Net",
      description:
        "Authorize.Net is a reliable, established payment gateway trusted by US small and medium businesses for decades. Ideal for businesses seeking stability and straightforward payment processing.",
      reasons: [
        "Trusted by US businesses for over 20 years",
        "Straightforward setup and integration",
        isLowVolume || isEarlyStage ? "Great for businesses just starting out" : "",
        "Works with most existing merchant accounts",
      ].filter(Boolean),
    };
  }

  return null;
};

/**
 * Get recommendation based on quiz answers and market
 * Uses client-side fallback logic when server is unavailable
 */
export const getRecommendation = (answers: QuizAnswers, market: "UK" | "US" = "UK"): Provider | null => {
  if (market === "US") {
    return getUSRecommendation(answers);
  }
  return getUKRecommendation(answers);
};
