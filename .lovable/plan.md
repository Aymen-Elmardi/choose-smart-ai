

# GSC Keyword Optimization Plan

## Summary

Your site has **1,534 impressions** across **138 queries** but only **5 clicks** so far. The good news: Google is already indexing and showing your pages for relevant keywords. The opportunity is to strengthen keyword presence in existing articles to improve rankings from page 2-4 into page 1 positions.

## Key Findings from GSC Data

### High Impression Keywords (Biggest Opportunities)

| Keyword | Impressions | Position | Target Article |
|---------|------------|----------|---------------|
| stripe vs square vs paypal (+ variations) | ~252 combined | 83-91 | `/stripe-vs-square-vs-paypal-uk` |
| first data | 33 | 6 | `/insights/fiserv-payments-platform` |
| adyen payments / platform / gateway | ~85 combined | 43-58 | `/insights/adyen-enterprise-payments-platform` |
| tra exemption(s) | 47 | 44-62 | `/insights/tra-exemption-reduces-payment-friction` |
| best small business payment systems/solutions | ~36 combined | 63-87 | `/best-payment-processor-uk` + `/small-business` |
| too many chargebacks | 9 | 59 | `/insights/chargebacks-what-they-are-and-how-to-avoid-them` |
| adyen marketplace | 18 | 66 | `/insights/adyen-enterprise-payments-platform` |
| checkout.com / checkout.com api | 8 | 9-94 | `/insights/checkout-com-enterprise-platform` |
| shift4 payments / what does shift4 do | 10 | 47-64 | `/insights/shift4-payments-platform` |
| stripe pricing | 3 | 52 | `/insights/stripe-fees-explained` |
| same day settlement advice | 6 | 87 | `/insights/same-day-settlement-and-instant-payouts` |
| what is a chargeback fee | 5 | 78 | `/insights/chargebacks-what-they-are-and-how-to-avoid-them` |
| visa transaction controls | 4 | 92 | `/insights/visa-mastercard-control-card-payments` |
| why is bank asking for source of funds | 2 | 74 | `/insights/source-of-funds` |
| is adyen a payment processor | 2 | 41 | `/insights/adyen-enterprise-payments-platform` |
| fiserv first data | 6 | 76 | `/insights/fiserv-payments-platform` |

### Pages Already Ranking Well (Position less than 15, protect and strengthen)

| Page | Position | Action |
|------|----------|--------|
| `/insights` (hub) | 3.1 | Keep strong |
| `/best-payment-api-uk` | 9.5 | Add missing keyword variations |
| `/insights/adyen-vs-first-data` | 5.9 | Add "first data" keyword density |
| `/insights/stripe-payment-platform` | 8.9 | Strengthen |
| `/insights/proof-of-business-activity` | 4.6 | Good, maintain |
| Homepage `/` | 1.8 | Good, maintain |

## Optimization Plan: Article-by-Article Changes

### 1. Stripe vs Square vs PayPal UK (Highest impression page, 428 impressions, position 64)

This is your biggest opportunity. Variations of this query total ~252 impressions.

**Changes:**
- Add these exact keyword phrases naturally into headings and body: "stripe vs paypal", "paypal vs stripe vs square", "square vs stripe vs paypal", "stripe vs paypal uk", "stripe vs square uk", "stripe vs paypal fees uk", "stripe vs square fees uk"
- Add a FAQ section with FAQSchema targeting: "Which is better, Stripe or PayPal for UK businesses?", "How do Stripe and Square fees compare in the UK?", "Is PayPal better than Stripe for small businesses?"
- Update meta description to include "stripe vs paypal vs square" variation
- Add `keywords` array to useSEO call with all variations

### 2. Adyen Enterprise Payments Platform (367 impressions, position 26)

**Changes:**
- Naturally incorporate: "adyen payments", "adyen payment gateway", "adyen platform", "adyen marketplace", "adyen unified commerce", "what does adyen do", "is adyen a payment processor", "adyen alternative"
- Add FAQ section: "What does Adyen do?", "Is Adyen a payment processor?", "What is Adyen unified commerce?"
- Expand marketplace section to capture "adyen marketplace" (18 impressions)
- Update keywords array

### 3. Fiserv Payments Platform (107 impressions, position 31)

**Changes:**
- Add phrases: "first data", "fiserv first data", "first data payment processing", "first data services", "first data platforms", "first data systems", "what is first data payment gateway"
- The keyword "first data" alone has 33 impressions at position 6, which is very close to top results
- Add FAQ: "What is First Data?", "Is Fiserv the same as First Data?", "What is First Data payment gateway?"
- Update keywords array

### 4. TRA Exemption Article (67 impressions, position 41)

**Changes:**
- Add both "tra exemption" and "tra exemptions" (plural) naturally in headings and body
- The combined impressions are 47 at positions 44-62. Strengthening keyword density could push to page 1
- Update keywords array

### 5. Chargebacks Article (39 impressions, position 69)

