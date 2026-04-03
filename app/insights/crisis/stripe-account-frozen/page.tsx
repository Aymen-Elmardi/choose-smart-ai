import type { Metadata } from 'next'
import { Suspense } from 'react'
import StripeAccountFrozen from '@/views/insights/crisis/StripeAccountFrozen'

export const metadata: Metadata = {
  title: 'Stripe Account Frozen: Immediate Steps & Alternatives | ChosePayments',
  description: 'Stripe frozen your account? Immediate steps to take, what to send them, and which alternative providers can get you processing quickly.',
  alternates: { canonical: '/insights/crisis/stripe-account-frozen' },
  openGraph: {
    title: 'Stripe Account Frozen: Immediate Steps & Alternatives | ChosePayments',
    description: 'Stripe frozen your account? Immediate steps to take, what to send them, and which alternative providers can get you processing quickly.',
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
