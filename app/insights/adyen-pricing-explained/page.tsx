import type { Metadata } from 'next'
import { Suspense } from 'react'
import AdyenFees from '@/views/insights/AdyenFees'

export const metadata: Metadata = {
  title: 'Adyen Pricing Explained: Interchange++ Fees & Processing Costs | ChosePayments',
  description: 'Adyen charges Interchange++ plus a small processing fee. Learn what that means in practice and how Adyen\'s pricing compares at different volumes.',
  alternates: { canonical: '/insights/adyen-pricing-explained' },
  openGraph: {
    title: 'Adyen Pricing Explained: Interchange++ Fees & Processing Costs | ChosePayments',
    description: 'Adyen charges Interchange++ plus a small processing fee. Learn what that means in practice and how Adyen\'s pricing compares at different volumes.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <AdyenFees />
    </Suspense>
  )
}
