import type { Metadata } from 'next'
import WhyAccountsFlaggedAfterGrowth from '@/views/insights/WhyAccountsFlaggedAfterGrowth'

export const metadata: Metadata = {
  title: 'Why Payment Accounts Get Flagged After a Business Grows',
  description: 'Sales growth can trigger holds, reserves, and reviews with Stripe, Square, and PayPal. See the volume and chargeback thresholds they watch, and how to prepare.',
  alternates: { canonical: '/insights/why-accounts-get-flagged-after-growth' },
  openGraph: {
    url: 'https://chosepayments.com/insights/why-accounts-get-flagged-after-growth',
    images: ['/og-default.png'],
    title: 'Why Payment Accounts Get Flagged After a Business Grows | ChosePayments',
    description: 'Sales growth can trigger holds, reserves, and reviews with Stripe, Square, and PayPal. See the volume and chargeback thresholds they watch, and how to prepare.',
    type: 'article',
  },
}

export default function Page() {
  return <WhyAccountsFlaggedAfterGrowth />
}
