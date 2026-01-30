import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ============================================================================
// SHARED UTILITIES (inlined for edge function bundling)
// ============================================================================

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const jsonResponse = (data: unknown, status: number = 200): Response => {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
};

const successResponse = (data: Record<string, unknown> = {}): Response => jsonResponse({ success: true, ...data }, 200);
const errorResponse = (error: string, status: number = 400): Response => jsonResponse({ success: false, error }, status);

const getClientIp = (req: Request): string => {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
};

// Rate limiting: 20 engagements per minute per IP (generous for legitimate users)
const rateLimitStore = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 20;

const checkIpRateLimit = (clientIp: string): boolean => {
  const now = Date.now();
  const record = rateLimitStore.get(clientIp);
  
  // Clean up old entries periodically
  if (rateLimitStore.size > 1000) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (now - value.timestamp > RATE_LIMIT_WINDOW_MS) rateLimitStore.delete(key);
    }
  }
  
  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(clientIp, { count: 1, timestamp: now });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX) return false;
  record.count++;
  return true;
};

// Validate visitor_id format: v_<timestamp>_<random9chars>
const isValidVisitorId = (id: string): boolean => {
  if (!id || typeof id !== "string") return false;
  // Pattern: v_<digits>_<9 alphanumeric chars>
  return /^v_\d+_[a-z0-9]{9}$/.test(id);
};

// Validate article_slug format: reasonable length, URL-safe characters
const isValidArticleSlug = (slug: string): boolean => {
  if (!slug || typeof slug !== "string") return false;
  if (slug.length < 3 || slug.length > 200) return false;
  // Only allow URL-safe characters
  return /^[a-z0-9\-_/]+$/i.test(slug);
};

// Validate action_type
const VALID_ACTION_TYPES = ["like", "share_twitter", "share_linkedin", "share_facebook"];
const isValidActionType = (type: string): boolean => {
  return VALID_ACTION_TYPES.includes(type);
};

// ============================================================================
// HANDLER
// ============================================================================

interface EngagementRequest {
  article_slug: string;
  visitor_id: string;
  action_type: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to record-engagement");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return errorResponse("Method not allowed", 405);
  }

  const clientIp = getClientIp(req);
  console.log(`Request from IP: ${clientIp}`);

  if (!checkIpRateLimit(clientIp)) {
    console.warn(`Rate limit exceeded for IP: ${clientIp}`);
    return errorResponse("Too many requests. Please try again later.", 429);
  }

  try {
    const rawData = await req.json();
    
    const data: EngagementRequest = {
      article_slug: rawData.article_slug || "",
      visitor_id: rawData.visitor_id || "",
      action_type: rawData.action_type || "",
    };

    // Validate visitor_id format
    if (!isValidVisitorId(data.visitor_id)) {
      console.warn(`Invalid visitor_id format: ${data.visitor_id}`);
      return errorResponse("Invalid visitor ID format", 400);
    }

    // Validate article_slug
    if (!isValidArticleSlug(data.article_slug)) {
      console.warn(`Invalid article_slug: ${data.article_slug}`);
      return errorResponse("Invalid article slug", 400);
    }

    // Validate action_type
    if (!isValidActionType(data.action_type)) {
      console.warn(`Invalid action_type: ${data.action_type}`);
      return errorResponse("Invalid action type", 400);
    }

    console.log(`Recording engagement: ${data.action_type} on ${data.article_slug}`);

    // Create Supabase client with service role to bypass RLS
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Use upsert to handle duplicates gracefully
    const { error } = await supabase.from("article_engagement").upsert(
      {
        article_slug: data.article_slug,
        visitor_id: data.visitor_id,
        action_type: data.action_type,
      },
      { onConflict: "article_slug,visitor_id,action_type" }
    );

    if (error) {
      console.error("Database error:", error);
      return errorResponse("Failed to record engagement", 500);
    }

    console.log("Engagement recorded successfully");
    return successResponse();
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in record-engagement function:", error);
    return errorResponse(errorMessage, 500);
  }
};

serve(handler);