**Changes:**
- Add: "too many chargebacks", "what is a chargeback fee", "how do chargebacks work"
- Add FAQ section targeting these exact queries
- Update keywords array

### 6. Best Payment Processor UK (98 impressions, position 52)

**Changes:**
- Add: "best small business payment systems", "best small business payment solution", "best payment solutions for small businesses", "cheapest business payment solutions uk", "cheap business payment solutions uk", "payment processor price comparison uk", "recommend business payment solutions in uk"
- Add FAQ: "What is the best payment system for small businesses in the UK?", "What is the cheapest payment processor for UK businesses?"
- Update keywords array

### 7. Enterprise Provider Comparison (47 impressions, position 14)

**Changes:**
- Add: "enterprise payment approval platforms comparison", "enterprise payment api global coverage comparison"
- These are already position 14 and 2 respectively. Small keyword reinforcement could push to top 5
- Update keywords array

### 8. Shift4 Payments Platform (30 impressions, position 40)

**Changes:**
- Add: "shift4 payments", "what does shift4 do"
- Add FAQ: "What does Shift4 do?", "Is Shift4 a payment processor?"
- Update keywords array

### 9. Checkout.com Enterprise Platform (7 impressions, position 7)

**Changes:**
- Add: "checkout.com", "checkout.com api"
- Already ranking well at position 7. Light keyword reinforcement
- Update keywords array

### 10. Source of Funds (20 impressions, position 13)

**Changes:**
- Add: "why is bank asking for source of funds"
- Update keywords array

### 11. Same Day Settlement (17 impressions, position 42)

**Changes:**
- Add: "same day settlement advice"
- Update keywords array

### 12. Visa Mastercard Control (11 impressions, position 40)

**Changes:**
- Add: "visa transaction controls"
- Update keywords array

### 13. Stripe Fees Explained (6 impressions, position 64)

**Changes:**
- Add: "stripe pricing"
- Update keywords array

### 14. Best Payment API UK (197 impressions, position 9.5)

**Changes:**
- Already in a strong position. Add: "checkout.com api" as a related mention
- Light keyword reinforcement to protect ranking

### 15. Concept Clusters Update

Update `conceptClusters.ts` keywords arrays to include the new GSC-discovered keyword variations for better internal linking signals.

## Technical Details

### Files to modify (18 files total):

1. `src/pages/StripeVsSquareVsPaypal.tsx` - Add FAQ schema, keyword variations, update meta
2. `src/pages/insights/AdyenEnterprisePlatform.tsx` - Add FAQ, marketplace content, keyword phrases
3. `src/pages/insights/FiservPaymentsPlatform.tsx` - Add "first data" keyword density, FAQ
4. `src/pages/insights/TRAExemption.tsx` - Strengthen "tra exemption/exemptions" usage
5. `src/pages/insights/Chargebacks.tsx` - Add FAQ, keyword phrases
6. `src/pages/BestPaymentProcessorUK.tsx` - Add "small business" keyword variations, FAQ
7. `src/pages/insights/EnterpriseProviderComparison.tsx` - Add enterprise keyword phrases
8. `src/pages/insights/Shift4PaymentsPlatform.tsx` - Add FAQ, keyword phrases
9. `src/pages/insights/CheckoutComEnterprisePlatform.tsx` - Light keyword reinforcement
10. `src/pages/insights/SourceOfFunds.tsx` - Add "bank asking" phrase
11. `src/pages/insights/SameDaySettlementAndInstantPayouts.tsx` - Add "advice" keyword
12. `src/pages/insights/VisaMastercardControl.tsx` - Add "transaction controls"
13. `src/pages/insights/StripeFees.tsx` - Add "stripe pricing"
14. `src/pages/BestPaymentApiUK.tsx` - Light reinforcement
15. `src/lib/conceptClusters.ts` - Update keywords arrays with GSC terms
16. `src/lib/insightsArchitecture.ts` - Update keywords arrays with GSC terms
17. `src/pages/insights/AdyenVsFirstData.tsx` - Strengthen "first data" presence
18. `src/pages/insights/WhyPaymentProvidersAskForSourceOfFunds.tsx` - Add "bank asking" phrase

### Approach for each article:

1. Add GSC keywords naturally into existing body text (no keyword stuffing)
2. Add/update `keywords` arrays in layout props and SEO hooks
3. Add FAQ sections with `FAQSchema` where queries are question-format
4. Update meta descriptions to include high-volume keyword variations
5. All changes maintain the existing plain English, advisory tone

### Priority order (by impact):

1. Stripe vs Square vs PayPal (252 impressions, biggest gap)
2. Adyen Enterprise Platform (85+ impressions, strong content already)
3. Fiserv Platform ("first data" at position 6, near page 1)
4. Best Payment Processor UK (98 impressions, many keyword variations)
5. TRA Exemption (47 impressions, moderate position)
6. Everything else in parallel

