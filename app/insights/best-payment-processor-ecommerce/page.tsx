import type { Metadata } from 'next'
import { Suspense } from 'react'
import BestPaymentProcessorEcommerce from '@/views/insights/BestPaymentProcessorEcommerce'

export const metadata: Metadata = {
  title: 'Best Payment Processor for E-Commerce in 2026: By Business Type',
  description: 'There is no single best payment processor for e-commerce. Subscription, high-ticket, international, and high-volume stores each need a different answer. Here is how to pick correctly.',
  alternates: { canonical: '/insights/best-payment-processor-ecommerce' },
  openGraph: {
    url: 'https://chosepayments.com/insights/best-payment-processor-ecommerce',
    images: ['/og-default.png'],
    title: 'Best Payment Processor for E-Commerce in 2026: By Business Type | ChosePayments',
    description: 'There is no single best payment processor for e-commerce. Subscription, high-ticket, international, and high-volume stores each need a different answer. Here is how to pick correctly.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <BestPaymentProcessorEcommerce />
    </Suspense>
  )
}
