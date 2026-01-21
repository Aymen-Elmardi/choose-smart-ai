// Micro-insights configuration - displayed based on user selections
import type { MicroInsightConfig } from "@/types/quiz";

/**
 * Contextual tips shown during the quiz based on specific answer selections.
 * These provide educational value and build trust.
 */
export const MICRO_INSIGHTS: MicroInsightConfig[] = [
  {
    questionId: "salesChannel",
    triggerAnswer: "Marketplace or platform",
    text: "Marketplace models require specialized \"Split Payment\" logic to handle sub-merchant payouts and compliance.",
  },
  {
    questionId: "monthlyVolume",
    triggerAnswer: "£50k+",
    text: "At this volume, you qualify for Interchange++ pricing, which is significantly cheaper than standard flat rates.",
  },
  {
    questionId: "avgTransaction",
    triggerAnswer: "£500+",
    text: "High ticket sizes often trigger manual fraud reviews. We'll look for providers with advanced pre-authorization tools.",
  },
  {
    questionId: "priorities",
    triggerAnswer: "Lower fees",
    text: "The \"Headline Rate\" is a trap. We focus on your Effective Rate—the true cost after all hidden fees are included.",
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
  {
    questionId: "location",
    triggerAnswer: "UK & EU",
    text: "Cross-border payments can carry heavy surcharges. We'll prioritize providers with local acquiring in both regions.",
  },
  {
    questionId: "deliveryTimeline",
    triggerAnswer: "More than 30 days",
    text: "Long delivery timelines increase 'Future Delivery Risk.' We'll match you with providers who can manage this without freezing your funds.",
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
