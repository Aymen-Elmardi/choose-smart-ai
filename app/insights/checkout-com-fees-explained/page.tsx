import type { Metadata } from 'next'
import { Suspense } from 'react'
import CheckoutComFees from '@/views/insights/CheckoutComFees'

export const metadata: Metadata = {
  title: 'Checkout.com Pricing and Fees (2026): Is It Worth It For Your Business?',
  description: 'Checkout.com uses negotiated pricing with no public rates. Learn what businesses pay, which payment methods are supported, and how UK and EEA billing works in 2026.',
  alternates: { canonical: '/insights/checkout-com-fees-explained' },
  openGraph: {
    title: 'Checkout.com Pricing and Fees (2026): Is It Worth It For Your Business? | ChosePayments',
    description: 'Checkout.com uses negotiated pricing with no public rates. Learn what businesses pay, which payment methods are supported, and how UK and EEA billing works in 2026.',
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
