import type { Metadata } from 'next'
import { Suspense } from 'react'
import HighRiskEcommerce from '@/views/insights/provider-fit/HighRiskEcommerce'

export const metadata: Metadata = {
  title: 'Payment Processors for High-Risk Ecommerce | ChosePayments',
  description: 'High-risk ecommerce needs a specialist processor. Compare providers that accept your industry, offer chargeback protection, and won\'t freeze your account.',
  alternates: { canonical: '/payment-processors-high-risk-ecommerce' },
  openGraph: {
    title: 'Payment Processors for High-Risk Ecommerce | ChosePayments',
    description: 'High-risk ecommerce needs a specialist processor. Compare providers that accept your industry, offer chargeback protection, and won\'t freeze your account.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <HighRiskEcommerce />
    </Suspense>
  )
}
