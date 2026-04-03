import type { Metadata } from 'next'
import { Suspense } from 'react'
import BestPaymentProcessorUK from '@/views/BestPaymentProcessorUK'

export const metadata: Metadata = {
  title: "Best Payment Processors for UK Merchants: Find Your Fit",
  description: "Best UK payment processors for ecommerce, SaaS, and marketplaces. Compare Stripe, Adyen, Checkout.com. See which processor approves your business type.",
  keywords: [
    'best payment processor UK',
    'best small business payment systems',
    'best small business payment solution',
    'best payment solutions for small businesses',
    'cheapest business payment solutions uk',
    'payment processor price comparison uk',
    'payment processor risk UK',
    'payment provider assessment',
    'UK business payment fit',
  ],
  alternates: {
    canonical: '/best-payment-processor-uk',
  },
  openGraph: {
    title: "Best Payment Processors for UK Merchants: Find Your Fit",
    description: "Best UK payment processors for ecommerce, SaaS, and marketplaces. Compare Stripe, Adyen, Checkout.com. See which processor approves your business type.",
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <BestPaymentProcessorUK />
    </Suspense>
  )
}
