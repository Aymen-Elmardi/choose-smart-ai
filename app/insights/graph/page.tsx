import type { Metadata } from 'next'
import { Suspense } from 'react'
import InsightsGraph from '@/views/InsightsGraph'

export const metadata: Metadata = {
  title: 'Provider Insights Graph | ChosePayments',
  description: 'Visual graph of payment provider relationships, risk profiles, and market positioning.',
  alternates: { canonical: '/insights/graph' },
  openGraph: { title: 'Provider Insights Graph | ChosePayments', description: 'Visual graph of payment provider relationships, risk profiles, and market positioning.', type: 'website' },
}

export default function Page() {
  return (
    <Suspense>
      <InsightsGraph />
    </Suspense>
  )
}
