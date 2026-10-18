import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import {
  corsHeaders as sharedCorsHeaders,
  jsonResponse as sharedJsonResponse,
  successResponse as sharedSuccessResponse,
  errorResponse as sharedErrorResponse,
} from "../_shared/cors.ts";
import { adminClient, checkRateLimit, getClientIp } from "../_shared/rateLimit.ts";
import { getRecommendations, validateQuizAnswers } from "../_shared/recommendationEngine.ts";

// ============================================================================
// HANDLER
// ============================================================================

const handler = async (req: Request): Promise<Response> => {
  const corsHeaders = sharedCorsHeaders(req);
  const jsonResponse = (data: unknown, status = 200) => sharedJsonResponse(req, data, status);
  const successResponse = (data: Record<string, unknown> = {}) => sharedSuccessResponse(req, data);
  const errorResponse = (error: string, status = 400) => sharedErrorResponse(req, error, status);

  console.log("Received request to quiz-recommendation");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIp = getClientIp(req);
  console.log(`Request from IP: ${clientIp}`);

  const limit = await checkRateLimit(adminClient(), { fn: "quiz-recommendation", perIp: 10, windowMinutes: 1 }, clientIp);
  if (!limit.allowed) {
    console.warn(`Rate limit exceeded for IP: ${clientIp}`);
    return errorResponse("Too many requests. Please try again later.", 429);
  }

  try {
    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      console.warn("Failed to parse JSON body");
      return errorResponse("Invalid JSON format", 400);
    }

    const answers = validateQuizAnswers(rawBody);
    if (!answers) {
      console.warn("Invalid quiz answers structure");
      return errorResponse("Invalid quiz data. Please ensure all required fields are provided.", 400);
    }
    
    console.log("Processing quiz answers");

    const startTime = performance.now();
    const result = getRecommendations(answers);
    const executionTimeMs = performance.now() - startTime;

    if (!result) {
      console.warn("No suitable providers found for answers");
      return errorResponse("We couldn't find a suitable provider for your specific requirements. Please contact us for personalized assistance.", 404);
    }

    console.log("Recommendation result:", result.bestMatch.name, `(${executionTimeMs.toFixed(2)}ms)`);
    return successResponse({ recommendation: result, executionTimeMs });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in quiz-recommendation function:", error);
    return errorResponse(errorMessage, 500);
  }
};

serve(handler);
