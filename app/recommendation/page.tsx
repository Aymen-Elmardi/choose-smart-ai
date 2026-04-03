import type { Metadata } from 'next'
import { Suspense } from 'react'
import Recommendation from '@/views/Recommendation'

export const metadata: Metadata = {
  title: 'Your Recommendation | ChosePayments',
  description: 'Your personalised payment provider recommendation based on your business profile.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <Recommendation />
    </Suspense>
  )
}
