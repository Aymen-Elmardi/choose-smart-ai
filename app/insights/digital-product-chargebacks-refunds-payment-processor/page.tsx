import type { Metadata } from 'next'
import { Suspense } from 'react'
import DigitalProductChargebacksRefundsPaymentProcessor from '@/views/insights/DigitalProductChargebacksRefundsPaymentProcessor'

export const metadata: Metadata = {
  title: 'Digital Product Chargebacks and Refunds: What Your Payment Processor Does About It',
  description: 'Digital goods have a 1.8% average chargeback rate - more than triple the rate for physical goods. Here is exactly what happens when disputes hit, what processors do, and what the fines look like at scale.',
  alternates: { canonical: '/insights/digital-product-chargebacks-refunds-payment-processor' },
  openGraph: {
    url: 'https://chosepayments.com/insights/digital-product-chargebacks-refunds-payment-processor',
    images: ['/og-default.png'],
    title: 'Digital Product Chargebacks and Refunds: What Your Payment Processor Does About It | ChosePayments',
    description: 'Digital goods have a 1.8% average chargeback rate - more than triple the rate for physical goods. Here is what processors do about it.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <DigitalProductChargebacksRefundsPaymentProcessor />
    </Suspense>
  )
}
