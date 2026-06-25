import type { Metadata } from 'next'
import { Suspense } from 'react'
import BuyNowPayLaterUK from '@/views/insights/BuyNowPayLaterUK'

export const metadata: Metadata = {
  title: 'Buy Now Pay Later for UK Merchants: The Practical Guide',
  description: 'BNPL can lift conversion rates by 20–30% and increase average order value significantly. How UK merchants should evaluate Klarna, Clearpay, and other providers — and what it means for your payment stack.',
  alternates: { canonical: '/insights/buy-now-pay-later-uk' },
  openGraph: {
    url: 'https://chosepayments.com/insights/buy-now-pay-later-uk',
    images: ['/og-default.png'],
    title: 'Buy Now Pay Later for UK Merchants: The Practical Guide | ChosePayments',
    description: 'BNPL can lift conversion rates by 20–30% and increase average order value significantly. How UK merchants should evaluate Klarna, Clearpay, and other providers.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <BuyNowPayLaterUK />
    </Suspense>
  )
}
