import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useVisitorId } from "./useVisitorId";

type ActionType = "like" | "share_twitter" | "share_linkedin" | "share_facebook";

interface EngagementState {
  likeCount: number;
  isLiked: boolean;
  isLoading: boolean;
}

/**
 * Hook for managing article likes and tracking share clicks.
 * Uses edge function for secure, rate-limited engagement recording.
 */
export const useArticleEngagement = (articleSlug: string) => {
  const visitorId = useVisitorId();
  const [state, setState] = useState<EngagementState>({
    likeCount: 0,
    isLiked: false,
    isLoading: true,
  });

  // Fetch initial state using the public view for counts and edge function for own status
  useEffect(() => {
    if (!visitorId || !articleSlug) return;

    const fetchEngagement = async () => {
      try {
        // Get aggregated like count from the public view (no PII exposure)
        const { data: countData, error: countError } = await supabase
          .from("article_engagement_counts")
          .select("count")
          .eq("article_slug", articleSlug)
          .eq("action_type", "like")
          .maybeSingle();

        if (countError) {
          console.error("Error fetching engagement count:", countError);
        }

        // Check if current visitor has liked by trying to fetch via edge function
        // We'll use localStorage as the source of truth for "isLiked" status
        // since the RLS policy now restricts direct table access
        const likedKey = `liked_${articleSlug}`;
        const hasLiked = localStorage.getItem(likedKey) === "true";

        setState({
          likeCount: countData?.count || 0,
          isLiked: hasLiked,
          isLoading: false,
        });
      } catch (error) {
        console.error("Error fetching engagement:", error);
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    fetchEngagement();
  }, [articleSlug, visitorId]);

  // Record engagement via secure edge function
  const recordEngagement = useCallback(
    async (actionType: ActionType): Promise<boolean> => {
      if (!visitorId || !articleSlug) return false;

      try {
        const { error } = await supabase.functions.invoke("record-engagement", {
          body: {
            article_slug: articleSlug,
            visitor_id: visitorId,
            action_type: actionType,
          },
        });

        if (error) {
          console.error("Error recording engagement:", error);
          return false;
        }

        return true;
      } catch (error) {
        console.error("Error recording engagement:", error);
        return false;
      }
    },
    [articleSlug, visitorId]
  );

  // Add like (likes are permanent for security - no delete allowed)
  const toggleLike = useCallback(async () => {
    if (!visitorId || !articleSlug) return;

    // If already liked, do nothing (likes are permanent)
    if (state.isLiked) return;

    // Optimistic update
    setState((prev) => ({
      ...prev,
      isLiked: true,
      likeCount: prev.likeCount + 1,
    }));

    // Store in localStorage for persistence
    const likedKey = `liked_${articleSlug}`;
    localStorage.setItem(likedKey, "true");

    const success = await recordEngagement("like");

    if (!success) {
      // Revert on error
      setState((prev) => ({
        ...prev,
        isLiked: false,
        likeCount: prev.likeCount - 1,
      }));
      localStorage.removeItem(likedKey);
    }
  }, [articleSlug, visitorId, state.isLiked, recordEngagement]);

  // Record share click
  const recordShare = useCallback(
    async (platform: "twitter" | "linkedin" | "facebook") => {
      const actionType: ActionType = `share_${platform}` as ActionType;
      // Fire and forget for share tracking - don't block the share action
      recordEngagement(actionType);
    },
    [recordEngagement]
  );

  return {
    ...state,
    toggleLike,
    recordShare,
  };
};
