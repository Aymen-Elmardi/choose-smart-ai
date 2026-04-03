import type { Metadata } from 'next'
import { Suspense } from 'react'
import PricingModelsIndex from '@/views/insights/PricingModelsIndex'

export const metadata: Metadata = {
  title: 'Payment Pricing Models Explained | ChosePayments',
  description: 'Understand the difference between Interchange++, blended pricing, and other payment processing fee structures. Learn which pricing model saves you the most.',
  alternates: { canonical: '/insights/pricing-models' },
  openGraph: { title: 'Payment Pricing Models Explained | ChosePayments', description: 'Understand Interchange++, blended pricing, and other payment fee structures.', type: 'website' },
}

export default function Page() {
  return (
    <Suspense>
      <PricingModelsIndex />
    </Suspense>
  )
}
