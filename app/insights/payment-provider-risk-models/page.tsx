import type { Metadata } from 'next'
import { Suspense } from 'react'
import PaymentProviderRiskModels from '@/views/insights/PaymentProviderRiskModels'

export const metadata: Metadata = {
  title: 'How Payment Providers Assess Business Risk | ChosePayments',
  description: 'Every payment provider has a risk model they use to approve or reject merchants. Understanding their criteria helps you apply to the right provider first time.',
  alternates: { canonical: '/insights/payment-provider-risk-models' },
  openGraph: {
    title: 'How Payment Providers Assess Business Risk | ChosePayments',
    description: 'Every payment provider has a risk model they use to approve or reject merchants. Understanding their criteria helps you apply to the right provider first time.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <PaymentProviderRiskModels />
    </Suspense>
  )
}
