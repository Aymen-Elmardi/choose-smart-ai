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
 */
export const useArticleEngagement = (articleSlug: string) => {
  const visitorId = useVisitorId();
  const [state, setState] = useState<EngagementState>({
    likeCount: 0,
    isLiked: false,
    isLoading: true,
  });

  // Fetch initial state
  useEffect(() => {
    if (!visitorId || !articleSlug) return;

    const fetchEngagement = async () => {
      try {
        // Get like count
        const { count } = await supabase
          .from("article_engagement")
          .select("*", { count: "exact", head: true })
          .eq("article_slug", articleSlug)
          .eq("action_type", "like");

        // Check if current visitor has liked
        const { data: existingLike } = await supabase
          .from("article_engagement")
          .select("id")
          .eq("article_slug", articleSlug)
          .eq("visitor_id", visitorId)
          .eq("action_type", "like")
          .maybeSingle();

        setState({
          likeCount: count || 0,
          isLiked: !!existingLike,
          isLoading: false,
        });
      } catch (error) {
        console.error("Error fetching engagement:", error);
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    fetchEngagement();
  }, [articleSlug, visitorId]);

  // Toggle like
  const toggleLike = useCallback(async () => {
    if (!visitorId || !articleSlug) return;

    const wasLiked = state.isLiked;

    // Optimistic update
    setState((prev) => ({
      ...prev,
      isLiked: !wasLiked,
      likeCount: wasLiked ? prev.likeCount - 1 : prev.likeCount + 1,
    }));

    try {
      if (wasLiked) {
        // Remove like
        await supabase
          .from("article_engagement")
          .delete()
          .eq("article_slug", articleSlug)
          .eq("visitor_id", visitorId)
          .eq("action_type", "like");
      } else {
        // Add like
        await supabase.from("article_engagement").insert({
          article_slug: articleSlug,
          visitor_id: visitorId,
          action_type: "like",
        });
      }
    } catch (error) {
      // Revert on error
      console.error("Error toggling like:", error);
      setState((prev) => ({
        ...prev,
        isLiked: wasLiked,
        likeCount: wasLiked ? prev.likeCount + 1 : prev.likeCount - 1,
      }));
    }
  }, [articleSlug, visitorId, state.isLiked]);

  // Record share click
  const recordShare = useCallback(
    async (platform: "twitter" | "linkedin" | "facebook") => {
      if (!visitorId || !articleSlug) return;

      const actionType: ActionType = `share_${platform}` as ActionType;

      try {
        await supabase.from("article_engagement").insert({
          article_slug: articleSlug,
          visitor_id: visitorId,
          action_type: actionType,
        });
      } catch (error) {
        // Silent fail for share tracking - don't block the share action
        console.error("Error recording share:", error);
      }
    },
    [articleSlug, visitorId]
  );

  return {
    ...state,
    toggleLike,
    recordShare,
  };
};
