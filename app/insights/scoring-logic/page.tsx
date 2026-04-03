import type { Metadata } from 'next'
import { Suspense } from 'react'
import ScoringLogic from '@/views/ScoringLogic'

export const metadata: Metadata = {
  title: 'How We Match You to a Provider | Scoring Logic Explained | ChosePayments',
  description: 'See exactly how our recommendation engine eliminates, scores, and ranks 21 payment providers. No black boxes — full transparency.',
  alternates: { canonical: '/insights/scoring-logic' },
  openGraph: { title: 'How We Match You to a Provider | Scoring Logic Explained', description: 'See exactly how our recommendation engine eliminates, scores, and ranks 21 payment providers.', type: 'article' },
}

export default function Page() {
  return (
    <Suspense>
      <ScoringLogic />
    </Suspense>
  )
}
