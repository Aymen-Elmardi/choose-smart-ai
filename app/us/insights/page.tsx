import type { Metadata } from 'next'
import { Suspense } from 'react'
import Insights from '@/views/Insights'

export const metadata: Metadata = {
  title: "Payments Insights: What Providers Don't Tell You",
  description: "Insider knowledge on payment provider risk, underwriting, account freezes, chargebacks, and why businesses get rejected. Strategic guidance for merchants.",
  keywords: [
    'payment provider insights',
    'payment risk',
    'underwriting criteria',
    'account freezes',
    'chargebacks',
    'provider rejection',
  ],
  alternates: {
    canonical: '/us/insights',
    languages: {
      'en-GB': 'https://chosepayments.com/insights',
      'en-US': 'https://chosepayments.com/us/insights',
      'x-default': 'https://chosepayments.com/insights',
    },
  },
  openGraph: {
    url: 'https://chosepayments.com/us/insights',
    images: ['/og-default.png'],
    title: "Payments Insights: What Providers Don't Tell You | ChosePayments",
    description: "Insider knowledge on payment provider risk, underwriting, account freezes, chargebacks, and why businesses get rejected. Strategic guidance for merchants.",
    type: 'website',
  },
}

export default function Page() {
  return (
    <Suspense>
      <Insights globalOnly />
    </Suspense>
  )
}
