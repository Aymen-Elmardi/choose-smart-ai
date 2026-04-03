import type { Metadata } from 'next'
import { Suspense } from 'react'
import InternationalSales from '@/views/insights/InternationalSales'

export const metadata: Metadata = {
  title: 'International Sales Documentation for Payment Providers | ChosePayments',
  description: 'Selling internationally? Payment providers need specific documentation. Learn what\'s required and how to evidence your cross-border transactions.',
  alternates: { canonical: '/insights/international-sales' },
  openGraph: {
    title: 'International Sales Documentation for Payment Providers | ChosePayments',
    description: 'Selling internationally? Payment providers need specific documentation. Learn what\'s required and how to evidence your cross-border transactions.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <InternationalSales />
    </Suspense>
  )
}
