import type { Metadata } from 'next'
import { Suspense } from 'react'
import MarketplacePaymentsGuide from '@/views/insights/MarketplacePaymentsGuide'

export const metadata: Metadata = {
  title: 'Marketplace Payments Guide: Split Payments & Platform Compliance | ChosePayments',
  description: 'Marketplaces have complex payment needs: split payments, seller onboarding, KYC, reserves. A complete guide to payments for platform businesses.',
  alternates: { canonical: '/insights/marketplace-payments-guide' },
  openGraph: {
    title: 'Marketplace Payments Guide: Split Payments & Platform Compliance | ChosePayments',
    description: 'Marketplaces have complex payment needs: split payments, seller onboarding, KYC, reserves. A complete guide to payments for platform businesses.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <MarketplacePaymentsGuide />
    </Suspense>
  )
}
