# Deploy log

## Merges (Section 5)

Gated merges, each shipped on its own from main after the owner's "GO M<id>".

### M5a (merged 2026-10-20)

DEPLOY M5a | 2026-10-20 | commit 60906ee
URLs to request indexing (full https URLs, one per line):
https://chosepayments.com/insights/source-of-funds
Redirects added (301):
https://chosepayments.com/insights/why-payment-providers-ask-for-source-of-funds -> https://chosepayments.com/insights/source-of-funds
What changed:
- /insights/source-of-funds: 7 sections folded in from the old page (H1, title, meta and existing copy unchanged).
- /insights/visa-mastercard-control-card-payments, /insights, /insights/guides, /insights/graph: link or list entry for the old URL updated or removed (not worth an indexing request).
Next deploy not before: 2026-10-21 (1 to 2 days later).
Post-deploy checks (2026-10-20): first production run failed on a transient next/font Google Fonts fetch; re-run passed. Old URL 301 -> target in one hop (also with trailing slash, .html, query string, www); target 200, self canonical, no noindex, new sections live; sitemap 124 URLs without the old one; every other sitemap URL unchanged vs work/baseline-onpage.csv apart from the three list pages.
Watch for 14 days: /insights/source-of-funds clicks and position vs work/baseline-onpage.csv and the GSC baseline; propose a revert if clicks fall more than 25% with stable impressions.

### M1 revised (prepared 2026-10-20, not yet merged)

Owner update 2026-10-20: M1a cancelled (page kept, "UK" removed from its title and copy); M1b changed from a merge to a deletion with a 301.

DEPLOY M1-revised | merged: pending | commit: pending (fill in the merge commit after merge)
URLs to request indexing (full https URLs, one per line):
https://chosepayments.com/insights/crisis/stripe-account-frozen
https://chosepayments.com/insights/why-stripe-freezes-accounts-uk
Redirects added (301):
https://chosepayments.com/insights/why-payment-accounts-get-frozen-without-warning -> https://chosepayments.com/insights/crisis/stripe-account-frozen
What changed:
- /insights/why-payment-accounts-get-frozen-without-warning: page deleted; 301 to the target; removed from the sitemap; internal links repointed (M1b revised).
- /insights/crisis/stripe-account-frozen: redirect target; page itself unchanged.
- /insights/why-stripe-freezes-accounts-uk: "UK" removed from the H1, schema headline, breadcrumb, first paragraph, FAQ question, schema description, one link anchor and the keyword list; URL and <title> unchanged (M1a cancelled).
- /faq: "In the UK" removed from the Stripe-freezes answer preview (owner request, 2026-10-20).
- Related-article cards and lists on about 20 other pages: new Stripe-freezes title, deleted article no longer shown (not worth an indexing request).
Next deploy not before: 1 to 2 days after the previous production deploy.
Watch for 14 days: /insights/crisis/stripe-account-frozen and /insights/why-stripe-freezes-accounts-uk clicks, CTR and position (the H1 change is a title change; revert if CTR drops more than 25% with stable impressions).

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
