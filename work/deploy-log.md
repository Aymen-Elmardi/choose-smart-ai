# Deploy log

## New articles

### what-does-stripe-charge-us-businesses (prepared 2026-11-21)

DEPLOY new-article-stripe-fees-us | merged: pending | commit: pending (fill in the merge commit after merge)
URLs to request indexing (full https URLs, one per line):
https://chosepayments.com/insights/what-does-stripe-charge-us-businesses
https://chosepayments.com/insights
What changed:
- /insights/what-does-stripe-charge-us-businesses: new US article (owner brief), Article + FAQPage + Breadcrumb JSON-LD, six images (WebP made from the supplied PNGs), in the sitemap. The layout's auto assessment CTA box is off on this page (brief: no CTA boxes). "write to us" uses the tracked data-cta link.
- /insights lists it under Fees & Costs (insightsArticles). Not on the hand-picked /insights/fees hub. /insights/stripe-fees-explained (UK) untouched and not linked.
- Open: author url left out of the schema (no /authors pages exist); captions left out (no caption style on the site).
Published date: 2026-11-21 (go-live). Update PUBLISHED in src/views/insights/StripeFeesUS.tsx if it merges later.
Watch for 14 days: "stripe fees", "stripe pricing", "stripe international fees" queries moving to the new URL.

### funds-on-hold-rolling-reserve-payment-processor (prepared and merged 2026-11-20)

DEPLOY new-article-funds-on-hold | 2026-11-20 | commit f300943
URLs to request indexing (full https URLs, one per line):
https://chosepayments.com/insights/crisis/funds-on-hold-rolling-reserve-payment-processor
https://chosepayments.com/insights/crisis
https://chosepayments.com/faq
https://chosepayments.com/insights/marketplace-chicken-and-egg-problem
Redirects added (301):
https://chosepayments.com/insights/what-to-do-when-funds-held -> https://chosepayments.com/insights/crisis/funds-on-hold-rolling-reserve-payment-processor
What changed:
- /insights/crisis/funds-on-hold-rolling-reserve-payment-processor: new article (owner brief, rewrite of the funds held article), Article + FAQPage + Breadcrumb JSON-LD, four images, Stripe reserves page as a source, in the sitemap. The old page's source stays; worker.js does the 301.
- /insights/crisis lists the new article; the /faq "read more" link and the marketplace chicken-and-egg article link point to the new URL; insightsArticles, the crisis cluster list and app/sitemap.ts updated. The old URL is out of both sitemaps. The "Content powered by SearchFit.ai" footer is not on the page.
Published date: 2026-11-20 (go-live). Update PUBLISHED in src/views/insights/crisis/FundsOnHold.tsx if it merges later.
Watch for 14 days: the new URL replacing the old one in Search Console for "funds on hold" and "rolling reserve" queries.

### effective-rate-hidden-fees-credit-card-processing (prepared and merged 2026-11-20)

DEPLOY new-article-effective-rate | 2026-11-20 | commit a4c59a6
URLs to request indexing (full https URLs, one per line):
https://chosepayments.com/insights/crisis/effective-rate-hidden-fees-credit-card-processing
https://chosepayments.com/insights/crisis
Redirects added (301):
https://chosepayments.com/insights/crisis/hidden-fee-crisis -> https://chosepayments.com/insights/crisis/effective-rate-hidden-fees-credit-card-processing
What changed:
- /insights/crisis/effective-rate-hidden-fees-credit-card-processing: new article (owner brief, rewrite of the hidden fee crisis article), Article + FAQPage + Breadcrumb JSON-LD, four images, in the sitemap. The old page's source stays; worker.js does the 301.
- /insights/crisis and /merchant-account-problems lists, related-article data and app/sitemap.ts point to the new URL. The old URL is out of both sitemaps.
- The brief's "Real example" heading said 2.6%; its table, both images and the $3,600 figure use 2.70%, so the heading reads 2.7%. The "Content powered by SearchFit.ai" footer is not on the page.
- Not in this deploy (5-page limit; the 301 covers them meanwhile): body links to the old URL in fiserv-payments-platform, adyen-pricing-explained, pricing-models/interchange-plus-plus and crisis/stripe-account-frozen. Done in hidden-fee-links.
Published date: 2026-11-20 (go-live). Update PUBLISHED in src/views/insights/crisis/EffectiveRateHiddenFees.tsx if it merges later.
Watch for 14 days: the new URL replacing the old one in Search Console for "effective rate" and "hidden fees" queries.

