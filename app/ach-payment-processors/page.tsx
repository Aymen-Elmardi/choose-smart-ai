import type { Metadata } from 'next'
import AchPaymentProcessors from '@/views/insights/AchPaymentProcessors'

export const metadata: Metadata = {
  title: 'ACH Payment Processors: When Bank Transfer Beats Cards (2026)',
  description: 'ACH costs cents, cards cost percent. Here is when ACH payment processing makes sense for B2B, SaaS, and marketplace payouts, and which processors do it well.',
  alternates: { canonical: '/ach-payment-processors' },
  openGraph: {
    url: 'https://chosepayments.com/ach-payment-processors',
    images: ['/og-default.png'],
    title: 'ACH Payment Processors: When Bank Transfer Beats Cards (2026) | ChosePayments',
    description: 'ACH costs cents, cards cost percent. Here is when ACH payment processing makes sense for B2B, SaaS, and marketplace payouts, and which processors do it well.',
    type: 'article',
  },
}

export default function Page() {
  return <AchPaymentProcessors />
}
