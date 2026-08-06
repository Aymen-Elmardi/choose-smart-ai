import type { Metadata } from 'next'
import { Suspense } from 'react'
import FiservCloverFees from '@/views/insights/FiservCloverFees'

export const metadata: Metadata = {
  title: 'Clover POS Pricing 2026: Hardware From $49, Fees Explained',
  description: 'Clover pricing starts at $49 for the Go reader. Full breakdown of hardware, monthly software fees and card processing rates for 2026.',
  alternates: { canonical: '/insights/fiserv-clover-pricing-explained' },
  openGraph: {
    url: 'https://chosepayments.com/insights/fiserv-clover-pricing-explained',
    images: ['/og-default.png'],
    title: 'Clover POS Pricing 2026: Hardware From $49, Fees Explained | ChosePayments',
    description: 'Clover pricing starts at $49 for the Go reader. Full breakdown of hardware, monthly software fees and card processing rates for 2026.',
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
