import type { Metadata } from 'next'
import { Suspense } from 'react'
import StatementReview from '@/views/StatementReview'

export const metadata: Metadata = {
  title: "See If You're Overpaying — Free Statement Review",
  description:
    "Upload your payment processing statement and get an indicative read on your all-in effective rate and whether you may be overpaying. Free and confidential.",
  alternates: { canonical: '/statement-review' },
  openGraph: {
    url: 'https://chosepayments.com/statement-review',
    images: ['/og-default.png'],
    title: "See If You're Overpaying — Free Statement Review | ChosePayments",
    description:
      "Upload your payment processing statement and get an indicative read on your all-in effective rate and whether you may be overpaying.",
    type: 'website',
  },
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <StatementReview />
    </Suspense>
  )
}
