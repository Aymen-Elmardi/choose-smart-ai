// Quiz question configurations and industry options
import type { Question, QuizAnswers } from "@/types/quiz";
import { deriveSegment, PLATFORM_OPTIONS } from "@/lib/quiz/quizSegment";

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
 * Get localized contact time options based on location
 */
export const getContactTimeOptions = (location: string): string[] => {
  if (location === "EU") {
    return [
      "Morning (9:00–12:00 CET)",
      "Afternoon (12:00–17:00 CET)",
      "Evening (after 17:00 CET)",
    ];
  }
  // Default UK times
  return [
    "Morning (9am–12pm)",
    "Afternoon (12pm–5pm)",
    "Evening (after 5pm)",
  ];
};

/**
 * Build questions dynamically based on current answers
 * Implements conditional skip logic for a conversational flow
 */
export const getQuestions = (answers: QuizAnswers): Question[] => {
  const questions: Question[] = [];

  // Q1: Sales Channel (always)
  questions.push({
    id: "salesChannel",
    question: "How will you accept payments?",
    subtext: "",
    options: [
      "Online only",
      "In person only",
      "Online and in person",
      "Marketplace or platform",
    ],
  });

  // Q2: Platform (always) — drives segmentation + Shopify soft-capture
  questions.push({
    id: "platform",
    question: "What platform powers your business?",
    subtext: "This helps us recommend the right payment processor for your setup.",
    options: PLATFORM_OPTIONS,
  });

  // Terminal Type (only if needsInPerson)
  if (answers.needsInPerson) {
    questions.push({
      id: "terminalType",
      question: "Do you need a card terminal?",
      subtext: "Terminal type affects onboarding requirements and hardware compatibility.",
      options: [
        "Fixed terminal (countertop)",
        "Portable terminal (SIM or Wi-Fi)",
        "Not sure yet",
      ],
    });
  }

  // Business Type (always)
  // If user already selected marketplace in salesChannel, show "Platform" instead
  const businessTypeOptions = answers.needsMarketplace
    ? ["Solo business", "Multi-location business", "Franchise", "Platform"]
    : ["Solo business", "Multi-location business", "Franchise", "Marketplace or platform"];

  questions.push({
    id: "businessType",
    question: "Which best describes your business?",
    subtext: "",
    options: businessTypeOptions,
  });

  // Industry (dropdown, always) — needed before segment-specific branching
  questions.push({
    id: "industry",
    question: "What industry best describes your business?",
    subtext: "Industry classification directly affects which providers will accept your application.",
    type: "dropdown",
    dropdownOptions: INDUSTRY_OPTIONS,
  });

  // ── Segment-specific block ──────────────────────────────────────────────
  // Derived live from the current answers so the flow branches as soon as the
  // platform + industry are known. Shopify (soft-capture) gets no extra
  // questions — it continues straight to the core questions and lands on the
  // Shopify results template.
  const segment = deriveSegment(answers);

  if (segment === "self-hosted") {
    questions.push({
      id: "currentProcessor",
      question: "What payment processor are you currently using?",
      subtext: "This tells us whether you're overpaying on a flat rate or already on Interchange++.",
      options: [
        "Stripe",
        "PayPal",
        "Square",
        "Wise / Skrill",
        "Adyen",
        "Checkout.com",
        "Another processor",
        "Not sure",
      ],
    });
    questions.push({
      id: "painPoints",
      question: "Are you experiencing any of these payment challenges?",
      subtext: "Select all that apply.",
      multiSelect: true,
      maxSelect: 4,
      options: [
        "High processing fees eating into margins",
        "Slow or unpredictable settlement times",
        "Poor fraud protection / high chargebacks",
        "Difficulty scaling to higher volumes",
        "Limited customer payment options",
        "Poor customer support from processor",
        "Restrictions on certain product types",
        "None of the above",
      ],
    });
  } else if (segment === "marketplace") {
    questions.push({
      id: "marketplaceModel",
      question: "How does your marketplace work?",
      subtext: "Different models need different settlement and payout logic.",
      options: [
        "Seller-to-buyer (like Amazon, eBay, Etsy)",
        "Peer-to-peer (like Airbnb, Vinted)",
        "Subscription-based (like Patreon)",
        "Commission-based (like Upwork)",
        "Other",
      ],
    });
    questions.push({
      id: "marketplaceChallenge",
      question: "What's your biggest payment challenge?",
      subtext: "",
      options: [
        "Complex multi-merchant settlement",
        "High chargeback rates from sellers",
        "Regulatory compliance (KYC/AML)",
        "Seller onboarding friction",
        "Inability to hold reserves",
        "Difficulty with cross-border payments",
        "High fees eating into commission",
        "Other",
      ],
    });
  } else if (segment === "saas") {
    questions.push({
      id: "revenueModel",
      question: "How do you charge customers?",
      subtext: "Your billing model shapes which features matter most.",
      options: [
        "Monthly subscription",
        "Annual subscription",
        "Usage-based / metered billing",
        "Tiered pricing",
        "One-time purchase + subscriptions",
        "Other",
      ],
    });
    questions.push({
      id: "billingChallenge",
      question: "What's your biggest billing challenge?",
      subtext: "",
      options: [
        "High involuntary churn (failed payments)",
        "Dunning management complexity",
        "Difficulty with multi-currency billing",
        "Lack of advanced billing features",
        "High processor fees on recurring charges",
        "Other",
      ],
    });
  } else if (segment === "multi-location") {
    questions.push({
      id: "locationCount",
      question: "How many locations do you operate?",
      subtext: "",
      options: [
        "2-5 locations",
        "6-20 locations",
        "21-50 locations",
        "50+ locations",
      ],
    });
    questions.push({
      id: "salesMix",
      question: "What percentage of sales are online vs. in-person?",
      subtext: "This determines how much omnichannel unification you need.",
      options: [
        "Mostly online (70%+)",
        "Mostly in-person (70%+)",
        "Roughly 50/50",
      ],
    });
  } else if (segment === "high-risk") {
    questions.push({
      id: "declineHistory",
      question: "Have you been declined or terminated by payment processors?",
      subtext: "This is common in your industry and helps us match you with the right specialist.",
      options: [
        "Yes, multiple times",
        "Yes, once",
        "No, but I'm worried about it",
        "No",
      ],
    });
  }

  // Monthly Volume (always)
  questions.push({
    id: "monthlyVolume",
    question: "Roughly how much do you expect to process per month?",
    subtext: "This helps us understand approval thresholds, reserve risk, and provider appetite.",
    options: [
      "Just getting started",
      "Under £10k",
      "£10k–£50k",
      "£50k+",
    ],
  });

  // Average Transaction Value (always)
  questions.push({
    id: "avgTransaction",
    question: "What's your typical transaction size?",
    subtext: "Transaction size influences fraud screening sensitivity and chargeback exposure.",
    options: [
      "Under £20",
      "£20–£100",
      "£100–£500",
      "£500+",
    ],
  });

  // Priorities (always, max 2)
  questions.push({
    id: "priorities",
    question: "What matters most to you right now?",
    subtext: "Select up to 2. This helps us match provider strengths to what you actually need.",
    multiSelect: true,
    maxSelect: 2,
    options: [
      "Lower fees",
      "Reliability",
      "Ability to scale",
      "Support during setup",
    ],
  });

  // Delivery Timeline (always)
  questions.push({
    id: "deliveryTimeline",
    question: "How long after a customer pays do they receive the product or service?",
    subtext: "Longer delivery windows increase chargeback exposure and trigger stricter reserve requirements.",
    options: [
      "Instant/Same Day",
      "Within 1-7 Days",
      "Within 8-30 Days",
      "More than 30 days",
    ],
  });

  // Previous Restriction (skip for high-risk — declineHistory already covers it)
  if (segment !== "high-risk") {
    questions.push({
      id: "previousRestriction",
      question: "Have you previously had a payment account restricted, terminated, or placed under review?",
      subtext: "This is common and helps us anticipate provider-specific onboarding requirements.",
      options: [
        "No",
        "Yes, but it was resolved",
        "Yes, and it is still ongoing",
        "Prefer not to say",
      ],
    });
  }

  // Buying Intent (always)
  questions.push({
    id: "buyingIntent",
    question: "When are you looking to move forward?",
    subtext: "Timing helps us prioritise your case and prepare the right guidance.",
    options: [
      "Ready to move now",
      "In the next 1–3 months",
      "Just exploring options",
    ],
  });

  // Business Location (always)
  questions.push({
    id: "location",
    question: "Where is your business based?",
    subtext: "Cross-border activity changes approval rules, settlement timing, and risk review.",
    options: ["UK", "EU", "UK & EU"],
  });

  // Best Time to Contact (always)
  questions.push({
    id: "contactTime",
    question: "When is the best time to contact you?",
    subtext: "We'll reach out during your preferred window.",
    options: getContactTimeOptions(answers.location),
  });

  return questions;
};

/**
 * Get the total number of questions based on current answers
 */
export const getQuestionCount = (answers: QuizAnswers): number => {
  return getQuestions(answers).length;
};
