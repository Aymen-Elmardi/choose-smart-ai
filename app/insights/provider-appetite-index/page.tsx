import type { Metadata } from 'next'
import { Suspense } from 'react'
import ProviderAppetiteIndex from '@/views/insights/ProviderAppetiteIndex'

export const metadata: Metadata = {
  title: 'Provider Appetite Index: Which Providers Accept Which Businesses | ChosePayments',
  description: 'A comprehensive index of payment provider risk appetites by industry. Find which providers will accept your business before you apply.',
  alternates: { canonical: '/insights/provider-appetite-index' },
  openGraph: {
    title: 'Provider Appetite Index: Which Providers Accept Which Businesses | ChosePayments',
    description: 'A comprehensive index of payment provider risk appetites by industry. Find which providers will accept your business before you apply.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <ProviderAppetiteIndex />
    </Suspense>
  )
}
