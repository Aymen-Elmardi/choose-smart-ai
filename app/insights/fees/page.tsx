import type { Metadata } from 'next'
import { Suspense } from 'react'
import FeesIndex from '@/views/insights/FeesIndex'

export const metadata: Metadata = {
  title: 'Payment Provider Fees & Costs Explained (2026)',
  description: 'Real 2026 fee breakdowns for Stripe, Checkout.com, Adyen, PayPal, and Fiserv Clover — what you actually pay beyond the headline rate, including add-ons most guides skip.',
  alternates: { canonical: '/insights/fees' },
  openGraph: {
    url: 'https://chosepayments.com/insights/fees',
    images: ['/og-default.png'],
    title: 'Payment Provider Fees & Costs Explained (2026) | ChosePayments',
    description: 'Real 2026 fee breakdowns for the major payment platforms — what you actually pay beyond the headline rate.',
    type: 'website',
  },
}

export default function Page() {
  return (
    <Suspense>
      <FeesIndex />
    </Suspense>
  )
}
