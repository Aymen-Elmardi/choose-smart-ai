import type { Metadata } from 'next'
import { Suspense } from 'react'
import PayPalPaymentPlatform from '@/views/insights/PayPalPaymentPlatform'

export const metadata: Metadata = {
  title: 'PayPal for Business: Platform Overview & When It Fits | ChosePayments',
  description: 'PayPal remains one of the world\'s most recognised payment brands. Learn when it\'s the right choice and when its limitations will cost you.',
  alternates: { canonical: '/insights/paypal-payment-platform' },
  openGraph: {
    title: 'PayPal for Business: Platform Overview & When It Fits | ChosePayments',
    description: 'PayPal remains one of the world\'s most recognised payment brands. Learn when it\'s the right choice and when its limitations will cost you.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <PayPalPaymentPlatform />
    </Suspense>
  )
}