### rejected-by-stripe-or-square-high-risk-merchant-account (prepared and merged 2026-11-04)

DEPLOY new-article-rejected-by-stripe-or-square | 2026-11-04 | commit 7198eaa
URLs to request indexing (full https URLs, one per line):
https://chosepayments.com/insights/crisis/rejected-by-stripe-or-square-high-risk-merchant-account
Redirects added (301):
https://chosepayments.com/insights/crisis/rejected-high-risk-strategy -> https://chosepayments.com/insights/crisis/rejected-by-stripe-or-square-high-risk-merchant-account
What changed:
- /insights/crisis/rejected-by-stripe-or-square-high-risk-merchant-account: new article (owner brief), Article + FAQPage + Breadcrumb JSON-LD, four images, in the sitemap. It replaces the old rejected-high-risk-strategy page (owner's choice, 2026-11-04). The old page's source stays; worker.js does the 301.
- Every internal link to the old page (/insights/crisis, high-risk e-commerce, provider risk models and Stripe frozen articles, related-article lists) now points to the new URL. The old URL is out of both sitemaps.
- Added one "Book a free 15-minute call" line at the end, since the meta description promises it. The brief's "Content powered by SearchFit.ai" footer is not on the page.
Published date: 2026-11-04 (go-live). Update PUBLISHED in src/views/insights/crisis/RejectedByStripeOrSquare.tsx if it merges later.
Watch for 14 days: the new URL replacing the old one in Search Console for "rejected by stripe or square" queries.

### interchange-plus-vs-blended-pricing (prepared and merged 2026-11-04)

DEPLOY new-article-interchange-plus-vs-blended | 2026-11-04 | commit a0cbb29
URLs to request indexing (full https URLs, one per line):
https://chosepayments.com/insights/pricing-models/interchange-plus-vs-blended-pricing
Redirects added (301):
https://chosepayments.com/insights/pricing-models/blended-vs-interchange -> https://chosepayments.com/insights/pricing-models/interchange-plus-vs-blended-pricing
What changed:
- /insights/pricing-models/interchange-plus-vs-blended-pricing: new article (owner brief), Article + FAQPage + Breadcrumb JSON-LD, hero, cost chart and decision flow images, in the sitemap. It replaces the old blended-vs-interchange page (owner's choice, 2026-11-04). The old page's source stays; worker.js does the 301.
- Every internal link to the old page (homepage latest insights, /insights/pricing-models, merchant account problems, Adyen, Fiserv and Square articles, related-article lists) now points to the new URL. The old URL is out of both sitemaps.
- Brief's VAMP wording ("2.2% today, tightening to 1.5% in April 2026") changed to the current 1.5%. The underwriting graphic says the same old wording, so it is not on the page.
Published date: 2026-11-04 (go-live). Update PUBLISHED in src/views/insights/pricing/InterchangePlusVsBlended.tsx if it merges later.
Watch for 14 days: the new URL replacing the old one in Search Console for "blended vs interchange" queries.

### high-risk-ecommerce-payment-processing (prepared and merged 2026-10-30)

DEPLOY new-article-high-risk-ecommerce-hub | 2026-10-30 | commit dd6b468
URLs to request indexing (full https URLs, one per line):
https://chosepayments.com/high-risk-ecommerce-payment-processing
What changed:
- /high-risk-ecommerce-payment-processing: new top-level hub (owner brief), Article + FAQPage JSON-LD in one @graph, rendered in the HTML, plus the usual Breadcrumb JSON-LD. Authors Aymen Elmardi and Madalsa Bhat. Cover image from the owner, in the sitemap. One CTA only (the risk analysis block); the layout's assessment CTA and advisory note are off.
- /insights and /insights/provider-fit: new listing card (not worth an indexing request).
Published date: 2026-10-30 (go-live). Update PUBLISHED in src/views/insights/HighRiskEcommercePaymentProcessing.tsx if it merges later.
No redirects yet. M2a (/payment-processors-high-risk-ecommerce), M2b (/best-payment-processors-high-chargebacks) and M2c (/insights/ecommerce/high-risk-to-high-growth) move here later, one at a time, after "GO M2a", "GO M2b" and "GO M2c", once this page is live and returns 200.

### stripe-alternatives (prepared and merged 2026-10-29)

DEPLOY new-article-stripe-alternatives | 2026-10-29 | commit 3dd0ea3
URLs to request indexing (full https URLs, one per line):
https://chosepayments.com/insights/stripe-alternatives
What changed:
- /insights/stripe-alternatives: new article (owner brief), Article + FAQPage + Breadcrumb JSON-LD, cover image, in the sitemap. Author Aymen Elmardi (owner's answer, 2026-10-29).
- /insights and /insights/fees: new listing card (not worth an indexing request).
Published date: 2026-10-29 (go-live). Update PUBLISHED in src/views/insights/StripeAlternativesGuide.tsx if it merges later.

### square-fees-explained (prepared and merged 2026-10-28)

DEPLOY new-article-square-fees | 2026-10-28 | commit e6e595d
URLs to request indexing (full https URLs, one per line):
https://chosepayments.com/insights/square-fees-explained
What changed:
- /insights/square-fees-explained: new article (owner brief), Article + FAQPage + Breadcrumb JSON-LD, cover image, in the sitemap.
- /insights and /insights/fees: new listing card (not worth an indexing request).
Owner asked for this and the small-business article to go live together on 2026-10-28.
Published date: 2026-10-28 (go-live).

### best-payment-processor-for-small-business (prepared 2026-10-27, merged 2026-10-28)

DEPLOY new-article-small-business | 2026-10-28 | commit 1a3dfbc
URLs to request indexing (full https URLs, one per line):
https://chosepayments.com/insights/best-payment-processor-for-small-business
What changed:
- /insights/best-payment-processor-for-small-business: new article (owner brief), Article + FAQPage + Breadcrumb JSON-LD, cover image, in the sitemap.
- /insights and /insights/provider-fit: new listing card (not worth an indexing request).
Owner asked for this and the Square fees article to go live together on 2026-10-28 (two deploys the same day).
Published date set to the go-live date, 2026-10-28.
Follow-up once it is live and indexed: merge M3 (/best-payment-provider-small-business -> this URL) after GO M3.

## Homepage

### Interchange++ worked example in dollars (prepared and merged 2026-11-20)

DEPLOY ipp-worked-example-usd | 2026-11-20 | commit 1d49aca
URLs to request indexing (full https URLs, one per line):
https://chosepayments.com/insights/pricing-models/interchange-plus-plus
What changed:
- "The Math of Transparency" box: "0.30% + £0.05" and "0.60% + £0.05" now use $0.05. Percentages unchanged (0.30% is the UK credit cap; US credit interchange is higher). UK and EEA sections unchanged.

### Interchange++ blended pricing example in US pricing (prepared and merged 2026-11-20)

DEPLOY ipp-us-example | 2026-11-20 | commit a648507
URLs to request indexing (full https URLs, one per line):
https://chosepayments.com/insights/pricing-models/interchange-plus-plus
What changed:
- The blended pricing example "(e.g., 1.75% + 20p)" now reads "(e.g., 2.9% + 30 cents)". The rest of the article (worked example in £, UK and EEA rate tables, FAQ) is still UK-focused and unchanged.

### Links to the old hidden fee crisis page (prepared and merged 2026-11-20)

DEPLOY hidden-fee-links | 2026-11-20 | commit 414f1b2
URLs to request indexing (full https URLs, one per line):
https://chosepayments.com/insights/adyen-pricing-explained
https://chosepayments.com/insights/fiserv-payments-platform
https://chosepayments.com/insights/pricing-models/interchange-plus-plus
https://chosepayments.com/insights/crisis/stripe-account-frozen
What changed:
- adyen-pricing-explained and fiserv-payments-platform: links to /insights/crisis/hidden-fee-crisis now go to /insights/crisis/effective-rate-hidden-fees-credit-card-processing (Fiserv's link text is the new article title).
- interchange-plus-plus: the "Blended Pricing" link now goes to /insights/pricing-models/interchange-plus-vs-blended-pricing.
- stripe-account-frozen: the "rolling reserve" link now goes to /insights/rolling-vs-fixed-reserve.

### Assessment time "about 30 seconds" in four articles (prepared and merged 2026-11-20)

DEPLOY assessment-time-articles | 2026-11-20 | commit ed20c44
URLs to request indexing (full https URLs, one per line):
https://chosepayments.com/insights/marketplace-payments-guide
https://chosepayments.com/insights/stripe-vs-adyen
https://chosepayments.com/insights/comparisons/stripe-vs-checkout-com
https://chosepayments.com/insights/comparisons/adyen-vs-trustcommerce
What changed:
- The free assessment is described as taking "about 30 seconds" instead of "about a minute", matching the assessment page.

### Chargebacks article: restrict risky payment methods (prepared and merged 2026-11-18)

DEPLOY chargebacks-woocommerce-link | 2026-11-18 | commit b201812
URLs to request indexing (full https URLs, one per line):
https://chosepayments.com/insights/chargebacks-what-they-are-and-how-to-avoid-them
What changed:
- "How to Reduce Chargebacks": new item "Restrict risky payment methods at checkout." after "Reduce fraud at checkout", with an outside link to Conditional Payments for WooCommerce (thedotstore.com), opening in a new tab.

### Assessment title tag and meta description (prepared and merged 2026-11-10)

DEPLOY assessment-meta | 2026-11-10 | commit 2db81c0
URLs to request indexing (full https URLs, one per line):
https://chosepayments.com/assessment
What changed:
- /assessment: title tag "Which Payment Providers Will Accept Your Business? | ChosePayments" and a meta description matching the new first-page intro. Open Graph text unchanged.

### Assessment first-page text (prepared and merged 2026-11-10)

DEPLOY assessment-intro-copy | 2026-11-10 | commit c0dceaf
URLs to request indexing (full https URLs, one per line):
https://chosepayments.com/assessment
What changed:
- /assessment: first-page headline "Find out which payment providers will actually accept your business." and intro "Answer five questions and get matched with providers suited to your business model, processing volume and requirements." Title tag, meta description, questions, logic and tracking unchanged.

### Footer, statement review text (prepared and merged 2026-11-01)

DEPLOY footer-statement-review | 2026-11-01 | commit b10af7d
URLs to request indexing (full https URLs, one per line):
https://chosepayments.com/statement-review
What changed:
- Site-wide footer: tagline "Independent payment advisory for US businesses" and newsletter "Get our payments notes" with the homepage body line, on every page with a footer (was homepage only). Includes /insights/stripe-fees-explained (template change).
- /statement-review: title tag and share title "See If You're Overpaying: Free Statement Review | ChosePayments"; "about a minute" now "about 30 seconds to upload"; dashes removed from its copy (owner's choice): rate range "X% to Y%", empty result values show "n/a".
- Organization schema logo unchanged: favicon.png is already the real logo at 512x512.

### Homepage rewrite, US focus (prepared and merged 2026-10-31)

DEPLOY homepage-rewrite | 2026-10-31 | commit 9711692
URLs to request indexing (full https URLs, one per line):
https://chosepayments.com/
https://chosepayments.com/assessment
What changed:
- /: new copy in every section (owner's homepage-rewrite-instructions.md), new "How to choose a payment processor" section, 8 new FAQs (FAQPage schema built from the same text), new title, description and OG text, Service JSON-LD. Footer tagline and newsletter text changed on the homepage only.
- /assessment: title tag, meta description, headline and intro line only.
- Site-wide: nav button "Risk analysis" renamed "Find my processor" (same href, desktop and mobile menu). Organization + WebSite JSON-LD in the root layout now uses the US wording (areaServed US). Invisible on the page, including /insights/stripe-fees-explained.
Note: the hero and How-it-works buttons were booking links and now go to /assessment, so homepage calendar_click counts will drop.

## Assessment

### 5-question US assessment (prepared and merged 2026-10-29)

DEPLOY short-us-assessment | 2026-10-29 | commit a7b2ca7 (submit-assessment v2 deployed first, the same day)
Order: deploy the Supabase function submit-assessment first (supabase functions deploy submit-assessment), then merge the site PR. The new function still accepts the old quiz's answers, so the live site keeps working in between.
No indexing request needed (/assessment and /recommendation are not ranking pages).
What changed:
- /assessment: 5 questions (how you take payments, business, industry, monthly volume in $, main problem). No location question: every assessment is US.
- /recommendation: optional "Who processes your payments now?" for the savings estimate.
- Engine: US coverage on Stripe, Stripe Connect, Square, PayPal, Braintree, Adyen, Checkout.com, Worldpay, Elavon, Airwallex, Recurly; Helcim and Stax added (risk appetite TODO(verify)); dollar volume bands; priorities and in-person detection fixed; the low-survivor fallback keeps the region filter.
- Emails: dollar savings (US rates from insights/stripe-alternatives), new answers in the profile and lead email, empty answers skipped. Deploy log also records 189bc10 (cookie banner wording) below.

## Site-wide

### Goji website visitors + cookie banner (prepared and merged 2026-10-29)

DEPLOY goji-visitors | 2026-10-29 | commit 3f3be89
Follow-up (owner, 2026-10-29): banner text made generic (no Gojiberry name) in PR #25, commit 189bc10; the privacy policy still names it.
No indexing request needed (no visible content change apart from the banner, footer link and privacy policy).
What changed:
- Every page: Goji snippet in <head> with its consent stub; Goji only starts after Accept (CookieConsent.tsx). Footer gains a Cookie settings link.
- /privacy: Gojiberry, Microsoft Clarity and Crisp listed; cookie section explains the banner. Last updated 2026-10-29.
GA4 and Clarity are not behind the banner.

## Seasonal

### Halloween 2026 logo (merged 2026-10-28)

DEPLOY halloween-logo | 2026-10-28 | commit 5f3e7ae (PR #21)
No indexing request needed (header logo and tab icons only, on every page).
Revert after 2026-10-31: set SEASONAL_LOGO to null in src/lib/brand.ts.

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

### M5b (GO M5b pre-approved for 2026-10-21; prepared and merged 2026-10-21)

DEPLOY M5b | merged: pending | commit: pending (fill in the merge commit after merge)
URLs to request indexing (full https URLs, one per line):
https://chosepayments.com/insights/rolling-vs-fixed-reserve
Redirects added (301):
https://chosepayments.com/insights/why-providers-impose-reserves -> https://chosepayments.com/insights/rolling-vs-fixed-reserve
What changed:
- /insights/rolling-vs-fixed-reserve (ranking page, additive only): 4 sections folded in from the old page before the closing Key Takeaway; H1, title, meta and existing sections unchanged; "how to negotiate reserves" now jumps to the new section on the page.
- Six articles' links, the /insights/compliance card and the Insights hub list now point to the target or drop the old entry (not worth an indexing request).
Next deploy not before: 1 to 2 days after the merge date.
Watch for 14 days: /insights/rolling-vs-fixed-reserve clicks and position (it ranks around 3.5); propose a revert if clicks fall more than 25% with stable impressions.

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
