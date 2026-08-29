import type { Metadata } from 'next'
import PaymentProcessorBusinessVerticalClassification from '@/views/insights/PaymentProcessorBusinessVerticalClassification'

export const metadata: Metadata = {
  title: 'How Payment Processors Classify Your Business Vertical (and Why It Matters)',
  description: 'Payment processors assign a four-digit MCC code to every merchant that determines your interchange rate, whether you can get approved, and how much risk scrutiny your account receives. Here is how the classification works.',
  alternates: { canonical: '/insights/payment-processor-business-vertical-classification' },
  openGraph: {
    url: 'https://chosepayments.com/insights/payment-processor-business-vertical-classification',
    images: ['/og-default.png'],
    title: 'How Payment Processors Classify Your Business Vertical (and Why It Matters) | ChosePayments',
    description: 'Payment processors assign a four-digit MCC code to every merchant that determines your interchange rate, approval odds, and risk scrutiny.',
    type: 'article',
  },
}

export default function Page() {
  return <PaymentProcessorBusinessVerticalClassification />
}
