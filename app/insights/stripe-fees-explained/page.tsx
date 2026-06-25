import type { Metadata } from 'next'
import { Suspense } from 'react'
import StripeFees from '@/views/insights/StripeFees'

export const metadata: Metadata = {
  title: 'Stripe Fees UK (2026): What Businesses Actually Pay',
  description: 'Stripe\'s UK card fee is 1.5% + 20p, but that\'s just the start. This guide covers Connect fees, international charges, European rates, and what you actually pay at scale in 2026.',
  alternates: { canonical: '/insights/stripe-fees-explained' },
  openGraph: {
    images: ['/og-default.png'],
    title: 'Stripe Fees UK (2026): What Businesses Actually Pay | ChosePayments',
    description: 'Stripe\'s UK card fee is 1.5% + 20p, but that\'s just the start. This guide covers Connect fees, international charges, European rates, and what you actually pay at scale in 2026.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <StripeFees />
    </Suspense>
  )
}
