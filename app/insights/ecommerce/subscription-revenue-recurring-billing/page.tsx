import type { Metadata } from 'next'
import { Suspense } from 'react'
import SubscriptionRevenue from '@/views/insights/ecommerce/SubscriptionRevenue'

export const metadata: Metadata = {
  title: 'Subscription Revenue & Recurring Billing: Payment Infrastructure Guide',
  description: 'Subscription businesses need specialised payment infrastructure. Learn which providers handle recurring billing, failed payment recovery, and dunning management.',
  alternates: { canonical: '/insights/ecommerce/subscription-revenue-recurring-billing' },
  openGraph: {
    url: 'https://chosepayments.com/insights/ecommerce/subscription-revenue-recurring-billing',
    images: ['/og-default.png'],
    title: 'Subscription Revenue & Recurring Billing: Payment Infrastructure Guide | ChosePayments',
    description: 'Subscription businesses need specialised payment infrastructure. Learn which providers handle recurring billing, failed payment recovery, and dunning management.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <SubscriptionRevenue />
    </Suspense>
  )
}
