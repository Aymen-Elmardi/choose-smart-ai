import type { Metadata } from 'next'
import { Suspense } from 'react'
import ProvidersIndex from '@/views/insights/ProvidersIndex'

export const metadata: Metadata = {
  title: 'Payment Provider Deep Dives: Stripe, Adyen, Checkout.com & More',
  description: 'In-depth, independent reviews of the major payment platforms — Stripe, Adyen, Checkout.com, Shift4, Fiserv, and PayPal — covering architecture, risk appetite, and who each one actually fits.',
  alternates: { canonical: '/insights/providers' },
  openGraph: {
    url: 'https://chosepayments.com/insights/providers',
    images: ['/og-default.png'],
    title: 'Payment Provider Deep Dives: Stripe, Adyen, Checkout.com & More | ChosePayments',
    description: 'In-depth, independent reviews of the major payment platforms and who each one actually fits.',
    type: 'website',
  },
}

export default function Page() {
  return (
    <Suspense>
      <ProvidersIndex />
    </Suspense>
  )
}
