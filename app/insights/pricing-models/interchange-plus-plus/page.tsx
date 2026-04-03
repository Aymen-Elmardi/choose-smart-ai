import type { Metadata } from 'next'
import { Suspense } from 'react'
import InterchangePlusPlus from '@/views/insights/pricing/InterchangePlusPlus'

export const metadata: Metadata = {
  title: 'Interchange++ Pricing Explained: The Transparent Fee Model | ChosePayments',
  description: 'Interchange++ passes through exact card scheme costs plus a fixed markup. Learn how to read an Interchange++ statement and whether it\'s right for you.',
  alternates: { canonical: '/insights/pricing-models/interchange-plus-plus' },
  openGraph: {
    title: 'Interchange++ Pricing Explained: The Transparent Fee Model | ChosePayments',
    description: 'Interchange++ passes through exact card scheme costs plus a fixed markup. Learn how to read an Interchange++ statement and whether it\'s right for you.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <InterchangePlusPlus />
    </Suspense>
  )
}
