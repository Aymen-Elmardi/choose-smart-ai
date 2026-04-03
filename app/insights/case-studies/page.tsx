import type { Metadata } from 'next'
import { Suspense } from 'react'
import CaseStudies from '@/views/insights/CaseStudies'

export const metadata: Metadata = {
  title: "Case Studies | ChosePayments Insights",
  description: "Real-world examples of how businesses navigate payment provider challenges, account reviews, and compliance requirements.",
  alternates: {
    canonical: '/insights/case-studies',
  },
  openGraph: {
    title: "Case Studies | ChosePayments Insights",
    description: "Real-world examples of how businesses navigate payment provider challenges, account reviews, and compliance requirements.",
    type: 'website',
  },
}

export default function Page() {
  return (
    <Suspense>
      <CaseStudies />
    </Suspense>
  )
}
