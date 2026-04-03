# Migration Plan: Vite + React → Next.js App Router

**Project:** ChosePayments (chosepayments.com)
**From:** Vite 5 + React Router v7
**To:** Next.js (App Router)
**Goal:** Maximum SEO, organic visibility, and server-side rendering

---

## 1. Route Mapping

| Current Route | Component File | Next.js Path |
|---|---|---|
| `/` | `Index.tsx` | `app/page.tsx` |
| `/us` | `IndexUS.tsx` | `app/us/page.tsx` |
| `/assessment` | `Quiz.tsx` | `app/assessment/page.tsx` |
| `/recommendation` | `Recommendation.tsx` | `app/recommendation/page.tsx` |
| `/about` | `About.tsx` | `app/about/page.tsx` |
| `/privacy` | `Privacy.tsx` | `app/privacy/page.tsx` |
| `/terms` | `Terms.tsx` | `app/terms/page.tsx` |
| `/contact` | `Contact.tsx` | `app/contact/page.tsx` |
| `/onboard-with-us` | `OnboardWithUs.tsx` | `app/onboard-with-us/page.tsx` |
| `/faq` | `FAQ.tsx` | `app/faq/page.tsx` |
| `/payment-provider-hidden-fees` | `HiddenFees.tsx` | `app/payment-provider-hidden-fees/page.tsx` |
| `/switch-payment-provider` | `SwitchProvider.tsx` | `app/switch-payment-provider/page.tsx` |
| `/best-payment-provider-small-business` | `SmallBusiness.tsx` | `app/best-payment-provider-small-business/page.tsx` |
| `/stripe-alternatives-marketplace` | `StripeAlternatives.tsx` | `app/stripe-alternatives-marketplace/page.tsx` |
| `/payment-provider-support` | `SupportMatters.tsx` | `app/payment-provider-support/page.tsx` |
| `/marketplace-payment-provider` | `MarketplacePlatforms.tsx` | `app/marketplace-payment-provider/page.tsx` |
| `/choose-payment-provider` | `ChooseProvider.tsx` | `app/choose-payment-provider/page.tsx` |
| `/best-payment-processor-uk` | `BestPaymentProcessorUK.tsx` | `app/best-payment-processor-uk/page.tsx` |
| `/stripe-vs-square-vs-paypal-uk` | `StripeVsSquareVsPaypal.tsx` | `app/stripe-vs-square-vs-paypal-uk/page.tsx` |
| `/best-payment-api-uk` | `BestPaymentApiUK.tsx` | `app/best-payment-api-uk/page.tsx` |
| `/merchant-account-problems` | `MerchantAccountProblems.tsx` | `app/merchant-account-problems/page.tsx` |
| `/risk-profile-matching` | `RiskProfileMatching.tsx` | `app/risk-profile-matching/page.tsx` |
| `/best-payment-processors-high-chargebacks` | `HighChargebackProcessors.tsx` | `app/best-payment-processors-high-chargebacks/page.tsx` |
| `/payment-processors-high-risk-ecommerce` | `HighRiskEcommerce.tsx` | `app/payment-processors-high-risk-ecommerce/page.tsx` |
| `/payment-provider-subscription-business` | `SubscriptionSaaS.tsx` | `app/payment-provider-subscription-business/page.tsx` |
| `/mcc-5812-payment-gateway-uk` | `MCC5812Restaurants.tsx` | `app/mcc-5812-payment-gateway-uk/page.tsx` |
| `/best-acquirers-food-delivery` | `FoodDeliveryAcquirers.tsx` | `app/best-acquirers-food-delivery/page.tsx` |
| `/insights` | `Insights.tsx` | `app/insights/page.tsx` |
| `/insights/payment-risk` | `PaymentRisk.tsx` | `app/insights/payment-risk/page.tsx` |
| `/insights/guides` | `Guides.tsx` | `app/insights/guides/page.tsx` |
| `/insights/case-studies` | `CaseStudies.tsx` | `app/insights/case-studies/page.tsx` |
| `/insights/proof-of-business-activity` | `ProofOfBusinessActivity.tsx` | `app/insights/proof-of-business-activity/page.tsx` |
| `/insights/sales-increase` | `SalesIncrease.tsx` | `app/insights/sales-increase/page.tsx` |
| `/insights/marketplace-seller-info` | `MarketplaceSellerInfo.tsx` | `app/insights/marketplace-seller-info/page.tsx` |
| `/insights/source-of-funds` | `SourceOfFunds.tsx` | `app/insights/source-of-funds/page.tsx` |
| `/insights/industry-verification` | `IndustryVerification.tsx` | `app/insights/industry-verification/page.tsx` |
| `/insights/international-sales` | `InternationalSales.tsx` | `app/insights/international-sales/page.tsx` |
| `/insights/contracts-invoices` | `ContractsInvoices.tsx` | `app/insights/contracts-invoices/page.tsx` |
| `/insights/why-stripe-freezes-accounts-uk` | `WhyStripeFreezes.tsx` | `app/insights/why-stripe-freezes-accounts-uk/page.tsx` |
| `/insights/why-accounts-get-flagged-after-growth` | `WhyAccountsFlaggedAfterGrowth.tsx` | `app/insights/why-accounts-get-flagged-after-growth/page.tsx` |
| `/insights/why-payment-accounts-get-frozen-without-warning` | `WhyAccountsFrozenWithoutWarning.tsx` | `app/insights/why-payment-accounts-get-frozen-without-warning/page.tsx` |
| `/insights/why-providers-re-underwrite-accounts` | `WhyProvidersReUnderwrite.tsx` | `app/insights/why-providers-re-underwrite-accounts/page.tsx` |
| `/insights/why-some-businesses-never-get-approved` | `WhySomeBusinessesNeverApproved.tsx` | `app/insights/why-some-businesses-never-get-approved/page.tsx` |
| `/insights/why-payment-providers-ask-for-director-documents` | `WhyPaymentProvidersAskForDirectorDocuments.tsx` | `app/insights/why-payment-providers-ask-for-director-documents/page.tsx` |
| `/insights/why-payment-providers-ask-for-source-of-funds` | `WhyPaymentProvidersAskForSourceOfFunds.tsx` | `app/insights/why-payment-providers-ask-for-source-of-funds/page.tsx` |
| `/insights/visa-mastercard-control-card-payments` | `VisaMastercardControl.tsx` | `app/insights/visa-mastercard-control-card-payments/page.tsx` |
| `/insights/what-is-an-acquirer` | `WhatIsAnAcquirer.tsx` | `app/insights/what-is-an-acquirer/page.tsx` |
| `/insights/payment-provider-vs-acquirer-vs-bank` | `PaymentProviderVsAcquirerVsBank.tsx` | `app/insights/payment-provider-vs-acquirer-vs-bank/page.tsx` |
| `/insights/why-card-approval-speed-affects-checkout-abandonment` | `WhyCardApprovalSpeedAffectsCheckoutAbandonment.tsx` | `app/insights/why-card-approval-speed-affects-checkout-abandonment/page.tsx` |
| `/insights/same-day-settlement-and-instant-payouts` | `SameDaySettlementAndInstantPayouts.tsx` | `app/insights/same-day-settlement-and-instant-payouts/page.tsx` |
| `/insights/what-to-do-when-provider-asks-for-documents` | `WhatToDoWhenProviderAsksForDocuments.tsx` | `app/insights/what-to-do-when-provider-asks-for-documents/page.tsx` |
| `/insights/tra-exemption-reduces-payment-friction` | `TRAExemption.tsx` | `app/insights/tra-exemption-reduces-payment-friction/page.tsx` |
| `/insights/chargebacks-what-they-are-and-how-to-avoid-them` | `Chargebacks.tsx` | `app/insights/chargebacks-what-they-are-and-how-to-avoid-them/page.tsx` |
| `/insights/credit-card-payments-explained` | `CreditCardPaymentsExplained.tsx` | `app/insights/credit-card-payments-explained/page.tsx` |
| `/insights/open-banking-payments-uk` | `OpenBankingPaymentsUK.tsx` | `app/insights/open-banking-payments-uk/page.tsx` |
| `/insights/apple-pay-google-pay-explained` | `ApplePayGooglePayExplained.tsx` | `app/insights/apple-pay-google-pay-explained/page.tsx` |
| `/insights/low-value-transaction-exemption` | `LowValueTransactionExemption.tsx` | `app/insights/low-value-transaction-exemption/page.tsx` |
| `/insights/payment-provider-risk-models` | `PaymentProviderRiskModels.tsx` | `app/insights/payment-provider-risk-models/page.tsx` |
| `/insights/wallet-payments-guaranteed-success` | `WalletPaymentsGuaranteedSuccess.tsx` | `app/insights/wallet-payments-guaranteed-success/page.tsx` |
| `/insights/why-payment-providers-reject-growing-businesses` | `WhyPaymentProvidersRejectGrowingBusinesses.tsx` | `app/insights/why-payment-providers-reject-growing-businesses/page.tsx` |
| `/insights/payment-acronyms-explained` | `PaymentAcronymsExplained.tsx` | `app/insights/payment-acronyms-explained/page.tsx` |
| `/insights/provider-appetite-index` | `ProviderAppetiteIndex.tsx` | `app/insights/provider-appetite-index/page.tsx` |
| `/insights/adyen-enterprise-payments-platform` | `AdyenEnterprisePlatform.tsx` | `app/insights/adyen-enterprise-payments-platform/page.tsx` |
| `/insights/stripe-payment-platform` | `StripePaymentPlatform.tsx` | `app/insights/stripe-payment-platform/page.tsx` |
| `/insights/checkout-com-enterprise-platform` | `CheckoutComEnterprisePlatform.tsx` | `app/insights/checkout-com-enterprise-platform/page.tsx` |
| `/insights/shift4-payments-platform` | `Shift4PaymentsPlatform.tsx` | `app/insights/shift4-payments-platform/page.tsx` |
| `/insights/shift4-vs-stripe-enterprise` | `Shift4VsStripe.tsx` | `app/insights/shift4-vs-stripe-enterprise/page.tsx` |
| `/insights/enterprise-provider-comparison` | `EnterpriseProviderComparison.tsx` | `app/insights/enterprise-provider-comparison/page.tsx` |
| `/insights/fiserv-payments-platform` | `FiservPaymentsPlatform.tsx` | `app/insights/fiserv-payments-platform/page.tsx` |
| `/insights/adyen-vs-first-data` | `AdyenVsFirstData.tsx` | `app/insights/adyen-vs-first-data/page.tsx` |
| `/insights/referral-commission-guide` | `ReferralCommissionGuide.tsx` | `app/insights/referral-commission-guide/page.tsx` |
| `/insights/paypal-payment-platform` | `PayPalPaymentPlatform.tsx` | `app/insights/paypal-payment-platform/page.tsx` |
| `/insights/stripe-fees-explained` | `StripeFees.tsx` | `app/insights/stripe-fees-explained/page.tsx` |
| `/insights/checkout-com-fees-explained` | `CheckoutComFees.tsx` | `app/insights/checkout-com-fees-explained/page.tsx` |
| `/insights/fiserv-clover-pricing-explained` | `FiservCloverFees.tsx` | `app/insights/fiserv-clover-pricing-explained/page.tsx` |
| `/insights/adyen-pricing-explained` | `AdyenFees.tsx` | `app/insights/adyen-pricing-explained/page.tsx` |
| `/insights/paypal-fees-explained` | `PayPalFees.tsx` | `app/insights/paypal-fees-explained/page.tsx` |
| `/insights/payment-scheme-rules-explained` | `PaymentSchemeRulesExplained.tsx` | `app/insights/payment-scheme-rules-explained/page.tsx` |
| `/insights/scheme-rules-reserves-monitoring` | `SchemeRulesReservesMonitoring.tsx` | `app/insights/scheme-rules-reserves-monitoring/page.tsx` |
| `/insights/scheme-rules-by-payment-method` | `SchemeRulesByPaymentMethod.tsx` | `app/insights/scheme-rules-by-payment-method/page.tsx` |
| `/insights/why-providers-impose-reserves` | `WhyProvidersImposeReserves.tsx` | `app/insights/why-providers-impose-reserves/page.tsx` |
| `/insights/rolling-vs-fixed-reserve` | `RollingVsFixedReserve.tsx` | `app/insights/rolling-vs-fixed-reserve/page.tsx` |
| `/insights/payout-settlement-explained` | `PayoutSettlementExplained.tsx` | `app/insights/payout-settlement-explained/page.tsx` |
| `/insights/net-vs-gross-settlement` | `NetVsGrossSettlement.tsx` | `app/insights/net-vs-gross-settlement/page.tsx` |
| `/insights/what-to-do-when-funds-held` | `WhatToDoWhenFundsHeld.tsx` | `app/insights/what-to-do-when-funds-held/page.tsx` |
| `/insights/chargeback-loss-recovery` | `ChargebackLossRecovery.tsx` | `app/insights/chargeback-loss-recovery/page.tsx` |
| `/insights/marketplace-payments-guide` | `MarketplacePaymentsGuide.tsx` | `app/insights/marketplace-payments-guide/page.tsx` |
| `/insights/graph` | `InsightsGraph.tsx` | `app/insights/graph/page.tsx` |
| `/insights/scoring-logic` | `ScoringLogic.tsx` | `app/insights/scoring-logic/page.tsx` |
| `/insights/crisis` | `CrisisIndex.tsx` | `app/insights/crisis/page.tsx` |
| `/insights/crisis/hidden-fee-crisis` | `CrisisHiddenFeeCrisis.tsx` | `app/insights/crisis/hidden-fee-crisis/page.tsx` |
| `/insights/crisis/rejected-high-risk-strategy` | `CrisisRejectedHighRisk.tsx` | `app/insights/crisis/rejected-high-risk-strategy/page.tsx` |
| `/insights/crisis/stripe-account-frozen` | `CrisisStripeAccountFrozen.tsx` | `app/insights/crisis/stripe-account-frozen/page.tsx` |
| `/insights/pricing-models` | `PricingModelsIndex.tsx` | `app/insights/pricing-models/page.tsx` |
| `/insights/pricing-models/interchange-plus-plus` | `InterchangePlusPlus.tsx` | `app/insights/pricing-models/interchange-plus-plus/page.tsx` |
| `/insights/pricing-models/blended-vs-interchange` | `BlendedVsInterchange.tsx` | `app/insights/pricing-models/blended-vs-interchange/page.tsx` |
| `/insights/ecommerce/high-risk-to-high-growth` | `HighRiskToHighGrowth.tsx` | `app/insights/ecommerce/high-risk-to-high-growth/page.tsx` |
| `/insights/ecommerce/subscription-revenue-recurring-billing` | `SubscriptionRevenue.tsx` | `app/insights/ecommerce/subscription-revenue-recurring-billing/page.tsx` |
| `/insights/ecommerce/chargeback-thresholds-high-risk-processors` | `ChargebackThresholds.tsx` | `app/insights/ecommerce/chargeback-thresholds-high-risk-processors/page.tsx` |
| `*` (catch-all) | `NotFound.tsx` | `app/not-found.tsx` |

