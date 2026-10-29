// Micro-insights configuration - displayed based on user selections
import type { MicroInsightConfig } from "@/types/quiz";

/**
 * Contextual tips shown during the quiz based on specific answer selections.
 * These provide educational value and build trust.
 */
export const MICRO_INSIGHTS: MicroInsightConfig[] = [
  {
    questionId: "businessModel",
    triggerAnswer: "Online store on Shopify",
    text: "You're on Shopify, so you already have access to Shopify Payments — optimised for your platform. We specialise in self-hosted, marketplace and SaaS businesses, but we'll still flag where you could save and how your costs compare.",
  },
  {
    questionId: "businessModel",
    triggerAnswer: "Marketplace or platform that pays out sellers",
    text: "Marketplace models require specialized \"Split Payment\" logic to handle sub-merchant payouts and compliance.",
  },
  {
    questionId: "monthlyVolume",
    triggerAnswer: "$50k–$250k",
    text: "At this volume, you qualify for Interchange++ pricing, which is significantly cheaper than standard flat rates.",
  },
  {
    questionId: "monthlyVolume",
    triggerAnswer: "$250k+",
    text: "At this volume, you qualify for Interchange++ pricing, which is significantly cheaper than standard flat rates.",
  },
  {
    questionId: "industry",
    triggerAnswer: "saas",
    text: "SaaS businesses benefit most from automated recurring billing and \"Account Updater\" features to reduce churn.",
  },
  {
    questionId: "industry",
    triggerAnswer: "travel",
    text: "These are considered \"Future Delivery\" risks. We'll match you with providers who won't hold 100% of your funds.",
  },
];

/**
 * Get the active micro-insight for the current question and answer.
 * Returns null if no matching insight is found.
 */
export const getActiveMicroInsight = (
  questionId: string,
  answer: string | string[]
): string | null => {
  const matchingInsights = MICRO_INSIGHTS.filter((insight) => {
    if (insight.questionId !== questionId) return false;
    
    // Handle multi-select (priorities)
    if (Array.isArray(answer)) {
      return answer.includes(insight.triggerAnswer);
    }
    
    return answer === insight.triggerAnswer;
  });
  
  // Return the first matching insight text
  return matchingInsights.length > 0 ? matchingInsights[0].text : null;
};
