import type { Metadata } from 'next'
import { Suspense } from 'react'
import MarketplaceLiquidity from '@/views/insights/MarketplaceLiquidity'

export const metadata: Metadata = {
  title: "What Is Marketplace Liquidity? A Founder's Guide",
  description: 'Marketplace liquidity explained with real formulas, benchmarks by stage, and the payout problem most guides never mention.',
  alternates: { canonical: '/insights/marketplace-liquidity' },
  openGraph: {
    url: 'https://chosepayments.com/insights/marketplace-liquidity',
    images: ['/og-default.png'],
    title: "What Is Marketplace Liquidity? A Founder's Guide | ChosePayments",
    description: 'Marketplace liquidity explained with real formulas, benchmarks by stage, and the payout problem most guides never mention.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <MarketplaceLiquidity />
    </Suspense>
  )
}
