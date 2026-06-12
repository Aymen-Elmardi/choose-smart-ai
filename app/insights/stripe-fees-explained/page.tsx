import type { Metadata } from 'next'
import { Suspense } from 'react'
import StripeFees from '@/views/insights/StripeFees'

export const metadata: Metadata = {
  title: 'Stripe Fees UK (2026): What Businesses Actually Pay',
  description: 'Stripe charges 1.4% + 20p for UK cards. See the full breakdown of Connect fees, chargebacks, FX, and instant payouts, updated for 2026.',
  alternates: { canonical: '/insights/stripe-fees-explained' },
  openGraph: {
    title: 'Stripe Fees UK (2026): What Businesses Actually Pay | ChosePayments',
    description: 'Stripe charges 1.4% + 20p for UK cards. See the full breakdown of Connect fees, chargebacks, FX, and instant payouts, updated for 2026.',
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
