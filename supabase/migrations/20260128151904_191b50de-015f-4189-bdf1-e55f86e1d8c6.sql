-- Fix: Remove overly permissive DELETE policy
-- The table will become append-only for security
-- "Unlike" will be handled by adding a record with a different action type

-- Drop the problematic DELETE policy
DROP POLICY IF EXISTS "Visitors can unlike their own" ON public.article_engagement;

-- Add a unique constraint to prevent duplicate likes (same visitor, article, action)
-- This allows the app to toggle likes by checking if record exists
CREATE UNIQUE INDEX IF NOT EXISTS unique_engagement_per_visitor 
ON public.article_engagement (article_slug, visitor_id, action_type);