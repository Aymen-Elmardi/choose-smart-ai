import type { Metadata } from 'next'
import { Suspense } from 'react'
import EnterpriseProviderComparison from '@/views/insights/EnterpriseProviderComparison'

export const metadata: Metadata = {
  title: 'Enterprise Payment Provider Comparison: Adyen vs Shift4 vs Checkout.com (2026)',
  description: 'Comparing enterprise payment providers? We break down Adyen, Shift4, and Checkout.com across pricing, global acquiring, risk appetite, and UK suitability for 2026.',
  alternates: { canonical: '/insights/enterprise-provider-comparison' },
  openGraph: {
    title: 'Enterprise Payment Provider Comparison: Adyen vs Shift4 vs Checkout.com (2026) | ChosePayments',
    description: 'Comparing enterprise payment providers? We break down Adyen, Shift4, and Checkout.com across pricing, global acquiring, risk appetite, and UK suitability for 2026.',
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
