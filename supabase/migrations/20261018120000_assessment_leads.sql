-- Leads captured at the end of the risk assessment, with the recommendation
-- they were emailed.
--
-- The recommendation is now calculated by submit-assessment after the visitor
-- gives a name and email, and is never sent to the browser. Until now an
-- assessment lead existed only as the internal email to hello@; this table keeps
-- a durable record of who asked, what they answered and what we recommended.

CREATE TABLE IF NOT EXISTS public.assessment_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  email text NOT NULL,
  market text,                      -- 'UK' | 'US'
  segment text,                     -- derived quiz segment, e.g. 'self-hosted'
  recommended_provider text,        -- null when the engine found no match
  answers jsonb NOT NULL,           -- raw quiz answers as submitted
  recommendation jsonb,             -- full engine output: bestMatch, acceptable, avoid, risk indicators
  results_email_status text NOT NULL DEFAULT 'pending',  -- 'pending' | 'sent' | 'failed'
  lead_email_status text NOT NULL DEFAULT 'pending',     -- 'pending' | 'sent' | 'failed'
  ip text
);

CREATE INDEX IF NOT EXISTS idx_assessment_leads_created ON public.assessment_leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_assessment_leads_email   ON public.assessment_leads (email);

ALTER TABLE public.assessment_leads ENABLE ROW LEVEL SECURITY;

-- No policies are defined on purpose, as with rate_limit_events. RLS with no
-- policy denies anon and authenticated; submit-assessment writes with the
-- service role key, which bypasses RLS. Rows hold names, email addresses and IPs.

COMMENT ON TABLE public.assessment_leads IS
  'Risk assessment leads and the recommendation emailed to each. Written by submit-assessment. Service-role access only.';
