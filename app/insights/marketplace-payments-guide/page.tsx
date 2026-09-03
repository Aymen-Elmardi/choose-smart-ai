import type { Metadata } from 'next'
import MarketplacePaymentsGuide from '@/views/insights/MarketplacePaymentsGuide'

export const metadata: Metadata = {
  title: 'Marketplace Payments Guide: Splits, Risk & Compliance',
  description: 'A complete guide to marketplace payments: how split payments, seller compliance, chargebacks, and risk reviews work, and how to avoid a frozen account.',
  alternates: { canonical: '/insights/marketplace-payments-guide' },
  openGraph: {
    url: 'https://chosepayments.com/insights/marketplace-payments-guide',
    images: ['/insights/marketplace-payments-guide-cover.png'],
    title: 'Marketplace Payments Guide: Splits, Risk & Compliance | ChosePayments',
    description: 'A complete guide to marketplace payments: how split payments, seller compliance, chargebacks, and risk reviews work, and how to avoid a frozen account.',
    type: 'article',
  },
}

export default function Page() {
  return <MarketplacePaymentsGuide />
}
