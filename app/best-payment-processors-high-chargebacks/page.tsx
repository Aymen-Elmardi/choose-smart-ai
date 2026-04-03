import type { Metadata } from 'next'
import { Suspense } from 'react'
import HighChargebackProcessors from '@/views/insights/provider-fit/HighChargebackProcessors'

export const metadata: Metadata = {
  title: 'Best Payment Processors for High Chargeback Businesses | ChosePayments',
  description: 'High chargeback rates don\'t have to mean rejection. Find payment processors that work with your chargeback ratio and won\'t freeze your funds.',
  alternates: { canonical: '/best-payment-processors-high-chargebacks' },
  openGraph: {
    title: 'Best Payment Processors for High Chargeback Businesses | ChosePayments',
    description: 'High chargeback rates don\'t have to mean rejection. Find payment processors that work with your chargeback ratio and won\'t freeze your funds.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <HighChargebackProcessors />
    </Suspense>
  )
}
