import type { Metadata } from 'next'
import { Suspense } from 'react'
import PayPalFees from '@/views/insights/PayPalFees'

export const metadata: Metadata = {
  title: 'PayPal Fees UK (2026): Complete Breakdown for Businesses and Consumers',
  description: 'Full breakdown of PayPal fees for UK users in 2026. Covers goods and services fees, business transaction rates, instant transfer costs, currency conversion, and when PayPal starts costing more than you expect.',
  alternates: { canonical: '/insights/paypal-fees-explained' },
  openGraph: {
    url: 'https://chosepayments.com/insights/paypal-fees-explained',
    images: ['/og-default.png'],
    title: 'PayPal Fees UK (2026): Complete Breakdown for Businesses and Consumers | ChosePayments',
    description: 'Full breakdown of PayPal fees for UK users in 2026. Covers goods and services fees, business transaction rates, instant transfer costs, currency conversion, and when PayPal starts costing more than you expect.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <PayPalFees />
    </Suspense>
  )
}
