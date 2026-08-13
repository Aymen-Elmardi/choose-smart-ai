import type { Metadata } from 'next'
import { Suspense } from 'react'
import StripeAccountFrozen from '@/views/insights/crisis/StripeAccountFrozen'

export const metadata: Metadata = {
  title: 'Stripe Account Frozen? 5 Hidden Reasons Why (2026 Guide)',
  description: 'Stripe froze your funds without warning? Here are the 5 hidden triggers, what to send them today, and how to stop it happening again.',
  alternates: { canonical: '/insights/crisis/stripe-account-frozen' },
  openGraph: {
    url: 'https://chosepayments.com/insights/crisis/stripe-account-frozen',
    images: ['/og-default.png'],
    title: 'Stripe Account Frozen? 5 Hidden Reasons Why (2026 Guide) | ChosePayments',
    description: 'Stripe froze your funds without warning? Here are the 5 hidden triggers, what to send them today, and how to stop it happening again.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <StripeAccountFrozen />
    </Suspense>
  )
}
