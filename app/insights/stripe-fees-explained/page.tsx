import type { Metadata } from 'next'
import { Suspense } from 'react'
import StripeFees from '@/views/insights/StripeFees'

export const metadata: Metadata = {
  title: 'Stripe Fees UK 2026: Real Costs Beyond 1.5% + 20p',
  description: 'Stripe\'s UK card rate is 1.5% + 20p. But that\'s rarely your final bill. Full 2026 breakdown including Connect fees, chargebacks, FX and add-ons most guides skip.',
  alternates: { canonical: '/insights/stripe-fees-explained' },
  openGraph: {
    url: 'https://chosepayments.com/insights/stripe-fees-explained',
    images: ['/og-default.png'],
    title: 'Stripe Fees UK 2026: Real Costs Beyond 1.5% + 20p | ChosePayments',
    description: 'Stripe\'s UK card rate is 1.5% + 20p. But that\'s rarely your final bill. Full 2026 breakdown including Connect fees, chargebacks, FX and add-ons most guides skip.',
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
