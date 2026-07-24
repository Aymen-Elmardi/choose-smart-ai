import type { Metadata } from 'next'
import { Suspense } from 'react'
import ProviderFitIndex from '@/views/insights/ProviderFitIndex'

export const metadata: Metadata = {
  title: 'Provider Fit Guides: The Right Payment Processor for Your Business Model',
  description: 'Matching guides for subscription billing, high-risk ecommerce, high chargeback rates, restaurants, and food delivery — find providers built for your specific business model.',
  alternates: { canonical: '/insights/provider-fit' },
  openGraph: {
    url: 'https://chosepayments.com/insights/provider-fit',
    images: ['/og-default.png'],
    title: 'Provider Fit Guides: The Right Payment Processor for Your Business Model | ChosePayments',
    description: 'Matching guides for specific business models — find providers built for your industry.',
    type: 'website',
  },
}

export default function Page() {
  return (
    <Suspense>
      <ProviderFitIndex />
    </Suspense>
  )
}
