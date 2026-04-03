import type { Metadata } from 'next'
import { Suspense } from 'react'
import RejectedHighRiskStrategy from '@/views/insights/crisis/RejectedHighRiskStrategy'

export const metadata: Metadata = {
  title: 'Rejected as High Risk: Your Strategy Guide | ChosePayments',
  description: 'Been rejected as high risk? This guide covers your options: which providers accept high-risk merchants and how to position your application.',
  alternates: { canonical: '/insights/crisis/rejected-high-risk-strategy' },
  openGraph: {
    title: 'Rejected as High Risk: Your Strategy Guide | ChosePayments',
    description: 'Been rejected as high risk? This guide covers your options: which providers accept high-risk merchants and how to position your application.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <RejectedHighRiskStrategy />
    </Suspense>
  )
}
