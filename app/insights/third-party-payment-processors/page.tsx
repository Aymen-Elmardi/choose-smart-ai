import type { Metadata } from 'next'
import { Suspense } from 'react'
import ThirdPartyPaymentProcessors from '@/views/insights/ThirdPartyPaymentProcessors'

export const metadata: Metadata = {
  title: 'Third-Party Payment Processors Explained (2026 Guide)',
  description: 'A third-party payment processor lets you accept cards without your own merchant account. Here is how they work, what they cost, and when to move on from one.',
  alternates: { canonical: '/insights/third-party-payment-processors' },
  openGraph: {
    url: 'https://chosepayments.com/insights/third-party-payment-processors',
    images: ['/og-default.png'],
    title: 'Third-Party Payment Processors Explained (2026 Guide) | ChosePayments',
    description: 'A third-party payment processor lets you accept cards without your own merchant account. Here is how they work, what they cost, and when to move on from one.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <ThirdPartyPaymentProcessors />
    </Suspense>
  )
}
