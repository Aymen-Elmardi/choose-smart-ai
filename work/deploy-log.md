# Deploy log

One entry per production deploy, in the format from Section 0.5 rule 8 of the fix list.

## Deploy 1 (prepared 2026-10-07, not yet merged)

DEPLOY 1 | merged: pending | commit: pending (fill in the merge commit after merge)
URLs to request indexing (full https URLs, one per line):
None. Every change in this deploy is invisible (GA4 listener, data attributes, hidden form fields, email notification).
What changed: GA4 events cta_click, calendar_click, contact_submit; landing page and previous page on /contact leads; on-page baseline and QA report.
Next deploy not before: 1 to 2 days after the merge date.

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

## Deploy 3 (prepared 2026-10-07, not yet merged)

DEPLOY 3 | merged: pending | commit: pending (fill in the merge commit after merge)
URLs to request indexing (full https URLs, one per line):
https://chosepayments.com/marketplace-payment-provider
https://chosepayments.com/best-payment-provider-small-business
https://chosepayments.com/switch-payment-provider
https://chosepayments.com/best-payment-api-uk
https://chosepayments.com/stripe-vs-square-vs-paypal-uk
What changed:
- /marketplace-payment-provider: quiz CTAs replaced with Write to us / Book a call (T01); og:title matches title (T03).
- /best-payment-provider-small-business: quiz CTAs replaced with Write to us / Book a call (T01); og:title matches title (T03).
- /switch-payment-provider: quiz CTAs replaced with Write to us / Book a call (T01); og:title matches title (T03).
- /best-payment-api-uk: quiz CTAs replaced (T01); "paid by providers" line removed (D1); og:title matches title (T03).
- /stripe-vs-square-vs-paypal-uk: quiz CTA and "short assessment" link replaced (T01); og:title matches title (T03).
Next deploy not before: 1 to 2 days after the merge date.
