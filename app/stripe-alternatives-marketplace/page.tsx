import type { Metadata } from 'next'
import { Suspense } from 'react'
import StripeAlternatives from '@/views/StripeAlternatives'

export const metadata: Metadata = {
  title: "Stripe Alternatives for Marketplaces: Risk Assessment & Provider Fit",
  description: "Stripe Connect isn't always the right fit. Understand which marketplace payment providers match your risk profile, onboarding needs, and operational reality.",
  keywords: [
    'Stripe alternatives',
    'marketplace payment risk',
    'Stripe Connect assessment',
    'platform payment fit',
  ],
  alternates: {
    canonical: '/stripe-alternatives-marketplace',
  },
  openGraph: {
    title: "Stripe Alternatives for Marketplaces: Risk Assessment & Provider Fit",
    description: "Stripe Connect isn't always the right fit. Understand which marketplace payment providers match your risk profile, onboarding needs, and operational reality.",
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <StripeAlternatives />
    </Suspense>
  )
}
