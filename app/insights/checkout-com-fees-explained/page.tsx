import type { Metadata } from 'next'
import { Suspense } from 'react'
import CheckoutComFees from '@/views/insights/CheckoutComFees'

export const metadata: Metadata = {
  title: 'Checkout.com Fees and Pricing (2026): What Businesses Actually Pay',
  description: 'Checkout.com does not publish standard pricing. This guide covers what businesses actually pay in 2026, with indicative rates from 0.2% to 1.8%, payment gateway pricing, EEA billing codes, oversized charges, and UK post-Brexit costs explained.',
  alternates: { canonical: '/insights/checkout-com-fees-explained' },
  openGraph: {
    url: 'https://chosepayments.com/insights/checkout-com-fees-explained',
    images: ['/og-default.png'],
    title: 'Checkout.com Fees and Pricing (2026): What Businesses Actually Pay | ChosePayments',
    description: 'Checkout.com does not publish standard pricing. This guide covers what businesses actually pay in 2026, with indicative rates from 0.2% to 1.8%, payment gateway pricing, EEA billing codes, oversized charges, and UK post-Brexit costs explained.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <CheckoutComFees />
    </Suspense>
  )
}
