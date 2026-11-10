# Deploy log

## New articles

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

### Assessment title tag and meta description (prepared 2026-11-10)

DEPLOY assessment-meta | merged: pending | commit: pending (fill in the merge commit after merge)
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
