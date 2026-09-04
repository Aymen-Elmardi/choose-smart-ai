import type { Metadata } from 'next'
import MarketplaceSplitPayments from '@/views/insights/MarketplaceSplitPayments'

export const metadata: Metadata = {
  title: 'Marketplace Split Payments: How They Work, What Breaks',
  description: 'How marketplace split payments actually work, the two models to choose between, and the five ways they quietly break trust with sellers.',
  alternates: { canonical: '/insights/marketplace-split-payments' },
  openGraph: {
    url: 'https://chosepayments.com/insights/marketplace-split-payments',
    images: ['/insights/marketplace-split-payments-cover.png'],
    title: 'Marketplace Split Payments: How They Work, What Breaks | ChosePayments',
    description: 'How marketplace split payments actually work, the two models to choose between, and the five ways they quietly break trust with sellers.',
    type: 'article',
  },
}

export default function Page() {
  return <MarketplaceSplitPayments />
}