**Redirects (301 — configured in next.config.mjs):**

| From | To |
|---|---|
| `/insights/why-payment-accounts-get-flagged-after-growth` | `/insights/why-accounts-get-flagged-after-growth` |
| `/insights/why-providers-re-underwrite-existing-accounts` | `/insights/why-providers-re-underwrite-accounts` |
| `/insights/why-payment-accounts-get-flagged-without-changes` | `/insights/why-accounts-get-flagged-after-growth` |
| `/quiz` | `/assessment` |

**Total routes: 105 pages + 4 redirects + 1 not-found**

---

## 2. Component Architecture

### Requires `"use client"` directive

These components use `useState`, `useEffect`, `useCallback`, event handlers, or browser APIs:

**Pages:**
- `app/assessment/page.tsx` — heavy useState/useEffect, sessionStorage, useNavigate
- `app/recommendation/page.tsx` — useState/useRef/useEffect, Supabase calls, searchParams
- `app/contact/page.tsx` — form state, Supabase calls
- `app/onboard-with-us/page.tsx` — form handling
- `app/page.tsx` — React.lazy / Suspense
- `app/us/page.tsx` — React.lazy / Suspense

**Shared Components:**
- `Header.tsx` — useState for mobile menu
- `Footer.tsx` — useState for email subscription, Supabase insert
- `ExitIntentPopup.tsx` — useState, useEffect for exit intent detection
- `TimedPopup.tsx` — time-based state
- `DiagnosticBlock.tsx` — useState for selection
- `ChecklistEmailModal.tsx` — form state
- `ArticleActions.tsx` — useState for copy state
- `FraudPreventionModal.tsx` — event handlers
- `InlineAssessmentCTA.tsx` — event handlers
- `AppErrorBoundary.tsx` — React error boundary
- `InsightTransition.tsx` — animation hooks
- `ArticleSchema.tsx` — useEffect for JSON-LD injection
- `BreadcrumbSchema.tsx` — useEffect for JSON-LD injection
- `ComparisonTableSchema.tsx` — useEffect for JSON-LD injection
- `FAQSchema.tsx` — useEffect for JSON-LD injection
- `HowToSchema.tsx` — useEffect for JSON-LD injection
- `FinancialProductSchema.tsx` — useEffect for JSON-LD injection

