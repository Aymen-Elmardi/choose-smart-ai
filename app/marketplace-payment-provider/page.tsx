import type { Metadata } from 'next'
import { Suspense } from 'react'
import MarketplacePlatforms from '@/views/MarketplacePlatforms'

export const metadata: Metadata = {
  title: "Marketplace Payment Risk Assessment: Why Platforms Get Extra Scrutiny",
  description: "Building a marketplace? Understand why payment providers scrutinise platforms differently — and which providers actually fit your compliance and payout needs.",
  keywords: [
    'marketplace payment risk',
    'platform payment assessment',
    'split payments UK',
    'marketplace compliance',
  ],
  alternates: {
    canonical: '/marketplace-payment-provider',
  },
  openGraph: {
    title: "Marketplace Payment Risk Assessment: Why Platforms Get Extra Scrutiny",
    description: "Building a marketplace? Understand why payment providers scrutinise platforms differently — and which providers actually fit your compliance and payout needs.",
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <MarketplacePlatforms />
    </Suspense>
  )
}
