import type { Metadata } from 'next'
import { Suspense } from 'react'
import PaymentRisk from '@/views/insights/PaymentRisk'

export const metadata: Metadata = {
  title: "Payment Risk & Account Freezes | ChosePayments Insights",
  description: "Understand why payment accounts get flagged, frozen, or reviewed. Learn about account freezes, re-underwriting, and how to reduce payment risk.",
  alternates: {
    canonical: '/insights/payment-risk',
  },
  openGraph: {
    title: "Payment Risk & Account Freezes | ChosePayments Insights",
    description: "Understand why payment accounts get flagged, frozen, or reviewed. Learn about account freezes, re-underwriting, and how to reduce payment risk.",
    type: 'website',
  },
}

export default function Page() {
  return (
    <Suspense>
      <PaymentRisk />
    </Suspense>
  )
}
