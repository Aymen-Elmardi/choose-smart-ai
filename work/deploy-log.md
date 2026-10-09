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

## Deploy 4 (prepared 2026-10-07, not yet merged)

DEPLOY 4 | merged: pending | commit: pending (fill in the merge commit after merge)
URLs to request indexing (full https URLs, one per line):
https://chosepayments.com/mcc-5812-payment-gateway-uk
https://chosepayments.com/best-acquirers-food-delivery
https://chosepayments.com/best-payment-processors-high-chargebacks
https://chosepayments.com/payment-processors-high-risk-ecommerce
https://chosepayments.com/payment-provider-subscription-business
What changed:
- /mcc-5812-payment-gateway-uk: CTAs unified to Write to us / Book a call; /assessment link removed (T01).
- /best-acquirers-food-delivery: CTAs unified to Write to us / Book a call; /assessment link removed (T01).
- /best-payment-processors-high-chargebacks: CTAs unified to Write to us / Book a call; /assessment link removed (T01).
- /payment-processors-high-risk-ecommerce: CTAs unified to Write to us / Book a call; /assessment link removed (T01).
- /payment-provider-subscription-business: CTAs unified to Write to us / Book a call; /assessment link removed (T01).
Next deploy not before: 1 to 2 days after the merge date.

## Deploy 5 (prepared 2026-10-07, not yet merged)

DEPLOY 5 | merged: pending | commit: pending (fill in the merge commit after merge)
URLs to request indexing (full https URLs, one per line):
https://chosepayments.com/insights/adyen-enterprise-payments-platform
https://chosepayments.com/insights/stripe-payment-platform
https://chosepayments.com/insights/checkout-com-enterprise-platform
https://chosepayments.com/insights/fiserv-payments-platform
https://chosepayments.com/insights/paypal-payment-platform
What changed:
- /insights/adyen-enterprise-payments-platform: assessment CTAs replaced with Write to us / Book a call (T01); og:title matches title (T03).
- /insights/stripe-payment-platform: assessment CTAs replaced with Write to us / Book a call (T01).
- /insights/checkout-com-enterprise-platform: assessment CTAs replaced with Write to us / Book a call (T01); og:title matches title (T03).
- /insights/fiserv-payments-platform: CTAs unified, /assessment links removed (T01); og:title matches title (T03).
- /insights/paypal-payment-platform: CTAs unified, /assessment links removed (T01).
Next deploy not before: 1 to 2 days after the merge date.
/insights/adyen-vs-first-data moved to the next batch (5-page limit).

## Deploy 6a (prepared 2026-10-07, not yet merged)

DEPLOY 6a | merged: pending | commit: pending (fill in the merge commit after merge)
URLs to request indexing (full https URLs, one per line):
https://chosepayments.com/insights/adyen-vs-first-data
https://chosepayments.com/insights/stripe-vs-adyen
https://chosepayments.com/insights/what-is-a-payment-processor
https://chosepayments.com/insights/third-party-payment-processors
https://chosepayments.com/insights/best-payment-processor-ecommerce
What changed:
- /insights/adyen-vs-first-data: CTAs unified to Write to us / Book a call; /assessment links removed (T01).
- /insights/stripe-vs-adyen: closing "free processor match" CTA replaced with Write to us / Book a call (T01). Content untouched (ranking page).
- /insights/what-is-a-payment-processor: CTAs unified; /assessment links removed (T01).
- /insights/third-party-payment-processors: CTAs unified; /assessment links removed (T01).
- /insights/best-payment-processor-ecommerce: CTAs unified; /assessment links removed (T01).
Next deploy not before: 1 to 2 days after the merge date.

## Deploy 6b (prepared 2026-10-07, not yet merged)

DEPLOY 6b | merged: pending | commit: pending (fill in the merge commit after merge)
URLs to request indexing (full https URLs, one per line):
https://chosepayments.com/payment-gateway-vs-payment-processor
https://chosepayments.com/ach-payment-processors
https://chosepayments.com/insights/payment-scheme-rules-explained
What changed:
- /payment-gateway-vs-payment-processor: CTAs unified to Write to us / Book a call; /assessment links removed (T01).
- /ach-payment-processors: CTAs unified to Write to us / Book a call; /assessment links removed (T01).
- /insights/payment-scheme-rules-explained: "Apply for Advisory" (/recommendation) and /assessment CTAs replaced with Write to us / Book a call (T01).
Next deploy not before: 1 to 2 days after the merge date.

## Deploy 7 (prepared 2026-10-08, not yet merged)

