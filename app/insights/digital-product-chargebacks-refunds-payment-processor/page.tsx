import type { Metadata } from 'next'
import DigitalProductChargebacksRefundsPaymentProcessor from '@/views/insights/DigitalProductChargebacksRefundsPaymentProcessor'

export const metadata: Metadata = {
  title: 'Digital Product Chargebacks 2026: The 1.8% Problem, Explained',
  description: 'Digital goods have a 1.8% chargeback rate, triple physical goods. See what happens when disputes hit and how to prevent the fines.',
  alternates: { canonical: '/insights/digital-product-chargebacks-refunds-payment-processor' },
  openGraph: {
    url: 'https://chosepayments.com/insights/digital-product-chargebacks-refunds-payment-processor',
    images: ['/og-default.png'],
    title: 'Digital Product Chargebacks 2026: The 1.8% Problem, Explained | ChosePayments',
    description: 'Digital goods have a 1.8% chargeback rate, triple physical goods. See what happens when disputes hit and how to prevent the fines.',
    type: 'article',
  },
}

export default function Page() {
  return <DigitalProductChargebacksRefundsPaymentProcessor />
}
