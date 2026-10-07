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
