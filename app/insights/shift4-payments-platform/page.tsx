import type { Metadata } from 'next'
import { Suspense } from 'react'
import Shift4PaymentsPlatform from '@/views/insights/Shift4PaymentsPlatform'

export const metadata: Metadata = {
  title: 'Shift4 Payments Explained: What 200,000+ Merchants Already Know',
  description: 'Shift4 powers 200,000+ hospitality, restaurant and retail merchants. See what makes it different from standard processors.',
  alternates: { canonical: '/insights/shift4-payments-platform' },
  openGraph: {
    url: 'https://chosepayments.com/insights/shift4-payments-platform',
    images: ['/og-default.png'],
    title: 'Shift4 Payments Explained: What 200,000+ Merchants Already Know | ChosePayments',
    description: 'Shift4 powers 200,000+ hospitality, restaurant and retail merchants. See what makes it different from standard processors.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <Shift4PaymentsPlatform />
    </Suspense>
  )
}
