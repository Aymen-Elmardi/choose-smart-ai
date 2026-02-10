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
    subtext: "This determines which providers can support your setup and how risk is assessed.",
    options: [
      "Online only",
      "In person only",
      "Online and in person",
      "Marketplace or platform",
    ],
  });

  // Q2: Terminal Type (only if needsInPerson)
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

  // Q3: Business Type (always)
  // If user already selected marketplace in salesChannel, show "Platform" instead
  const businessTypeOptions = answers.needsMarketplace
    ? ["Solo business", "Multi-location business", "Franchise", "Platform"]
    : ["Solo business", "Multi-location business", "Franchise", "Marketplace or platform"];
  
  questions.push({
    id: "businessType",
    question: "Which best describes your business?",
    subtext: "Different models are underwritten very differently by providers.",
    options: businessTypeOptions,
  });

  // Q4: Monthly Volume (always)
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

  // Q5: Average Transaction Value (always)
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

  // Q6: Priorities (always, max 2)
  questions.push({
    id: "priorities",
    question: "What matters most to you right now?",
    subtext: "This helps us match provider strengths to what you actually need.",
    multiSelect: true,
    maxSelect: 2,
    options: [
      "Lower fees",
      "Reliability",
      "Ability to scale",
      "Support during setup",
    ],
  });

  // Q7: Industry (dropdown, always)
  questions.push({
    id: "industry",
    question: "What industry best describes your business?",
    subtext: "Industry classification directly affects which providers will accept your application.",
    type: "dropdown",
    dropdownOptions: INDUSTRY_OPTIONS,
  });

  // Q8: Delivery Timeline (always)
  questions.push({
    id: "deliveryTimeline",
    question: "How long after a customer pays do they receive the product or service?",
    options: [
      "Instant/Same Day",
      "Within 1-7 Days",
      "Within 8-30 Days",
      "More than 30 days",
    ],
  });

  // Q9: Buying Intent (always)
  questions.push({
    id: "buyingIntent",
    question: "When are you looking to move forward?",
    options: [
      "Ready to move now",
      "In the next 1–3 months",
      "Just exploring options",
    ],
  });

  // Q10: Business Location (always)
  questions.push({
    id: "location",
    question: "Where is your business based?",
    options: ["UK", "EU", "UK & EU"],
  });

  // Q11: Best Time to Contact (always)
  questions.push({
    id: "contactTime",
    question: "When is the best time to contact you?",
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
