import type { Metadata } from 'next'
import { Suspense } from 'react'
import WhatIsAPaymentProcessor from '@/views/insights/WhatIsAPaymentProcessor'

export const metadata: Metadata = {
  title: 'What Is a Payment Processor? How It Works and Why It Matters (2026)',
  description: 'A payment processor moves the transaction data between a merchant, the card networks, and the issuing bank. Here is exactly how that works, who the major players are, and why the choice matters more than the rate on the page.',
  alternates: { canonical: '/insights/what-is-a-payment-processor' },
  openGraph: {
    url: 'https://chosepayments.com/insights/what-is-a-payment-processor',
    images: ['/og-default.png'],
    title: 'What Is a Payment Processor? How It Works and Why It Matters (2026) | ChosePayments',
    description: 'A payment processor moves the transaction data between a merchant, the card networks, and the issuing bank. Here is exactly how that works, who the major players are, and why the choice matters more than the rate on the page.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <WhatIsAPaymentProcessor />
    </Suspense>
  )
}
