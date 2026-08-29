import type { Metadata } from 'next'
import MerchantAcquirerVsPaymentProcessor from '@/views/insights/MerchantAcquirerVsPaymentProcessor'

export const metadata: Metadata = {
  title: "Merchant Acquirer vs Payment Processor: What's the Difference?",
  description: 'A merchant acquirer holds your merchant account and takes the financial risk. A payment processor routes the transaction. Here is exactly how they differ, and why it matters when your account gets frozen.',
  alternates: { canonical: '/insights/merchant-acquirer-vs-payment-processor' },
  openGraph: {
    url: 'https://chosepayments.com/insights/merchant-acquirer-vs-payment-processor',
    images: ['/og-default.png'],
    title: "Merchant Acquirer vs Payment Processor: What's the Difference? | ChosePayments",
    description: 'A merchant acquirer holds your merchant account and takes the financial risk. A payment processor routes the transaction. Here is exactly how they differ.',
    type: 'article',
  },
}

export default function Page() {
  return <MerchantAcquirerVsPaymentProcessor />
}
