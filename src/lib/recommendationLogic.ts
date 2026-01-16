// Recommendation logic for UK and US markets

export interface QuizAnswers {
  salesChannel: string;
  businessType: string;
  priorities: string[];
  location: string;
  monthlyVolume: string;
  avgTransaction: string;
  features: string[];
  // Additional fields from quiz
  industry?: string;
  contactTime?: string;
  terminalType?: string;
  // Risk-critical fields
  riskProfile?: string;
  deliveryTimeline?: string;
}

export interface Provider {
  name: string;
  description: string;
  reasons: string[];
  matchScore?: number;
}

export type Market = "UK" | "US";

// Calculate match score percentage
export const calculateMatchScore = (provider: Provider, answers: QuizAnswers): number => {
  let score = 50; // Base score
  let maxScore = 150; // Maximum possible score
  
  const { businessType, salesChannel, monthlyVolume, features, priorities, location, riskProfile, deliveryTimeline } = answers;
  
  // Feature flags
  const acceptsInternational = features.includes("International customers");
  const needsRecurring = features.includes("Subscriptions / recurring billing");
  const hasMultipleSellers = features.includes("Multiple sellers");
  const isMarketplace = businessType === "Marketplace / platform";
  const sellsInPerson = salesChannel === "In person" || salesChannel === "Both online and in person";
  const sellsOnline = salesChannel === "Online only" || salesChannel === "Both online and in person";
  const volumeOver50k = monthlyVolume === "£50k–100k" || monthlyVolume === "£100k+";
  const isLowVolume = monthlyVolume === "< £5k" || monthlyVolume === "Just testing / very low volume";
  
  // Business model fit (high weight)
  if (isMarketplace) score += 25;
  if (hasMultipleSellers) score += 20;
  if (needsRecurring) score += 20;
  if (acceptsInternational) score += 20;
  
  // Channel fit
  if (sellsInPerson) score += 15;
  if (sellsOnline) score += 10;
  
  // Volume alignment
  if (volumeOver50k) score += 10;
  if (isLowVolume) score += 5;
  
  // Priority alignment
  priorities.forEach(p => {
    if (p === "Keeping fees low" || p === "Lower fees") score += 15;
    if (p === "Easy setup" || p === "Support during setup") score += 15;
    if (p === "Ability to scale") score += 15;
  });
  
  // Risk profile scoring (NEW)
  if (riskProfile === "low") score += 10;
  if (riskProfile === "high") score += 5; // Specialist providers handle high risk
  
  // Delivery timeline scoring (NEW)
  if (deliveryTimeline === "urgent") score += 10;
  if (deliveryTimeline === "planned") score += 5;
  
  // UK location bonus
  if (location === "UK") score += 5;
  
  // Calculate percentage (capped at 99%)
  const percentage = Math.min(99, Math.round((score / maxScore) * 100));
  return Math.max(65, percentage); // Minimum 65% for any match
};

