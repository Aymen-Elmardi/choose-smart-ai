import type { Metadata } from 'next'
import { Suspense } from 'react'
import AdyenEnterprisePlatform from '@/views/insights/AdyenEnterprisePlatform'

export const metadata: Metadata = {
  title: 'Adyen for Enterprises: When It\'s Better Than Stripe',
  description: 'Adyen vs Stripe for enterprise. Unified platform, global reach, lower fees at scale. See if Adyen\'s infrastructure fits your business model and volume needs.',
  alternates: { canonical: '/insights/adyen-enterprise-payments-platform' },
  openGraph: { title: 'Adyen for Enterprises: When It\'s Better Than Stripe', description: 'Adyen vs Stripe for enterprise. Unified platform, global reach, lower fees at scale.', type: 'article' },
}

export default function Page() {
  return (
    <Suspense>
      <AdyenEnterprisePlatform />
    </Suspense>
  )
}
