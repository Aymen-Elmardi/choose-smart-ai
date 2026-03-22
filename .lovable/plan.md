

# Dedicated FAQ Page with Article Previews

## Overview
Create `/faq` page where article-related FAQs include a short excerpt from the actual article content, followed by a "Read more" link. This makes the page more visually engaging and drives traffic to full articles.

## Changes

### 1. Create `src/pages/FAQ.tsx`
- SEO: title "Frequently Asked Questions | ChosePayments", FAQSchema for rich results
- Three grouped sections using Collapsible accordions:
  - **About ChosePayments** (4 FAQs: what it is, how matching works, is it free, how we make money)
  - **Payment Provider Issues** (5 FAQs: frozen accounts, reserves, rejections, chargebacks, funds held)
  - **Using the Assessment** (3 FAQs: how long, what happens after, do I share financials)

**Article preview pattern** (for payment-related FAQs):
Each answer includes a short 2-3 sentence excerpt styled in a subtle card/blockquote with a muted background, followed by a "Read more →" link to the full article. Example:

```
Q: Why do payment accounts get frozen?
A: [Brief direct answer]

┌─────────────────────────────────────────────┐
│ "Stripe does not freeze accounts at random. │
│  In the UK, freezes usually happen when     │
│  automated risk systems detect activity..." │
│                                             │
│  Read more →                                │
└─────────────────────────────────────────────┘
```

- Styled as a `bg-muted/50 rounded-lg p-4 border` block with italic excerpt text and a primary-colored "Read more →" link
- **Business model FAQ** (no article link): "We earn a referral commission from payment providers when a business we recommend is approved. Providers value our referrals because we only recommend businesses that genuinely fit their risk appetite, leading to higher approval rates and better merchant retention. The service is completely free for merchants."
- Bottom CTA: "Still have questions? Get in touch" linking to `/contact`

### 2. Update `src/App.tsx`
- Add lazy import and route for `/faq`

### 3. Update `src/components/Footer.tsx`
- Add "FAQ" link to footer nav

### Files
- **Create**: `src/pages/FAQ.tsx`
- **Edit**: `src/App.tsx`, `src/components/Footer.tsx`