// UK Recommendation Logic (existing)
export const getUKRecommendation = (answers: QuizAnswers): Provider | null => {
  const {
    businessType,
    salesChannel,
    monthlyVolume,
    features,
    priorities,
    location,
    riskProfile,
    deliveryTimeline,
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
  
  // NEW: Risk profile flags
  const isHighRisk = riskProfile === "high";
  const needsUrgentSetup = deliveryTimeline === "urgent";

  // Complexity and risk flags for Shift4 routing
  const hasComplexityFlags = 
    isMarketplace || 
    hasMultipleSellers || 
    acceptsInternational || 
    volumeOver50k ||
    isHighRisk;
  const needsReliableApproval = priorities.includes("Flexibility / future-proofing") || 
    priorities.includes("Ability to scale") ||
    isHighRisk;
  const isComplexCase = hasComplexityFlags && (needsReliableApproval || volumeOver50k);
  const isSimpleLowVolumeFocused = isLowVolume && wantsLowestFees && !isMarketplace && !hasMultipleSellers && !acceptsInternational && !isHighRisk;

  // SHIFT4 - Complex cases, marketplaces, international, high volume, HIGH RISK where mainstream may struggle
  if (isComplexCase && !isSimpleLowVolumeFocused) {
    // Check for high-risk profile first
    if (isHighRisk) {
      const provider: Provider = {
        name: "Shift4",
        description:
          "Built for more complex payment setups. Better suited for businesses with higher approval requirements and sophisticated payment flows.",
        reasons: [
          "Specialist support for your payment processing history",
          isMarketplace ? "Your marketplace model benefits from specialist support" : "",
          acceptsInternational ? "Strong cross-border and multi-region capabilities" : "",
          volumeOver50k ? "Designed for high-volume transaction processing" : "",
        ].filter(Boolean),
      };
      provider.matchScore = calculateMatchScore(provider, answers);
      return provider;
    }
    
    // Check for marketplace + international or high volume complexity
    if ((isMarketplace && acceptsInternational) || 
        (isMarketplace && volumeOver50k) || 
        (hasMultipleSellers && acceptsInternational)) {
      const provider: Provider = {
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
      provider.matchScore = calculateMatchScore(provider, answers);
      return provider;
    }
  }

  // DATMAN - UK Marketplaces with high volume
  if (isMarketplace && volumeOver20k && isUK && (isDeveloperFriendly || wantsLowestFees)) {
    const provider: Provider = {
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
    provider.matchScore = calculateMatchScore(provider, answers);
    return provider;
  }

  // ADYEN - High volume international marketplaces
  if (isMarketplace && volumeOver50k && acceptsInternational) {
    const provider: Provider = {
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
    provider.matchScore = calculateMatchScore(provider, answers);
    return provider;
  }

  // Fast setup providers for urgent timeline
  if (needsUrgentSetup && isLowVolume && sellsInPerson) {
    const provider: Provider = {
      name: "SumUp",
      description:
        "SumUp is perfect for small businesses processing lower volumes who want a simple, affordable card reader with no monthly fees.",
      reasons: [
        "Quick setup - start accepting payments within days",
        "Your monthly volume qualifies for their simple pricing",
        "Ideal for in-person transactions",
        "No monthly fees — just pay per transaction",
      ],
    };
    provider.matchScore = calculateMatchScore(provider, answers);
    return provider;
  }

  // STRIPE - Online businesses with developer needs or global reach
  if (sellsOnline && (acceptsInternational || needsRecurring || isDeveloperFriendly || wantsGlobalReach)) {
    const provider: Provider = {
      name: "Stripe",
      description:
        "Stripe is the leading payment platform for online businesses, offering powerful APIs and seamless international payment support.",
      reasons: [
        sellsOnline ? "You sell products or services online" : "",
        acceptsInternational ? "You accept international customers" : "",
        needsRecurring ? "You need recurring billing capabilities" : "",
        isDeveloperFriendly ? "Developer-friendly tools are important to you" : "",
        wantsGlobalReach ? "Global reach is a priority for your business" : "",
        needsUrgentSetup ? "Fast online setup process" : "",
      ].filter(Boolean),
    };
    provider.matchScore = calculateMatchScore(provider, answers);
    return provider;
  }

  // SQUARE - Physical businesses or in-person focused
  if (isRestaurantOrRetail || sellsInPerson || wantsBothChannels) {
    const provider: Provider = {
      name: "Square",
      description:
        "Square provides an all-in-one solution for businesses that sell in-person, with easy-to-use point-of-sale hardware and integrated online tools.",
      reasons: [
        isRestaurantOrRetail ? "Perfect for your physical business" : "",
        sellsInPerson ? "Optimized for in-person sales" : "",
        wantsBothChannels ? "Combined online and in-person support in one platform" : "",
        "Simple setup with no long-term contracts",
        "Integrated POS hardware and software",
        needsUrgentSetup ? "Quick setup - get started within days" : "",
      ].filter(Boolean),
    };
    provider.matchScore = calculateMatchScore(provider, answers);
    return provider;
  }

  // SUMUP - Low volume, in-person, simplicity focused
  if (isLowVolume && sellsInPerson && wantsEasySetup) {
    const provider: Provider = {
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
    provider.matchScore = calculateMatchScore(provider, answers);
    return provider;
  }

  // BRAINTREE - Subscriptions or developer control
  if (isSubscription || needsRecurring || isDeveloperFriendly || (isMediumVolume && sellsOnline)) {
    const provider: Provider = {
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
    provider.matchScore = calculateMatchScore(provider, answers);
    return provider;
  }

  // PAYPAL - Early stage, trust-focused, or low-value transactions
  if (isLowVolume || wantsEasySetup || isEarlyStage || businessType === "Other / mixed") {
    const provider: Provider = {
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
    provider.matchScore = calculateMatchScore(provider, answers);
    return provider;
  }

  return null;
};

// US Recommendation Logic - mirrors UK logic structure with US provider mapping
export const getUSRecommendation = (answers: QuizAnswers): Provider | null => {
  const {
    businessType,
    salesChannel,
    monthlyVolume,
    features,
    priorities,
    location,
    riskProfile,
    deliveryTimeline,
  } = answers;

  // Derive feature flags from features array (same as UK)
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

  // Handle both numeric ranges and early-stage expectation-based options (same as UK)
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
  const isUS = location === "US";
  const wantsBothChannels = salesChannel === "Both online and in person";

  // NEW: Risk profile flags
  const isHighRisk = riskProfile === "high";
  const needsUrgentSetup = deliveryTimeline === "urgent";

  // Complexity and risk flags for Shift4 routing (same as UK logic)
  const hasComplexityFlags = 
    isMarketplace || 
    hasMultipleSellers || 
    acceptsInternational || 
    volumeOver50k ||
    isHighRisk;
  const needsReliableApproval = priorities.includes("Flexibility / future-proofing") || 
    priorities.includes("Ability to scale") ||
    isHighRisk;
  const isComplexCase = hasComplexityFlags && (needsReliableApproval || volumeOver50k);
  const isSimpleLowVolumeFocused = isLowVolume && wantsLowestFees && !isMarketplace && !hasMultipleSellers && !acceptsInternational && !isHighRisk;

  // SHIFT4 - Complex cases, marketplaces, international, high volume, HIGH RISK where mainstream may struggle
  if (isComplexCase && !isSimpleLowVolumeFocused) {
    if (isHighRisk || (isMarketplace && acceptsInternational) || 
        (isMarketplace && volumeOver50k) || 
        (hasMultipleSellers && acceptsInternational)) {
      const provider: Provider = {
        name: "Shift4",
        description:
          "Built for more complex payment setups. Better suited for businesses with higher approval requirements and sophisticated payment flows.",
        reasons: [
          isHighRisk ? "Specialist support for your payment processing history" : "",
          isMarketplace ? "Your marketplace model benefits from specialist support" : "",
          acceptsInternational ? "Strong cross-border and multi-region capabilities" : "",
          volumeOver50k ? "Designed for high-volume transaction processing" : "",
          hasMultipleSellers ? "Advanced multi-party settlement support" : "",
        ].filter(Boolean),
      };
      provider.matchScore = calculateMatchScore(provider, answers);
      return provider;
    }
  }

  // DATMAN (US) - Marketplaces with high volume, revenue splitting, or multiple sellers
  if (isMarketplace && volumeOver20k && (isDeveloperFriendly || wantsLowestFees || hasMultipleSellers)) {
    const provider: Provider = {
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
    provider.matchScore = calculateMatchScore(provider, answers);
    return provider;
  }

  // FISERV (Clover) - High volume international marketplaces
  if (isMarketplace && volumeOver50k && acceptsInternational) {
    const provider: Provider = {
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
    provider.matchScore = calculateMatchScore(provider, answers);
    return provider;
  }

  // Fast setup for urgent timeline
  if (needsUrgentSetup && isLowVolume && sellsInPerson) {
    const provider: Provider = {
      name: "Square",
      description:
        "Square is perfect for small US businesses processing lower volumes who want a simple, affordable card reader with transparent pricing.",
      reasons: [
        "Quick setup - start accepting payments within days",
        "Your monthly volume qualifies for their simple pricing",
        "Ideal for in-person transactions",
        "No monthly fees on basic plan",
      ],
    };
    provider.matchScore = calculateMatchScore(provider, answers);
    return provider;
  }

  // STRIPE (US) - Online businesses with developer needs or global reach
  if (sellsOnline && (acceptsInternational || needsRecurring || isDeveloperFriendly || wantsGlobalReach)) {
    const provider: Provider = {
      name: "Stripe",
      description:
        "Stripe is the leading payment platform for online businesses, offering powerful APIs and seamless international payment support across the US and globally.",
      reasons: [
        sellsOnline ? "You sell products or services online" : "",
        acceptsInternational ? "You accept international customers" : "",
        needsRecurring ? "You need recurring billing capabilities" : "",
        isDeveloperFriendly ? "Developer-friendly tools are important to you" : "",
        wantsGlobalReach ? "Global reach is a priority for your business" : "",
        needsUrgentSetup ? "Fast online setup process" : "",
      ].filter(Boolean),
    };
    provider.matchScore = calculateMatchScore(provider, answers);
    return provider;
  }

  // SQUARE (US) - Physical businesses or in-person focused
  if (isRestaurantOrRetail || sellsInPerson || wantsBothChannels) {
    const provider: Provider = {
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
    provider.matchScore = calculateMatchScore(provider, answers);
    return provider;
  }

  // SQUARE (US) - Low volume, in-person, simplicity focused
  if (isLowVolume && sellsInPerson && wantsEasySetup) {
    const provider: Provider = {
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
    provider.matchScore = calculateMatchScore(provider, answers);
    return provider;
  }

  // STRIPE (US) - Subscriptions or developer control
  if (isSubscription || needsRecurring || isDeveloperFriendly || (isMediumVolume && sellsOnline)) {
    const provider: Provider = {
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
    provider.matchScore = calculateMatchScore(provider, answers);
    return provider;
  }

  // AUTHORIZE.NET - Early stage, trust-focused, or low-complexity
  if (isLowVolume || wantsEasySetup || isEarlyStage || businessType === "Other / mixed") {
    const provider: Provider = {
      name: "Authorize.Net",
      description:
        "Authorize.Net is a reliable, established payment gateway trusted by US small and medium businesses for decades. Ideal for businesses seeking stability and straightforward payment processing.",
      reasons: [
        "Trusted by US businesses for over 20 years",
        "Straightforward setup and integration",
        isLowVolume || isEarlyStage ? "Great for businesses just getting started" : "",
        "Reliable transaction processing",
      ].filter(Boolean),
    };
    provider.matchScore = calculateMatchScore(provider, answers);
    return provider;
  }

  return null;
};

// Main recommendation function that routes to appropriate market
export const getRecommendation = (answers: QuizAnswers, market: Market = "UK"): Provider | null => {
  if (market === "US") {
    return getUSRecommendation(answers);
  }
  return getUKRecommendation(answers);
};