DEPLOY 7 | merged: pending | commit: pending (fill in the merge commit after merge)
URLs to request indexing (full https URLs, one per line):
https://chosepayments.com/marketplace-payment-provider
https://chosepayments.com/best-payment-provider-small-business
https://chosepayments.com/switch-payment-provider
https://chosepayments.com/best-payment-api-uk
https://chosepayments.com/stripe-vs-square-vs-paypal-uk
https://chosepayments.com/authors/aymen-elmardi
https://chosepayments.com/authors/madalsa-bhat
What changed:
- /marketplace-payment-provider: byline "Aymen Elmardi, Payments Expert", Published/Last updated dates, Article JSON-LD with Person author (T05, T06).
- /best-payment-provider-small-business: byline "Madalsa Bhat, Growth Expert", Published date, Article JSON-LD (T05, T06).
- /switch-payment-provider: byline "Madalsa Bhat, Growth Expert", Published date, Article JSON-LD (T05, T06).
- /best-payment-api-uk: byline "Madalsa Bhat, Growth Expert", Published/Last updated dates, Article JSON-LD (T05, T06).
- /stripe-vs-square-vs-paypal-uk: byline "Madalsa Bhat, Growth Expert", Published/Last updated dates, Article JSON-LD (T05, T06).
- /authors/aymen-elmardi: article list +1.
- /authors/madalsa-bhat: article list +4.
Next deploy not before: 1 to 2 days after the merge date.

## Deploy 8a (prepared 2026-10-08, not yet merged)

DEPLOY 8a | merged: pending | commit: pending (fill in the merge commit after merge)
URLs to request indexing (full https URLs, one per line):
https://chosepayments.com/ach-payment-processors
https://chosepayments.com/insights/third-party-payment-processors
https://chosepayments.com/insights/digital-product-chargebacks-refunds-payment-processor
https://chosepayments.com/insights/payment-acronyms-explained
https://chosepayments.com/insights/wallet-payments-guaranteed-success
What changed:
- /ach-payment-processors: wrong Same Day ACH limit history replaced (T11.1).
- /insights/third-party-payment-processors: Square in-person rate corrected to 2.6% + $0.15 (Free plan) (T11.2).
- /insights/digital-product-chargebacks-refunds-payment-processor: example phone number labelled "1-800-000-0000 (example)" (T11.3).
- /insights/payment-acronyms-explained: fake "LTV Exemption" entry removed; rolling reserve duration now 90 to 180 days (T11.4).
- /insights/wallet-payments-guaranteed-success: H1 no longer claims a 100% success rate (T11.5, interim).
Next deploy not before: 1 to 2 days after the merge date.

## Deploy 8b (prepared 2026-10-08, not yet merged)

DEPLOY 8b | merged: pending | commit: pending (fill in the merge commit after merge)
URLs to request indexing (full https URLs, one per line):
https://chosepayments.com/insights/ecommerce/chargeback-thresholds-high-risk-processors
https://chosepayments.com/insights/payment-processor-business-vertical-classification
https://chosepayments.com/best-payment-processor-uk
https://chosepayments.com/insights/stripe-payment-platform
https://chosepayments.com/
What changed:
- /insights/ecommerce/chargeback-thresholds-high-risk-processors: visible note that the table shows legacy Visa programmes (T11.6).
- /insights/payment-processor-business-vertical-classification: unsourced "Visa/MC Risk Tier" column hidden (T11.7).
- /best-payment-processor-uk: "We're paid by providers" line removed (D1, owner).
- /insights/stripe-payment-platform: FAQ answer points to Write to us instead of the assessment (owner).
- /: commission FAQ "How does ChosePayments make money?" removed (D1, owner).
- Every page: footer now reads "Independent Payment Advisory – US, UK & EU" (D1, owner). Not listed per page; no indexing request needed for a footer label.
Next deploy not before: 1 to 2 days after the merge date.

## Deploy 9a (prepared 2026-10-09, not yet merged)

DEPLOY 9a | merged: pending | commit: pending (fill in the merge commit after merge)
URLs to request indexing (full https URLs, one per line):
https://chosepayments.com/insights/pricing-models/interchange-plus-plus
https://chosepayments.com/insights/crisis/stripe-account-frozen
https://chosepayments.com/insights/hidden-payment-processor-fees
https://chosepayments.com/insights/ecommerce/subscription-revenue-recurring-billing
What changed:
- /insights/pricing-models/interchange-plus-plus: "Blended Pricing" now links to /insights/pricing-models/blended-vs-interchange (T10).
- /insights/crisis/stripe-account-frozen: "rolling reserve" now links to /insights/rolling-vs-fixed-reserve (T10).
- /insights/hidden-payment-processor-fees: one sentence + link to /statement-review (Section 4).
- /insights/ecommerce/subscription-revenue-recurring-billing: one sentence + link to the digital-product chargebacks guide (Section 4).
Next deploy not before: 1 to 2 days after the merge date.

## Deploy 9b (prepared 2026-10-09, not yet merged)

DEPLOY 9b | merged: pending | commit: pending (fill in the merge commit after merge)
URLs to request indexing (full https URLs, one per line):
https://chosepayments.com/insights/adyen-pricing-explained
https://chosepayments.com/insights/checkout-com-fees-explained
What changed:
- /insights/adyen-pricing-explained: one sentence + link to /insights/stripe-vs-adyen (Section 4). Ranking page, additive only.
- /insights/checkout-com-fees-explained: one clause + link to /insights/comparisons/stripe-vs-checkout-com (Section 4). Ranking page, additive only.
Next deploy not before: 1 to 2 days after the merge date. Deploy 12 (title test 1) is on /insights/checkout-com-fees-explained: leave at least a few days after this merge so the two changes can be told apart in GSC.
