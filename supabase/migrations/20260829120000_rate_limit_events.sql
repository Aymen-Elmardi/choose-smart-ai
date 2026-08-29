-- Shared, durable rate-limit ledger for the public edge functions.
--
-- The functions previously counted requests in a module-level Map. Edge
-- functions are ephemeral and horizontally scaled, so that counter resets on
-- every cold start and is not shared between concurrent isolates: the effective
-- limit was (configured max x however many isolates happened to be warm), which
-- is not a limit. Two of the affected functions send email on an unauthenticated,
-- wildcard-CORS endpoint.
--
-- analyze-statement already solved this against statement_review_requests. This
-- table generalises that approach so every function can share one ledger.

CREATE TABLE IF NOT EXISTS public.rate_limit_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  fn text NOT NULL,                  -- edge function name, e.g. 'send-contact-email'
  ip text,
  email text,
  outcome text NOT NULL              -- 'ok' | 'blocked_ip' | 'blocked_email' | 'blocked_global' | 'blocked_origin'
);

-- The limiter only ever counts rows inside a time window, scoped by function and
-- then by ip, by email, or not at all. One index per access path.
CREATE INDEX IF NOT EXISTS idx_rle_fn_ip_created    ON public.rate_limit_events (fn, ip, created_at);
CREATE INDEX IF NOT EXISTS idx_rle_fn_email_created ON public.rate_limit_events (fn, email, created_at);
CREATE INDEX IF NOT EXISTS idx_rle_fn_created       ON public.rate_limit_events (fn, created_at);

ALTER TABLE public.rate_limit_events ENABLE ROW LEVEL SECURITY;

-- No policies are defined on purpose. RLS with no policy denies every request
-- from anon and authenticated; the edge functions reach this table with the
-- service role key, which bypasses RLS. The rows contain IP addresses and email
-- addresses, so nothing client-side should ever be able to read them.

COMMENT ON TABLE public.rate_limit_events IS
  'Durable rate-limit ledger for edge functions. Service-role access only. Prune rows older than a day or two; nothing reads further back than that.';
