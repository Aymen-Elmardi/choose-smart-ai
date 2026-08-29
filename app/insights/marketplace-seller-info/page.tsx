import type { Metadata } from 'next'
import MarketplaceSellerInfo from '@/views/insights/MarketplaceSellerInfo'

export const metadata: Metadata = {
  title: 'Marketplace Seller Verification: What Providers Require',
  description: 'Marketplaces face KYB/KYC checks payment providers rarely explain clearly. See exactly what seller documents are required and how to avoid payout delays.',
  alternates: { canonical: '/insights/marketplace-seller-info' },
  openGraph: {
    url: 'https://chosepayments.com/insights/marketplace-seller-info',
    images: ['/og-default.png'],
    title: 'Marketplace Seller Verification: What Providers Require | ChosePayments',
    description: 'Marketplaces face KYB/KYC checks payment providers rarely explain clearly. See exactly what seller documents are required and how to avoid payout delays.',
    type: 'article',
  },
}

export default function Page() {
  return <MarketplaceSellerInfo />
}
