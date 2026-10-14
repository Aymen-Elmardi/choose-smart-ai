# Deploy log

One entry per production deploy, in the format from Section 0.5 rule 8 of the fix list.

## Deploy 1 (merged 2026-10-14)

DEPLOY 1 | 2026-10-14 | commit 876ce99
URLs to request indexing (full https URLs, one per line):
None. Every change in this deploy is invisible (GA4 listener, data attributes, hidden form fields, email notification).
What changed: GA4 events cta_click, calendar_click, contact_submit; landing page and previous page on /contact leads; on-page baseline and QA report.
Next deploy not before: 2026-10-15 (1 to 2 days later).

Post-deploy checks (2026-10-14): production workflow passed; all 125 sitemap URLs return 200 with title, meta, H1, canonical and word count identical to work/baseline-onpage.csv; robots.txt and sitemap unchanged; no noindex; cta_click / calendar_click verified on the live Stripe fees page (events intercepted, not sent). send-contact-email already deployed on 2026-10-14 (version 13).

Owner actions after merge:
- Run `supabase functions deploy send-contact-email` so the notification email shows the landing page.
- Send one test contact form and check GA4 DebugView and the email.

## Deploy 2 (prepared 2026-10-07, not yet merged)

DEPLOY 2 | merged: pending | commit: pending (fill in the merge commit after merge)
URLs to request indexing (full https URLs, one per line):
https://chosepayments.com/insights/crisis/hidden-fee-crisis
https://chosepayments.com/authors/aymen-elmardi
https://chosepayments.com/authors/madalsa-bhat
What changed:
- /insights/crisis/hidden-fee-crisis: new meta description and og:description (T03).
- /authors/aymen-elmardi: new profile page with Person schema (T05).
- /authors/madalsa-bhat: new profile page with Person schema (T05).
Next deploy not before: 1 to 2 days after the merge date.
