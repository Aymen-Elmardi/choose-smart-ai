import type { Metadata } from 'next'
import { Suspense } from 'react'
import SupportMatters from '@/views/SupportMatters'

export const metadata: Metadata = {
  title: "Payment Provider Support Issues? Why It Matters More Than Fees",
  description: "Low fees mean nothing when your account is frozen and no one responds. Learn why support quality should be a top priority when choosing a payment provider.",
  alternates: {
    canonical: '/payment-provider-support',
  },
  openGraph: {
    title: "Payment Provider Support Issues? Why It Matters More Than Fees",
    description: "Low fees mean nothing when your account is frozen and no one responds. Learn why support quality should be a top priority when choosing a payment provider.",
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <SupportMatters />
    </Suspense>
  )
}
