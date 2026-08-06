import type { Metadata } from 'next'
import { Suspense } from 'react'
import EnterpriseProviderComparison from '@/views/insights/EnterpriseProviderComparison'

export const metadata: Metadata = {
  title: 'Adyen vs Shift4 vs Checkout.com: Enterprise Pricing Compared 2026',
  description: 'Adyen, Shift4 or Checkout.com? Compare enterprise pricing, global acquiring and risk appetite side by side for 2026.',
  alternates: { canonical: '/insights/enterprise-provider-comparison' },
  openGraph: {
    url: 'https://chosepayments.com/insights/enterprise-provider-comparison',
    images: ['/og-default.png'],
    title: 'Adyen vs Shift4 vs Checkout.com: Enterprise Pricing Compared 2026 | ChosePayments',
    description: 'Adyen, Shift4 or Checkout.com? Compare enterprise pricing, global acquiring and risk appetite side by side for 2026.',
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
