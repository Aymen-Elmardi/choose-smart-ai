import type { Metadata } from 'next'
import { Suspense } from 'react'
import MarketplaceTakeRate from '@/views/insights/MarketplaceTakeRate'

export const metadata: Metadata = {
  title: 'Marketplace Take Rate: What to Actually Charge in 2026',
  description: 'Marketplace take rate benchmarks by industry, the real formula, and the payment processing cost most founders forget to subtract first.',
  alternates: { canonical: '/insights/marketplace-take-rate' },
  openGraph: {
    url: 'https://chosepayments.com/insights/marketplace-take-rate',
    images: ['/og-default.png'],
    title: 'Marketplace Take Rate: What to Actually Charge in 2026 | ChosePayments',
    description: 'Marketplace take rate benchmarks by industry, the real formula, and the payment processing cost most founders forget to subtract first.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <MarketplaceTakeRate />
    </Suspense>
  )
}