> **Note on Schema Components:** In Next.js, JSON-LD can be injected as a `<script type="application/ld+json">` directly in server components via the `<Script>` component or inline JSX, eliminating the need for `"use client"` on these.

### Can be Server Components (no client directive needed)

All content-only insight article pages (no interactive state):
- All `/insights/*` article pages that only render static content
- `About.tsx`, `Privacy.tsx`, `Terms.tsx`, `FAQ.tsx`
- `HiddenFees.tsx`, `SwitchProvider.tsx`, `SmallBusiness.tsx`
- `StripeAlternatives.tsx`, `SupportMatters.tsx`, `MarketplacePlatforms.tsx`
- `ChooseProvider.tsx`, `MerchantAccountProblems.tsx`, `RiskProfileMatching.tsx`
- All provider platform pages, fee explanation pages
- `Insights.tsx`, `PaymentRisk.tsx`, `Guides.tsx`, `CaseStudies.tsx`

**UI Components (shadcn/ui):**
- Most `/components/ui/*` can stay as-is; those with event handlers already have `"use client"` per shadcn convention
- `HeroSection.tsx`, `HowItWorksSection.tsx`, `CTASection.tsx`, `ValuePropsSection.tsx` — server components

---

## 3. SEO Metadata Inventory

### Strategy: Migrate `useSEO` hook → Next.js `generateMetadata`

