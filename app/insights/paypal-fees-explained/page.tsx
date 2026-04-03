import type { Metadata } from 'next'
import { Suspense } from 'react'
import PayPalFees from '@/views/insights/PayPalFees'

export const metadata: Metadata = {
  title: 'PayPal Fees Explained: Full Breakdown for UK Business Accounts | ChosePayments',
  description: 'PayPal\'s fee structure has many layers. A complete breakdown of transaction fees, currency conversion, withdrawal costs, and when PayPal gets expensive.',
  alternates: { canonical: '/insights/paypal-fees-explained' },
  openGraph: {
    title: 'PayPal Fees Explained: Full Breakdown for UK Business Accounts | ChosePayments',
    description: 'PayPal\'s fee structure has many layers. A complete breakdown of transaction fees, currency conversion, withdrawal costs, and when PayPal gets expensive.',
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
