import type { Metadata } from 'next'
import { Suspense } from 'react'
import CreditCardPaymentsExplained from '@/views/insights/CreditCardPaymentsExplained'

export const metadata: Metadata = {
  title: 'Credit Card Payments Explained: How They Work Behind the Scenes | ChosePayments',
  description: 'What actually happens when a customer pays by credit card? The full journey from tap to settlement — and what it means for your merchant fees.',
  alternates: { canonical: '/insights/credit-card-payments-explained' },
  openGraph: {
    title: 'Credit Card Payments Explained: How They Work Behind the Scenes | ChosePayments',
    description: 'What actually happens when a customer pays by credit card? The full journey from tap to settlement — and what it means for your merchant fees.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <CreditCardPaymentsExplained />
    </Suspense>
  )
}