The current `useSEO` hook uses `useLayoutEffect` to imperatively set `document.title` and meta tags. In Next.js, this is replaced by exporting a `generateMetadata` function (or a static `metadata` object) from each `page.tsx`. This runs on the server and generates proper `<head>` tags — **no client-side JS needed**.

### Base Configuration (app/layout.tsx)

```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://chosepayments.com'),
  openGraph: {
    images: ['/og-default.png'],
    siteName: 'ChosePayments',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}
```

### Per-Page Metadata

| Route | Title | Description | OG Type | Keywords |
|---|---|---|---|---|
| `/` | ChosePayments: Payment Processor Matching for UK Merchants | Find the right payment processor for your business. Avoid frozen accounts and rejections. Get matched with a provider that fits your risk profile in 2 minutes. | website | payment provider risk profile, best payment processor for my business, payment provider matching, merchant risk assessment, payment provider fit |
| `/us` | ChosePayments: Payment Processor Matching for US Businesses | Find the right payment processor for your US business. Get matched with a provider that fits your risk profile. | website | payment processor US, best payment processor for my business US |
| `/about` | Independent Payment Advisory \| Why ChosePayments is Different | We're not a comparison site. ChosePayments provides expert risk assessment and strategic guidance, helping businesses avoid payment provider mismatch before it costs them. | website | independent payment advisory, payment risk assessment, payment risk analysis, ChosePayments |
| `/assessment` | Payment Advisory Assessment \| ChosePayments | Complete a short assessment and receive independent payment advice tailored to your business. No automated recommendations. Human-reviewed guidance. | website | payment provider assessment, payment advisor |
| `/privacy` | Privacy Policy \| ChosePayments | Learn how ChosePayments collects, uses, and protects your personal information when using our payment provider recommendation service. | website | — |
| `/payment-provider-hidden-fees` | Hidden Payment Fees: What Your Provider Isn't Telling You | The rate you're quoted often isn't the rate you pay. Insider knowledge on hidden fees, rolling reserves, and why effective rates differ from advertised rates. | website | hidden payment fees, payment processing costs, effective rate, rolling reserve, provider pricing |
| `/insights` | Insights \| ChosePayments | Expert analysis on payment providers, risk profiles, and what really drives payment decisions. | website | — |
| `/insights/guides` | Practical Guides \| ChosePayments Insights | Step-by-step guides on payment provider verification, documentation requirements, and how to respond to compliance requests. | website | — |

