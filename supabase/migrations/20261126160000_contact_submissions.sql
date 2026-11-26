-- Contact form messages and footer newsletter signups.
--
-- Until now a contact form submission existed only as an email to hello@,
-- which did not reach the monitored inbox, so leads were lost with no copy
-- anywhere. send-contact-email now stores every submission here before it
-- sends any email, then records whether the notification went out.

CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  type text NOT NULL DEFAULT 'contact',   -- 'contact' | 'newsletter'
  name text NOT NULL,
  email text NOT NULL,
  business_name text,
  message text NOT NULL,
  landing_page text,
  previous_page text,
  notification_email_status text NOT NULL DEFAULT 'pending',  -- 'pending' | 'sent' | 'failed'
  notification_email_id text,             -- Resend id, to look the email up in the Resend dashboard
  ip text
);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_created ON public.contact_submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email   ON public.contact_submissions (email);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- No policies on purpose, as with assessment_leads: anon and authenticated are
-- denied; send-contact-email writes with the service role key. Rows hold
-- names, email addresses, messages and IPs.

COMMENT ON TABLE public.contact_submissions IS
  'Contact form messages and newsletter signups. Written by send-contact-email. Service-role access only.';
