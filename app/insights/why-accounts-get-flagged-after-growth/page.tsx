import type { Metadata } from 'next'
import { Suspense } from 'react'
import WhyAccountsFlaggedAfterGrowth from '@/views/insights/WhyAccountsFlaggedAfterGrowth'

export const metadata: Metadata = {
  title: 'Why Payment Accounts Get Flagged After Business Growth | ChosePayments',
  description: 'Growing too fast can trigger a payment provider review. Learn why rapid growth flags accounts and how to document your growth to avoid disruption.',
  alternates: { canonical: '/insights/why-accounts-get-flagged-after-growth' },
  openGraph: {
    title: 'Why Payment Accounts Get Flagged After Business Growth | ChosePayments',
    description: 'Growing too fast can trigger a payment provider review. Learn why rapid growth flags accounts and how to document your growth to avoid disruption.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <WhyAccountsFlaggedAfterGrowth />
    </Suspense>
  )
}
