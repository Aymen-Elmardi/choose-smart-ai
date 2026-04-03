import type { Metadata } from 'next'
import { Suspense } from 'react'
import BestPaymentApiUK from '@/views/BestPaymentApiUK'

export const metadata: Metadata = {
  title: "Best Payment APIs for UK Developers & High-Growth Apps",
  description: "Compare payment APIs for UK developers: Stripe, Adyen, Checkout.com. Pricing, integration speed, approval rates. Find the API that fits your tech stack.",
  keywords: [
    'payment API UK',
    'best payment gateway API',
    'Stripe API alternatives',
    'checkout.com api',
    'developer payment integration',
    'payment API comparison',
  ],
  alternates: {
    canonical: '/best-payment-api-uk',
  },
  openGraph: {
    title: "Best Payment APIs for UK Developers & High-Growth Apps",
    description: "Compare payment APIs for UK developers: Stripe, Adyen, Checkout.com. Pricing, integration speed, approval rates. Find the API that fits your tech stack.",
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <BestPaymentApiUK />
    </Suspense>
  )
}
