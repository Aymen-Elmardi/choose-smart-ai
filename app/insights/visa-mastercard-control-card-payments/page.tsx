import type { Metadata } from 'next'
import { Suspense } from 'react'
import VisaMastercardControl from '@/views/insights/VisaMastercardControl'

export const metadata: Metadata = {
  title: 'How Visa & Mastercard Control Card Payments | ChosePayments',
  description: 'Visa and Mastercard set the rules that all payment providers follow. Understanding scheme rules explains why providers behave the way they do.',
  alternates: { canonical: '/insights/visa-mastercard-control-card-payments' },
  openGraph: {
    title: 'How Visa & Mastercard Control Card Payments | ChosePayments',
    description: 'Visa and Mastercard set the rules that all payment providers follow. Understanding scheme rules explains why providers behave the way they do.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <VisaMastercardControl />
    </Suspense>
  )
}
