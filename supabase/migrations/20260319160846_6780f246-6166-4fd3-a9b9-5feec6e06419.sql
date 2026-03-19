
CREATE TABLE public.popup_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  popup_type text NOT NULL,
  question text NOT NULL,
  email text NOT NULL,
  page_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.popup_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON public.popup_submissions
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);
