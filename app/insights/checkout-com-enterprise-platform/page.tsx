import type { Metadata } from 'next'
import { Suspense } from 'react'
import CheckoutComEnterprisePlatform from '@/views/insights/CheckoutComEnterprisePlatform'

export const metadata: Metadata = {
  title: 'Checkout.com: The High-Performance Platform Built for Global Ambition | ChosePayments',
  description: 'Discover why Checkout.com\'s modular architecture delivers superior authorization rates and granular control for high-growth global merchants.',
  alternates: { canonical: '/insights/checkout-com-enterprise-platform' },
  openGraph: { title: 'Checkout.com: The High-Performance Platform Built for Global Ambition', description: 'Checkout.com\'s modular architecture delivers superior authorization rates for high-growth merchants.', type: 'article' },
}

export default function Page() {
  return (
    <Suspense>
      <CheckoutComEnterprisePlatform />
    </Suspense>
  )
}
