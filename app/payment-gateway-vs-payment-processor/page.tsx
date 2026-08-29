import type { Metadata } from 'next'
import PaymentGatewayVsPaymentProcessor from '@/views/insights/PaymentGatewayVsPaymentProcessor'

export const metadata: Metadata = {
  title: 'Payment Gateway vs Payment Processor: The Actual Difference (2026)',
  description: 'A payment gateway captures and encrypts card data. A payment processor authorizes the transaction and moves the money. Here is what that split actually means when you\'re building a checkout.',
  alternates: { canonical: '/payment-gateway-vs-payment-processor' },
  openGraph: {
    url: 'https://chosepayments.com/payment-gateway-vs-payment-processor',
    images: ['/og-default.png'],
    title: 'Payment Gateway vs Payment Processor: The Actual Difference (2026) | ChosePayments',
    description: 'A payment gateway captures and encrypts card data. A payment processor authorizes the transaction and moves the money. Here is what that split actually means when you\'re building a checkout.',
    type: 'article',
  },
}

export default function Page() {
  return <PaymentGatewayVsPaymentProcessor />
}
