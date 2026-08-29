import type { Metadata } from 'next'
import HiddenPaymentProcessorFees from '@/views/insights/HiddenPaymentProcessorFees'

export const metadata: Metadata = {
  title: 'Hidden Payment Processor Fees to Watch For (2026)',
  description: 'PCI fees, batch fees, early termination charges. Here is every fee processors bury in contracts, what they cost, and how to negotiate them out.',
  alternates: { canonical: '/insights/hidden-payment-processor-fees' },
  openGraph: {
    url: 'https://chosepayments.com/insights/hidden-payment-processor-fees',
    images: ['/og-default.png'],
    title: 'Hidden Payment Processor Fees to Watch For (2026) | ChosePayments',
    description: 'PCI fees, batch fees, early termination charges. Here is every fee processors bury in contracts, what they cost, and how to negotiate them out.',
    type: 'article',
  },
}

export default function Page() {
  return <HiddenPaymentProcessorFees />
}
