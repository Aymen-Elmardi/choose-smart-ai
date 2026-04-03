import type { Metadata } from 'next'
import { Suspense } from 'react'
import Insights from '@/views/Insights'

export const metadata: Metadata = {
  title: "Expert Insights: What Payment Providers Don't Tell You | ChosePayments",
  description: "Insider knowledge on payment provider risk, underwriting criteria, account freezes, and why businesses get rejected. Strategic guidance from industry experts.",
  keywords: [
    'payment provider insights',
    'payment risk',
    'underwriting criteria',
    'account freezes',
    'provider rejection',
  ],
  alternates: {
    canonical: '/insights',
  },
  openGraph: {
    title: "Expert Insights: What Payment Providers Don't Tell You | ChosePayments",
    description: "Insider knowledge on payment provider risk, underwriting criteria, account freezes, and why businesses get rejected. Strategic guidance from industry experts.",
    type: 'website',
  },
}

export default function Page() {
  return (
    <Suspense>
      <Insights />
    </Suspense>
  )
}
