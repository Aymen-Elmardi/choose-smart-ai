import type { Metadata } from 'next'
import { Suspense } from 'react'
import StripeFees from '@/views/insights/StripeFees'

export const metadata: Metadata = {
  title: 'Stripe Fees Explained: What You Actually Pay | ChosePayments',
  description: 'Stripe\'s pricing looks simple — until you dig in. Understand every Stripe fee including blended rates, international cards, disputes, and add-ons.',
  alternates: { canonical: '/insights/stripe-fees-explained' },
  openGraph: {
    title: 'Stripe Fees Explained: What You Actually Pay | ChosePayments',
    description: 'Stripe\'s pricing looks simple — until you dig in. Understand every Stripe fee including blended rates, international cards, disputes, and add-ons.',
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
