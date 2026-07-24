import type { Metadata } from 'next'
import { Suspense } from 'react'
import EcommerceIndex from '@/views/insights/EcommerceIndex'

export const metadata: Metadata = {
  title: 'Ecommerce Payment Strategy: Growth, Recurring Billing & Chargebacks',
  description: 'Payment strategy guides for scaling ecommerce businesses — moving past a high-risk label, structuring recurring billing, and managing chargeback thresholds.',
  alternates: { canonical: '/insights/ecommerce' },
  openGraph: {
    url: 'https://chosepayments.com/insights/ecommerce',
    images: ['/og-default.png'],
    title: 'Ecommerce Payment Strategy: Growth, Recurring Billing & Chargebacks | ChosePayments',
    description: 'Payment strategy guides for scaling ecommerce businesses.',
    type: 'website',
  },
}

export default function Page() {
  return (
    <Suspense>
      <EcommerceIndex />
    </Suspense>
  )
}
