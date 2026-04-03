import type { Metadata } from 'next'
import { Suspense } from 'react'
import MarketplaceSellerInfo from '@/views/insights/MarketplaceSellerInfo'

export const metadata: Metadata = {
  title: 'Marketplace Seller Information: What Providers Really Check | ChosePayments',
  description: 'Payment providers scrutinise marketplace seller data closely. Learn what information they request and how to structure your seller onboarding.',
  alternates: { canonical: '/insights/marketplace-seller-info' },
  openGraph: {
    title: 'Marketplace Seller Information: What Providers Really Check | ChosePayments',
    description: 'Payment providers scrutinise marketplace seller data closely. Learn what information they request and how to structure your seller onboarding.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <MarketplaceSellerInfo />
    </Suspense>
  )
}
