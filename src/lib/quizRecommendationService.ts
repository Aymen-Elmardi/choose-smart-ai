// Client-side service for calling the server-side quiz recommendation engine
import { supabase } from "@/integrations/supabase/client";
import type { QuizAnswers, Provider } from "./recommendationLogic";

interface ServerRecommendation {
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

interface RecommendationResponse {
  success: boolean;
  recommendation?: ServerRecommendation;
  error?: string;
  executionTimeMs?: number;
}

/**
 * Fetches recommendations from the server-side decision engine
 * Returns the primary recommendation as a Provider for backward compatibility
 * Also returns alternatives if available
 */
export const fetchServerRecommendation = async (
  answers: QuizAnswers
): Promise<{
  primary: Provider | null;
  alternatives: Provider[];
  fromServer: boolean;
}> => {
  try {
    const { data, error } = await supabase.functions.invoke<RecommendationResponse>(
      "quiz-recommendation",
      {
        body: {
          salesChannel: answers.salesChannel,
          businessType: answers.businessType,
          priorities: answers.priorities,
          location: answers.location,
          monthlyVolume: answers.monthlyVolume,
          avgTransaction: answers.avgTransaction,
          features: answers.features,
        },
      }
    );

    if (error) {
      console.error("Server recommendation error:", error);
      return { primary: null, alternatives: [], fromServer: false };
    }

    if (!data?.success || !data.recommendation) {
      console.warn("No server recommendation available");
      return { primary: null, alternatives: [], fromServer: true };
    }

    const { recommendation } = data;

    // Convert server response to Provider format for backward compatibility
    const primary: Provider = {
      name: recommendation.primary.name,
      description: recommendation.primary.description,
      reasons: recommendation.primary.reasons,
    };

    const alternatives: Provider[] = recommendation.alternatives.map((alt) => ({
      name: alt.name,
      description: alt.description,
      reasons: alt.reasons,
    }));

    console.log(`Server recommendation received in ${data.executionTimeMs?.toFixed(2)}ms`);

    return { primary, alternatives, fromServer: true };
  } catch (err) {
    console.error("Failed to fetch server recommendation:", err);
    return { primary: null, alternatives: [], fromServer: false };
  }
};
