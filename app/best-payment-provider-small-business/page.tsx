import type { Metadata } from 'next'
import { Suspense } from 'react'
import SmallBusiness from '@/views/SmallBusiness'

export const metadata: Metadata = {
  title: "Small Business Payment Risk: Finding a Provider That Won't Freeze You",
  description: "Most small businesses choose a payment provider too quickly — and regret it. Understand your risk profile and find a provider that actually fits your business.",
  keywords: [
    'small business payment risk',
    'payment provider fit',
    'UK small business payments',
    'provider approval',
  ],
  alternates: {
    canonical: '/best-payment-provider-small-business',
  },
  openGraph: {
    title: "Small Business Payment Risk: Finding a Provider That Won't Freeze You",
    description: "Most small businesses choose a payment provider too quickly — and regret it. Understand your risk profile and find a provider that actually fits your business.",
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <SmallBusiness />
    </Suspense>
  )
}
