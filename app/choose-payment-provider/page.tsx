import type { Metadata } from 'next'
import { Suspense } from 'react'
import ChooseProvider from '@/views/ChooseProvider'

export const metadata: Metadata = {
  title: "How to Choose the Right Payment Provider | UK & EU Guide",
  description: "Confused by Stripe, Worldpay, Square or others? Learn how to choose the right payment provider based on your business model, not just price.",
  alternates: {
    canonical: '/choose-payment-provider',
  },
  openGraph: {
    title: "How to Choose the Right Payment Provider | UK & EU Guide",
    description: "Confused by Stripe, Worldpay, Square or others? Learn how to choose the right payment provider based on your business model, not just price.",
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <ChooseProvider />
    </Suspense>
  )
}
