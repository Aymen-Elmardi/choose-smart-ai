import type { Metadata } from 'next'
import { Suspense } from 'react'
import WhyStripeFreezes from '@/views/insights/WhyStripeFreezes'

export const metadata: Metadata = {
  title: 'Why Stripe Freezes Accounts: The Real Reasons | ChosePayments',
  description: 'Stripe account frozen? Learn the real reasons Stripe freezes merchant accounts, what triggers a review, and how to avoid or recover from it.',
  alternates: { canonical: '/insights/why-stripe-freezes-accounts-uk' },
  openGraph: {
    title: 'Why Stripe Freezes Accounts: The Real Reasons | ChosePayments',
    description: 'Stripe account frozen? Learn the real reasons Stripe freezes merchant accounts, what triggers a review, and how to avoid or recover from it.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <WhyStripeFreezes />
    </Suspense>
  )
}
