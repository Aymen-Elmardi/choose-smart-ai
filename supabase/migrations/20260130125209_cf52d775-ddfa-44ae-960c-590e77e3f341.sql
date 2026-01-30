-- Fix SECURITY DEFINER view issue by recreating with SECURITY INVOKER
DROP VIEW IF EXISTS public.article_engagement_counts;

CREATE VIEW public.article_engagement_counts 
WITH (security_invoker = true)
AS
SELECT 
  article_slug,
  action_type,
  COUNT(*)::integer as count
FROM public.article_engagement
GROUP BY article_slug, action_type;

-- Re-grant SELECT on the view to anonymous users
GRANT SELECT ON public.article_engagement_counts TO anon;
GRANT SELECT ON public.article_engagement_counts TO authenticated;