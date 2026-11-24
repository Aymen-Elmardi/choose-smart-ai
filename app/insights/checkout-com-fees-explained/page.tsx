import type { Metadata } from 'next'
import CheckoutComFees from '@/views/insights/CheckoutComFees'

export const metadata: Metadata = {
  title: 'Checkout.com Fees (2026): Real Costs, FX Fee and Hidden Charges',
  description: "Checkout.com doesn't publish a rate card. See the fees businesses actually pay in 2026, its 1.99% FX fee, scheme and chargeback costs, and who it suits.",
  alternates: { canonical: '/insights/checkout-com-fees-explained' },
  openGraph: {
    url: 'https://chosepayments.com/insights/checkout-com-fees-explained',
    images: ['/og-default.png'],
    title: 'Checkout.com Fees (2026): Real Costs, FX Fee and Hidden Charges | ChosePayments',
    description: "Checkout.com doesn't publish a rate card. See the fees businesses actually pay in 2026, its 1.99% FX fee, scheme and chargeback costs, and who it suits.",
    type: 'article',
  },
}

export default function Page() {
  return <CheckoutComFees />
}
