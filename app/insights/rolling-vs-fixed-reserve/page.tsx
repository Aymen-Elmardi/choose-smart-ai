import type { Metadata } from 'next'
import { Suspense } from 'react'
import RollingVsFixedReserve from '@/views/insights/RollingVsFixedReserve'

export const metadata: Metadata = {
  title: 'Rolling vs Fixed Reserve: What\'s the Difference? | ChosePayments',
  description: 'Payment providers use both rolling and fixed reserves. Learn how each type works, which is better for your cash flow, and how to negotiate.',
  alternates: { canonical: '/insights/rolling-vs-fixed-reserve' },
  openGraph: {
    title: 'Rolling vs Fixed Reserve: What\'s the Difference? | ChosePayments',
    description: 'Payment providers use both rolling and fixed reserves. Learn how each type works, which is better for your cash flow, and how to negotiate.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <RollingVsFixedReserve />
    </Suspense>
  )
}
