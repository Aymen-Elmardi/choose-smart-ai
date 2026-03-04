// Client-side service for calling the server-side quiz recommendation engine
import { supabase } from "@/integrations/supabase/client";
import type { QuizAnswers, Provider } from "@/types/quiz";

interface EliminatedProvider {
  name: string;
  reason: string;
}

interface ServerRecommendation {
  bestMatch: {
    name: string;
    description: string;
    reasons: string[];
  };
  acceptable: {
    name: string;
    description: string;
    reasons: string[];
  }[];
  avoid: EliminatedProvider[];
  riskConfidence: "high" | "medium" | "low";
  reserveProbability: "low" | "moderate" | "elevated";
}

interface RecommendationResponse {
  success: boolean;
  recommendation?: ServerRecommendation;
  error?: string;
  executionTimeMs?: number;
}

/**
 * Fetches recommendations from the server-side decision engine
 * Returns tiered output: bestMatch, acceptable, avoid + risk indicators
 */
export const fetchServerRecommendation = async (
  answers: QuizAnswers
): Promise<{
  primary: Provider | null;
  alternatives: Provider[];
  avoid: EliminatedProvider[];
  riskConfidence: "high" | "medium" | "low";
  reserveProbability: "low" | "moderate" | "elevated";
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
      return { primary: null, alternatives: [], avoid: [], riskConfidence: "low", reserveProbability: "low", fromServer: false };
    }

    if (!data?.success || !data.recommendation) {
      console.warn("No server recommendation available");
      return { primary: null, alternatives: [], avoid: [], riskConfidence: "low", reserveProbability: "low", fromServer: true };
    }

    const { recommendation } = data;

    const primary: Provider = {
      name: recommendation.bestMatch.name,
      description: recommendation.bestMatch.description,
      reasons: recommendation.bestMatch.reasons,
    };

    const alternatives: Provider[] = recommendation.acceptable.map((alt) => ({
      name: alt.name,
      description: alt.description,
      reasons: alt.reasons,
    }));

    console.log(`Server recommendation received in ${data.executionTimeMs?.toFixed(2)}ms`);

    return {
      primary,
      alternatives,
      avoid: recommendation.avoid,
      riskConfidence: recommendation.riskConfidence,
      reserveProbability: recommendation.reserveProbability,
      fromServer: true,
    };
  } catch (err) {
    console.error("Failed to fetch server recommendation:", err);
    return { primary: null, alternatives: [], avoid: [], riskConfidence: "low", reserveProbability: "low", fromServer: false };
  }
};
