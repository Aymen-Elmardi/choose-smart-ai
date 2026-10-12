import type { Metadata } from 'next'
import StatementReview from '@/views/StatementReview'

export const metadata: Metadata = {
  title: "See If You're Overpaying — Free Statement Review",
  description:
    "Upload your processing statement and get an indicative read on your all-in effective rate and any hidden fees. Free, confidential and takes about a minute.",
  alternates: { canonical: '/statement-review' },
  openGraph: {
    url: 'https://chosepayments.com/statement-review',
    images: ['/og-default.png'],
    title: "See If You're Overpaying — Free Statement Review | ChosePayments",
    description:
      "Upload your processing statement and get an indicative read on your all-in effective rate and any hidden fees. Free, confidential and takes about a minute.",
    type: 'website',
  },
}

export default function Page() {
  return <StatementReview />
}
