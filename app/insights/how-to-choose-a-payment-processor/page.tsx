import type { Metadata } from 'next'
import HowToChoosePaymentProcessor from '@/views/insights/HowToChoosePaymentProcessor'

export const metadata: Metadata = {
  title: "How to Choose a Payment Processor: The Business Owner's Guide (2026)",
  description: 'A practical framework for choosing a payment processor: pricing models, hidden fees, risk alignment, integration fit, and the real cost of switching later.',
  alternates: { canonical: '/insights/how-to-choose-a-payment-processor' },
  openGraph: {
    url: 'https://chosepayments.com/insights/how-to-choose-a-payment-processor',
    images: ['/og-default.png'],
    title: "How to Choose a Payment Processor: The Business Owner's Guide (2026) | ChosePayments",
    description: 'A practical framework for choosing a payment processor: pricing models, hidden fees, risk alignment, integration fit, and the real cost of switching later.',
    type: 'article',
  },
}

export default function Page() {
  return <HowToChoosePaymentProcessor />
}
