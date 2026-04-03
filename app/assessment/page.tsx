import type { Metadata } from 'next'
import { Suspense } from 'react'
import Quiz from '@/views/Quiz'

export const metadata: Metadata = {
  title: 'Free Payment Provider Assessment | ChosePayments',
  description: 'Answer a few questions about your business and get a personalised payment provider recommendation in under 2 minutes.',
  alternates: { canonical: '/assessment' },
  openGraph: { title: 'Free Payment Provider Assessment | ChosePayments', description: 'Answer a few questions about your business and get a personalised payment provider recommendation.', type: 'website' },
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <Quiz />
    </Suspense>
  )
}
