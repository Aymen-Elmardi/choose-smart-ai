import type { Metadata } from 'next'
import { Suspense } from 'react'
import Guides from '@/views/insights/Guides'

export const metadata: Metadata = {
  title: "Practical Guides | ChosePayments Insights",
  description: "Step-by-step guides on payment provider verification, documentation requirements, and how to respond to compliance requests.",
  alternates: {
    canonical: '/insights/guides',
  },
  openGraph: {
    title: "Practical Guides | ChosePayments Insights",
    description: "Step-by-step guides on payment provider verification, documentation requirements, and how to respond to compliance requests.",
    type: 'website',
  },
}

export default function Page() {
  return (
    <Suspense>
      <Guides />
    </Suspense>
  )
}
