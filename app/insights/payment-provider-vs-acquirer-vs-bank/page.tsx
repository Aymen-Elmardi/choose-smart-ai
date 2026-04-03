import type { Metadata } from 'next'
import { Suspense } from 'react'
import PaymentProviderVsAcquirerVsBank from '@/views/insights/PaymentProviderVsAcquirerVsBank'

export const metadata: Metadata = {
  title: 'Payment Provider vs Acquirer vs Bank: What\'s the Difference? | ChosePayments',
  description: 'The payment industry is full of overlapping terms. Learn the difference between payment providers, acquirers, and banks — and why it matters for your business.',
  alternates: { canonical: '/insights/payment-provider-vs-acquirer-vs-bank' },
  openGraph: {
    title: 'Payment Provider vs Acquirer vs Bank: What\'s the Difference? | ChosePayments',
    description: 'The payment industry is full of overlapping terms. Learn the difference between payment providers, acquirers, and banks — and why it matters for your business.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <PaymentProviderVsAcquirerVsBank />
    </Suspense>
  )
}
