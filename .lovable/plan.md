

# Homepage Rewrite: Enterprise Payment Advisory Positioning

## Overview

Transform the homepage from a general "independent payment advisory" site into a high-trust, enterprise-grade Payment Strategy Review service targeting merchants processing over GBP 1M annually. This is a significant content and messaging overhaul across 8+ components while preserving the existing layout structure and design system.

## Section-by-Section Changes

### 1. SEO Metadata (Index.tsx)

Update title, description, and keywords to target enterprise payment strategy terms:
- Title: "Payment Strategy Review for High-Volume Merchants | ChosePayments"
- Description focused on revenue protection, fee optimization, and risk reduction for established merchants
- Keywords targeting enterprise payment consulting, payment infrastructure audit, etc.

### 2. Header (Header.tsx)

- Change primary CTA from "Get Independent Advice" to "Book a Payment Strategy Review"
- Update the "Onboard With Us" link text to "Partner With Us" for enterprise tone
- Assessment link updated to `/assessment?start=true` (URL stays the same, label changes)

### 3. Hero Section (HeroSection.tsx)

Complete content rewrite:
- **Eyebrow**: "Payment Strategy Review" (replacing "Independent Payment Advisory")
- **Headline**: "Your Payment Infrastructure Is Either Protecting Revenue or Quietly Losing It"
- **Subhead**: Enterprise-focused pitch about the fixed-scope Payment Strategy Review for merchants processing GBP 1M+ annually
- **Primary CTA**: "Book Your Payment Strategy Review"
- **Secondary CTA**: "How It Works" (unchanged)
- **Trust indicators**: Replace current ones with "For merchants processing GBP 1M+" / "Fixed-scope engagement" / "Outcome-driven methodology"

### 4. Success Preview Section (SuccessPreviewSection.tsx) -- becomes "What the Review Covers"

Rewrite deliverables to reflect the paid service scope:
- **Heading**: "What the Payment Strategy Review Includes"
- **Subhead**: "A fixed-scope, fee-based engagement designed for established merchants."
- Items become:
  1. "Infrastructure and Redundancy Assessment" -- Audit your gateway, processor, and acquirer setup for single points of failure
  2. "Fee Analysis and Negotiation Strategy" -- Benchmark your rates against industry data and identify savings opportunities
  3. "Risk Profiling and Compliance Review" -- Evaluate PCI, SCA, and fraud exposure across your payment stack
  4. "Acceptance Rate Optimization" -- Identify checkout friction, decline patterns, and authorization improvements
  5. "Architecture Recommendations" -- Provider mix, routing strategy, and scalability guidance tailored to your business model

### 5. Why Different Section (WhyDifferentSection.tsx)

Rewrite with enterprise authority:
- **Eyebrow**: "Why ChosePayments"
- **Heading**: "Not a Comparison Site. Not a Lead Marketplace."
- **Subhead**: "We partner with established merchants to turn payment infrastructure from a cost center into a competitive advantage."
- Differentiators become:
  1. "No Provider Influence" -- Recommendations based on operational fit and risk profile, not commission
  2. "Built for Scale" -- Designed for businesses where even a 0.1% improvement in acceptance rates has six-figure impact
  3. "Insider Expertise" -- Built by professionals who have worked inside payment operations and underwriting teams

### 6. Problem Section (ProblemSection.tsx) -- becomes Risk/Cost Messaging

Rewrite to focus on enterprise pain points:
- **Heading**: "The Hidden Costs of an Unaudited Payment Stack"
- Items become:
  1. "Revenue Leaking Through Declines" -- Poor authorization rates and checkout friction quietly erode margins, undoing marketing and sales effort
  2. "Hidden Fees Compounding at Scale" -- At high volumes, opaque pricing structures cost six or seven figures annually
  3. "Compliance Exposure Growing Silently" -- PCI, SCA, and scheme rule changes create risk that surfaces without warning
- **Bottom line**: "At scale, your payment gateway is not a backend detail. It is the engine of your revenue."

### 7. How It Works Section (HowItWorksSection.tsx)

Rewrite steps for the paid engagement:
1. "Submit Your Business Profile" -- Provide details about your transaction volumes, business model, and current payment stack
2. "We Conduct the Review" -- Our team analyzes your infrastructure, fees, risk exposure, and acceptance performance
3. "Receive Your Strategy Report" -- A detailed report with actionable recommendations, benchmarking data, and a clear roadmap

### 8. Value Props Section (ValuePropsSection.tsx) -- becomes "Built for Established Merchants"

Rewrite to filter audience and emphasize scale:
- **Heading**: "Built for Businesses Where Payments Are Mission-Critical"
- Items:
  1. "Processing GBP 1M+ Annually" -- Our methodology is designed for merchants where transaction volume justifies a strategic review
  2. "Fixed-Scope, Clear Pricing" -- One flat fee, clearly defined scope. No retainers, no ongoing commitments
  3. "Outcome-Driven Methodology" -- Every recommendation is tied to measurable impact: revenue captured, costs reduced, risk mitigated
  4. "UK and EU Specialists" -- Deep expertise in UK and EU regulatory frameworks, scheme rules, and acquirer relationships

### 9. Examples Section (ExamplesSection.tsx) -- becomes audience qualifier

Rewrite to show enterprise verticals, not small business types:
- **Heading**: "Who We Work With"
- Cards become: "High-Volume Ecommerce" / "SaaS and Subscription Platforms" / "Marketplace Operators" / "Omnichannel Retailers"
- **Bottom note**: "We work with organizations processing substantial volumes. If you are an early-stage startup or processing under GBP 1M, our premium review may not be the right fit."

### 10. CTA Section (CTASection.tsx) -- Final CTA

- Remove avatar stack (social proof excluded per brand guidelines)
- **Heading**: "Ready to Optimize Your Payment Infrastructure?"
- **Subtext**: "Book a fixed-scope Payment Strategy Review. One engagement. Clear deliverables. Measurable outcomes."
- **CTA**: "Book Your Payment Strategy Review"

### 11. New Section: Insights Preview (new component)

Add a new `InsightsPreviewSection.tsx` component placed between Value Props and CTA:
- **Heading**: "Insights and Resources"
- Display 3 featured insight articles with title, category badge, and read time
- Links to the `/insights` page
- Clean, understated design -- secondary to the main service pitch

### 12. Footer (Footer.tsx)

- Update copyright tagline from "Independent Payment Advisory" to "Payment Strategy Advisory"

## Technical Details

### Files to modify:
1. `src/pages/Index.tsx` -- Update SEO metadata, add InsightsPreviewSection import, reorder sections
2. `src/components/HeroSection.tsx` -- Full content rewrite
3. `src/components/Header.tsx` -- CTA label changes
4. `src/components/SuccessPreviewSection.tsx` -- Full content rewrite
5. `src/components/WhyDifferentSection.tsx` -- Content rewrite
6. `src/components/ProblemSection.tsx` -- Content rewrite
7. `src/components/HowItWorksSection.tsx` -- Content rewrite
8. `src/components/ValuePropsSection.tsx` -- Content rewrite
9. `src/components/ExamplesSection.tsx` -- Content rewrite and icon changes
10. `src/components/CTASection.tsx` -- Remove avatars, rewrite content
11. `src/components/Footer.tsx` -- Tagline update

### New file:
- `src/components/InsightsPreviewSection.tsx` -- Displays 3 featured articles from the existing `insightsArticles` data

### No changes to:
- Design system, colors, typography, or layout patterns
- URL structure or routing
- Any insight article pages
- Quiz/assessment flow
- UI component library

