import type { Metadata } from 'next'
import { Suspense } from 'react'
import RiskAlignmentPaymentProcessor from '@/views/insights/RiskAlignmentPaymentProcessor'

export const metadata: Metadata = {
  title: 'Risk Alignment with Payment Processors: Why It Matters More Than Price',
  description: 'Why picking a payment processor on rate alone leads to frozen funds and rolling reserves, and what risk alignment actually means for your business.',
  alternates: { canonical: '/risk-alignment-payment-processor' },
  openGraph: {
    url: 'https://chosepayments.com/risk-alignment-payment-processor',
    images: ['/og-default.png'],
    title: 'Risk Alignment with Payment Processors: Why It Matters More Than Price | ChosePayments',
    description: 'Why picking a payment processor on rate alone leads to frozen funds and rolling reserves, and what risk alignment actually means for your business.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <RiskAlignmentPaymentProcessor />
    </Suspense>
  )
}
