import type { Metadata } from 'next'
import { Suspense } from 'react'
import WhyPaymentProvidersRejectGrowingBusinesses from '@/views/insights/WhyPaymentProvidersRejectGrowingBusinesses'

export const metadata: Metadata = {
  title: 'Why Payment Providers Reject Growing Businesses | ChosePayments',
  description: 'Rapid growth can make providers nervous. Learn why fast-growing businesses face more scrutiny and how to document your growth to keep accounts open.',
  alternates: { canonical: '/insights/why-payment-providers-reject-growing-businesses' },
  openGraph: {
    title: 'Why Payment Providers Reject Growing Businesses | ChosePayments',
    description: 'Rapid growth can make providers nervous. Learn why fast-growing businesses face more scrutiny and how to document your growth to keep accounts open.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <WhyPaymentProvidersRejectGrowingBusinesses />
    </Suspense>
  )
}
