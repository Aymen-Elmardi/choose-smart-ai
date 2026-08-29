import type { Metadata } from 'next'
import MarketplaceChickenAndEggProblem from '@/views/insights/MarketplaceChickenAndEggProblem'

export const metadata: Metadata = {
  title: 'The Chicken and Egg Problem: How Marketplaces Solve It',
  description: 'The chicken and egg problem stalls most marketplaces before launch. Real examples, 8 proven strategies, and the payout mistake that kills early supply.',
  alternates: { canonical: '/insights/marketplace-chicken-and-egg-problem' },
  openGraph: {
    url: 'https://chosepayments.com/insights/marketplace-chicken-and-egg-problem',
    images: ['/og-default.png'],
    title: 'The Chicken and Egg Problem: How Marketplaces Solve It | ChosePayments',
    description: 'The chicken and egg problem stalls most marketplaces before launch. Real examples, 8 proven strategies, and the payout mistake that kills early supply.',
    type: 'article',
  },
}

export default function Page() {
  return <MarketplaceChickenAndEggProblem />
}
