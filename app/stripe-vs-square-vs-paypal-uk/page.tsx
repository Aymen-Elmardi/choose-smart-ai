import type { Metadata } from 'next'
import { Suspense } from 'react'
import StripeVsSquareVsPaypal from '@/views/StripeVsSquareVsPaypal'

export const metadata: Metadata = {
  title: "Stripe vs Square vs PayPal: UK Comparison & Costs",
  description: "Pricing, fees, approval odds, and which processor fits high-growth merchants. Avoid the wrong choice.",
  keywords: [
    'stripe vs square vs paypal',
    'stripe vs paypal',
    'paypal vs stripe vs square',
    'stripe vs paypal uk',
    'stripe vs square uk',
    'stripe vs paypal fees uk',
    'payment provider comparison UK',
    'Stripe risk assessment',
    'Square approval criteria',
    'PayPal underwriting',
  ],
  alternates: {
    canonical: '/stripe-vs-square-vs-paypal-uk',
  },
  openGraph: {
    title: "Stripe vs Square vs PayPal: UK Comparison & Costs",
    description: "Pricing, fees, approval odds, and which processor fits high-growth merchants. Avoid the wrong choice.",
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <StripeVsSquareVsPaypal />
    </Suspense>
  )
}
