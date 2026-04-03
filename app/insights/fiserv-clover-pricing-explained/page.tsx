import type { Metadata } from 'next'
import { Suspense } from 'react'
import FiservCloverFees from '@/views/insights/FiservCloverFees'

export const metadata: Metadata = {
  title: 'Fiserv & Clover Pricing Explained | ChosePayments',
  description: 'Fiserv\'s pricing through Clover and their enterprise channels can be complex. A clear breakdown of their fee structures for UK and US merchants.',
  alternates: { canonical: '/insights/fiserv-clover-pricing-explained' },
  openGraph: {
    title: 'Fiserv & Clover Pricing Explained | ChosePayments',
    description: 'Fiserv\'s pricing through Clover and their enterprise channels can be complex. A clear breakdown of their fee structures for UK and US merchants.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <FiservCloverFees />
    </Suspense>
  )
}
