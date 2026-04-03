import type { Metadata } from 'next'
import { Suspense } from 'react'
import EnterpriseProviderComparison from '@/views/insights/EnterpriseProviderComparison'

export const metadata: Metadata = {
  title: 'Enterprise Payment Provider Comparison: Adyen vs Stripe vs Checkout.com | ChosePayments',
  description: 'Comparing enterprise payment platforms? We break down Adyen, Stripe, and Checkout.com across pricing, integration, risk, and global reach.',
  alternates: { canonical: '/insights/enterprise-provider-comparison' },
  openGraph: {
    title: 'Enterprise Payment Provider Comparison: Adyen vs Stripe vs Checkout.com | ChosePayments',
    description: 'Comparing enterprise payment platforms? We break down Adyen, Stripe, and Checkout.com across pricing, integration, risk, and global reach.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <EnterpriseProviderComparison />
    </Suspense>
  )
}
