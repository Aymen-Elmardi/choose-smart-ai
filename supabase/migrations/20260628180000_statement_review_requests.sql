-- Abuse-prevention / cost-control log for the statement-review analyser.
-- Every analyser request (successful, blocked, or alert marker) is recorded here
-- so the analyze-statement Edge Function can enforce persistent rate limits and a
-- global daily spend cap across cold starts and isolates.
--
-- Locked down: RLS is ON and there are NO anon/authenticated policies, so the
-- table is only reachable by the service role (used by the Edge Function).

CREATE TABLE IF NOT EXISTS public.statement_review_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  ip text,
  email text,
  origin text,
  user_agent text,
  file_name text,
  file_type text,
  status text NOT NULL,              -- 'ok' | 'blocked_origin' | 'blocked_bot' | 'blocked_burst' | 'blocked_ip' | 'blocked_email' | 'blocked_global' | 'alert'
  flagged boolean NOT NULL DEFAULT false,
  flag_reason text,
  effective_rate numeric,
  verdict text
);

ALTER TABLE public.statement_review_requests ENABLE ROW LEVEL SECURITY;

-- Indexes supporting the rate-limit count queries.
CREATE INDEX IF NOT EXISTS idx_srr_status_created ON public.statement_review_requests (status, created_at);
CREATE INDEX IF NOT EXISTS idx_srr_ip_created     ON public.statement_review_requests (ip, created_at);
CREATE INDEX IF NOT EXISTS idx_srr_email_created  ON public.statement_review_requests (email, created_at);