> All remaining pages follow the same pattern. The `useSEO` hook call in each page file contains the canonical title, description, keywords, and OG settings that map directly to `generateMetadata` exports.

### Canonical URLs

All pages set canonical to `https://chosepayments.com{pathname}` (no `www`). In Next.js this is handled automatically by `metadataBase` + `alternates.canonical`.

### Open Graph Image

Default: `https://chosepayments.com/og-default.png` (file exists at `/public/og-default.png`)

---

## 4. Dependency Audit

### Remove (Vite/React Router specific)

```
vite
@vitejs/plugin-react-swc
react-router-dom
lovable-tagger
```

Also delete: `vite.config.ts`, `index.html`

### Add (Next.js)

```
next@latest
```

### Keep (all others)

| Package | Purpose |
|---|---|
| `react`, `react-dom` | Core (update to versions compatible with Next.js 15) |
| `typescript` | Language |
| `@radix-ui/*` (25+ packages) | UI primitives for shadcn |
| `lucide-react` | Icons |
| `tailwindcss`, `tailwind-merge`, `tailwindcss-animate` | Styling |
| `class-variance-authority`, `clsx` | Class utilities |
| `react-hook-form`, `@hookform/resolvers`, `zod` | Forms & validation |
| `@tanstack/react-query` | Client-side data fetching |
| `@supabase/supabase-js` | Backend |
| `next-themes` | Dark mode (already installed) |
| `embla-carousel-react` | Carousels |
| `recharts` | Charts |
| `sonner` | Toasts |
| `vaul` | Drawer |
| `input-otp` | OTP inputs |
| `react-day-picker`, `date-fns` | Date picker |
| `@fontsource/dm-sans` | Fonts |
| `@tailwindcss/typography` | Prose styles |
| `cmdk` | Command palette |
| `react-resizable-panels` | Resizable panels |

