-- Table to store article likes and share clicks
CREATE TABLE public.article_engagement (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_slug TEXT NOT NULL,
  action_type TEXT NOT NULL CHECK (action_type IN ('like', 'share_twitter', 'share_linkedin', 'share_facebook')),
  visitor_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast count queries
CREATE INDEX idx_engagement_slug_action ON public.article_engagement(article_slug, action_type);

-- Prevent duplicate likes from same visitor
CREATE UNIQUE INDEX idx_unique_like ON public.article_engagement(article_slug, visitor_id) WHERE action_type = 'like';

-- Enable RLS
ALTER TABLE public.article_engagement ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for recording engagement)
CREATE POLICY "Anyone can record engagement"
ON public.article_engagement
FOR INSERT
WITH CHECK (true);

-- Allow anyone to read engagement counts (for displaying like counts)
CREATE POLICY "Anyone can view engagement"
ON public.article_engagement
FOR SELECT
USING (true);

-- Allow visitors to delete their own likes (for unlike functionality)
CREATE POLICY "Visitors can unlike their own"
ON public.article_engagement
FOR DELETE
USING (true);