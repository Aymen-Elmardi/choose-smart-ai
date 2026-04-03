import type { Metadata } from 'next'
import { Suspense } from 'react'
import SubscriptionSaaS from '@/views/insights/provider-fit/SubscriptionSaaS'

export const metadata: Metadata = {
  title: 'Best Payment Providers for Subscription & SaaS Businesses | ChosePayments',
  description: 'Recurring billing needs the right payment infrastructure. Find providers that support subscriptions, handle failed payments, and scale with your MRR.',
  alternates: { canonical: '/payment-provider-subscription-business' },
  openGraph: {
    title: 'Best Payment Providers for Subscription & SaaS Businesses | ChosePayments',
    description: 'Recurring billing needs the right payment infrastructure. Find providers that support subscriptions, handle failed payments, and scale with your MRR.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <SubscriptionSaaS />
    </Suspense>
  )
}
