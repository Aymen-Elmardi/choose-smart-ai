-- Client-side error reports.
--
-- The site is a static export: there is no server in the request path, so the
-- browser is the only place a runtime failure is visible, and nothing was
-- reporting it. AppErrorBoundary catches a crash, calls console.error, and the
-- page goes blank for that visitor with no signal to anyone. You would find out
-- from a traffic drop weeks later.

CREATE TABLE IF NOT EXISTS public.error_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  kind text NOT NULL,                -- 'boundary' | 'unhandled_rejection' | 'window_error'
  message text NOT NULL,
  stack text,
  url text,                          -- pathname + search only, never a full href with fragments
  user_agent text,
  release text,                      -- build time, so a spike can be tied to a deploy
  ip text
);

-- Reads are "what broke recently", optionally narrowed to one kind.
CREATE INDEX IF NOT EXISTS idx_error_events_created      ON public.error_events (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_error_events_kind_created ON public.error_events (kind, created_at DESC);

ALTER TABLE public.error_events ENABLE ROW LEVEL SECURITY;

-- No policies, deliberately: RLS with none denies anon and authenticated
-- outright. Only the service role, used by the report-error edge function,
-- reaches this table. Stack traces and user agents should not be readable from
-- the client that produced them.

COMMENT ON TABLE public.error_events IS
  'Client-side error reports from the browser. Service-role access only. Prune periodically; nothing reads far back.';
