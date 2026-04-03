import type { Metadata } from 'next'
import { Suspense } from 'react'
import PaymentSchemeRulesExplained from '@/views/insights/PaymentSchemeRulesExplained'

export const metadata: Metadata = {
  title: 'Payment Scheme Rules Explained: Visa & Mastercard | ChosePayments',
  description: 'Visa and Mastercard scheme rules govern how all card payments work. Understanding these rules explains why providers behave the way they do.',
  alternates: { canonical: '/insights/payment-scheme-rules-explained' },
  openGraph: {
    title: 'Payment Scheme Rules Explained: Visa & Mastercard | ChosePayments',
    description: 'Visa and Mastercard scheme rules govern how all card payments work. Understanding these rules explains why providers behave the way they do.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <PaymentSchemeRulesExplained />
    </Suspense>
  )
}
