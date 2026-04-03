import type { Metadata } from 'next'
import { Suspense } from 'react'
import StripePaymentPlatform from '@/views/insights/StripePaymentPlatform'

export const metadata: Metadata = {
  title: 'Stripe: The Engine That Built the Modern Internet Economy | ChosePayments',
  description: 'Stripe revolutionized digital commerce with its developer-first API and unified financial infrastructure. Learn how to optimize your business for Stripe\'s platform.',
  alternates: { canonical: '/insights/stripe-payment-platform' },
  openGraph: { title: 'Stripe: The Engine That Built the Modern Internet Economy | ChosePayments', description: 'Stripe revolutionized digital commerce with its developer-first API and unified financial infrastructure.', type: 'article' },
}

export default function Page() {
  return (
    <Suspense>
      <StripePaymentPlatform />
    </Suspense>
  )
}