### Update Scripts

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

---

## 5. State Management & Data Fetching

### Current Architecture

| Mechanism | Usage | Next.js Strategy |
|---|---|---|
| `useState` / `useEffect` | Local UI state in interactive components | Keep, add `"use client"` |
| `@tanstack/react-query` | Server state management | Keep, wrap in `QueryClientProvider` in `app/layout.tsx` (client component) |
| `sessionStorage` | Quiz answers, session tracking | Keep (browser-only), ensure access only in client components |
| Supabase JS client | DB inserts, edge function calls | Keep, rename env vars to `NEXT_PUBLIC_*` |
| `useEnrichmentData` | Lead enrichment before form submit | Keep as client hook |
| `useSEO` / `useCanonical` | SEO metadata | **Replace** with Next.js `generateMetadata` |

### Providers Needed in `app/layout.tsx`

```tsx
// app/providers.tsx (client component)
'use client'
export function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
```

### Environment Variables

Rename in `.env.local`:

```
# Old (Vite)
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=

# New (Next.js)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Update `src/integrations/supabase/client.ts` to use new names.

---

## 6. Global Styles & Fonts

### Tailwind CSS

`tailwind.config.ts` needs content paths updated:

```ts
content: [
  './app/**/*.{ts,tsx}',
  './components/**/*.{ts,tsx}',
  './src/**/*.{ts,tsx}', // keep during transition
]
```

### Global CSS

Move `src/index.css` → `app/globals.css`. Import in `app/layout.tsx`:

```tsx
import './globals.css'
```

### Fonts

Replace `index.html` font loading with Next.js `next/font`:

```tsx
// app/layout.tsx
import { Inter, DM_Sans } from 'next/font/google'
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
```

Or keep `@fontsource/dm-sans` import in `globals.css` as-is (simpler).

---

## 7. Public Assets

All files in `/public/` carry over unchanged:

- `favicon.ico`, `favicon.png`, `apple-touch-icon.png`
- `og-default.png`
- `placeholder.svg`
- `robots.txt` — replace with `app/robots.ts`
- `sitemap.xml` — replace with `app/sitemap.ts` (auto-generated)

---

## 8. Supabase Edge Functions

Edge functions in `/supabase/functions/` remain **unchanged** — they run independently on Supabase infrastructure and are called via HTTP from the Next.js frontend.

| Function | Called From |
|---|---|
| `quiz-recommendation` | `src/lib/quizRecommendationService.ts` |
| `send-lead-email` | Recommendation page form submit |
| `send-contact-email` | Contact page |
| `send-confirmation-email` | Post-recommendation |
| `record-engagement` | Analytics tracking |
| `send-insight-lead` | Insight article CTAs |
| `prerender` | Deprecated — replaced by Next.js SSR |

---

## 9. Structural Changes Summary

### Files to Delete
- `vite.config.ts`
- `index.html`
- `src/main.tsx` (replaced by `app/layout.tsx`)
- `src/App.tsx` (routing replaced by Next.js file system)

### New Files to Create
- `next.config.mjs` — redirects + image domains
- `app/layout.tsx` — root layout with providers, fonts, global CSS
- `app/globals.css` — moved from `src/index.css`
- `app/not-found.tsx` — 404 page
- `app/sitemap.ts` — auto-generated sitemap
- `app/robots.ts` — robots configuration
- `app/providers.tsx` — client-side providers wrapper
- `app/**/page.tsx` — one per route (105 total)

### Files to Move/Keep
- `src/components/` → `components/` (or keep in `src/`)
- `src/lib/` → keep in `src/lib/`
- `src/hooks/` → keep in `src/hooks/` (remove `useSEO`, `useCanonical`)
- `src/types/` → keep
- `src/integrations/` → keep (update env var names)
- `src/data/` → keep
- `public/` → keep

---

## 10. SEO-Specific Next.js Features to Implement

| Feature | Implementation |
|---|---|
| Per-page metadata | `export const metadata` or `export async function generateMetadata` in each `page.tsx` |
| Canonical URLs | `alternates: { canonical: '/' }` in metadata |
| Open Graph | `openGraph` in metadata |
| Twitter cards | `twitter` in metadata |
| JSON-LD schemas | Inline `<script type="application/ld+json">` in server components (replaces `useEffect` injection) |
| Sitemap | `app/sitemap.ts` exporting all 105 routes |
| Robots | `app/robots.ts` |
| Image optimization | `next/image` for any `<img>` tags (optional, improves Core Web Vitals) |
| Font optimization | `next/font/google` for Inter (optional, or keep `@fontsource`) |

---

## 11. Execution Order (Phase 2)

1. **TASK 1** — Update `package.json`, create `next.config.mjs`, delete Vite files
2. **TASK 2** — Create `app/` directory, `layout.tsx`, `providers.tsx`, `globals.css`
3. **TASK 3** — Create all `page.tsx` files from existing page components, add `"use client"` where needed
4. **TASK 4** — Add `generateMetadata` to every page, create `sitemap.ts` and `robots.ts`, convert schema components to server-side JSON-LD
5. **TASK 5** — Update Tailwind config, fix imports, rename env vars, verify build

---

## 12. Risk Flags

| Risk | Mitigation |
|---|---|
| `useSEO` hook used on 100+ pages | Systematically replace with `generateMetadata` — do not leave any `useLayoutEffect` SEO calls |
| `sessionStorage` in Quiz | Already client-only; ensure `"use client"` on Quiz page |
| React.lazy in Index/IndexUS | Replace with `next/dynamic` |
| `lovable-tagger` package | Remove — Lovable-specific build plugin |
| `prerender` edge function | Deprecate — Next.js handles SSR natively |
| `_headers` file (Netlify-specific) | Configure equivalent headers in `next.config.mjs` |
| Supabase env var naming | Update all references from `VITE_SUPABASE_*` to `NEXT_PUBLIC_SUPABASE_*` |
