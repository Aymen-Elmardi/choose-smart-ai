import type { Metadata } from 'next'
import { Suspense } from 'react'
import CheckoutComFees from '@/views/insights/CheckoutComFees'

export const metadata: Metadata = {
  title: 'Checkout.com Fees Explained: Interchange++ Pricing Breakdown | ChosePayments',
  description: 'Checkout.com uses Interchange++ pricing. Learn exactly what you pay and how to benchmark their rates against other enterprise processors.',
  alternates: { canonical: '/insights/checkout-com-fees-explained' },
  openGraph: {
    title: 'Checkout.com Fees Explained: Interchange++ Pricing Breakdown | ChosePayments',
    description: 'Checkout.com uses Interchange++ pricing. Learn exactly what you pay and how to benchmark their rates against other enterprise processors.',
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
