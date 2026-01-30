-- ============================================================================
-- Security Enhancement for article_engagement table
-- Remove public INSERT access and restrict SELECT to aggregated counts
-- ============================================================================

-- Drop existing permissive policies
DROP POLICY IF EXISTS "Anyone can record engagement" ON public.article_engagement;
DROP POLICY IF EXISTS "Anyone can view engagement" ON public.article_engagement;

-- Create restricted SELECT policy: visitors can only see their own engagement records
-- This allows the client to check if they've already liked an article
CREATE POLICY "Visitors can view own engagement"
ON public.article_engagement
FOR SELECT
USING (visitor_id = current_setting('request.headers', true)::json->>'x-visitor-id');

-- Create a view for public engagement counts (aggregated only, no PII)
CREATE OR REPLACE VIEW public.article_engagement_counts AS
SELECT 
  article_slug,
  action_type,
  COUNT(*)::integer as count
FROM public.article_engagement
GROUP BY article_slug, action_type;

-- Grant SELECT on the view to anonymous users
GRANT SELECT ON public.article_engagement_counts TO anon;
GRANT SELECT ON public.article_engagement_counts TO authenticated;

-- Add check constraints for data validation
ALTER TABLE public.article_engagement
ADD CONSTRAINT valid_visitor_id_format 
CHECK (visitor_id ~ '^v_[0-9]+_[a-z0-9]{9}$');

ALTER TABLE public.article_engagement
ADD CONSTRAINT valid_article_slug_length 
CHECK (length(article_slug) > 3 AND length(article_slug) < 200);

ALTER TABLE public.article_engagement
ADD CONSTRAINT valid_action_type 
CHECK (action_type IN ('like', 'share_twitter', 'share_linkedin', 'share_facebook'));