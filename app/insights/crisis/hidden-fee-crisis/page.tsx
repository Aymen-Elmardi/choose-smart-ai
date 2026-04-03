import type { Metadata } from 'next'
import { Suspense } from 'react'
import HiddenFeeCrisis from '@/views/insights/crisis/HiddenFeeCrisis'

export const metadata: Metadata = {
  title: 'Hidden Fee Crisis: When Your Provider Costs More Than You Thought | ChosePayments',
  description: 'Discovered hidden fees eating your margins? A practical guide to auditing your payment costs and switching without disruption.',
  alternates: { canonical: '/insights/crisis/hidden-fee-crisis' },
  openGraph: {
    title: 'Hidden Fee Crisis: When Your Provider Costs More Than You Thought | ChosePayments',
    description: 'Discovered hidden fees eating your margins? A practical guide to auditing your payment costs and switching without disruption.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <HiddenFeeCrisis />
    </Suspense>
  )
}
