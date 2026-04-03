import type { Metadata } from 'next'
import { Suspense } from 'react'
import WhyPaymentProvidersAskForSourceOfFunds from '@/views/insights/WhyPaymentProvidersAskForSourceOfFunds'

export const metadata: Metadata = {
  title: 'Why Payment Providers Ask for Source of Funds | ChosePayments',
  description: 'Source of funds requests signal a compliance review. Learn what triggers them and exactly what documentation satisfies payment provider compliance teams.',
  alternates: { canonical: '/insights/why-payment-providers-ask-for-source-of-funds' },
  openGraph: {
    title: 'Why Payment Providers Ask for Source of Funds | ChosePayments',
    description: 'Source of funds requests signal a compliance review. Learn what triggers them and exactly what documentation satisfies payment provider compliance teams.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <WhyPaymentProvidersAskForSourceOfFunds />
    </Suspense>
  )
}
