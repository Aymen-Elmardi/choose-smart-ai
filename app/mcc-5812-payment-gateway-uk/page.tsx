import type { Metadata } from 'next'
import { Suspense } from 'react'
import MCC5812Restaurants from '@/views/insights/provider-fit/MCC5812Restaurants'

export const metadata: Metadata = {
  title: 'MCC 5812 Payment Gateway UK: Best Options for Restaurants | ChosePayments',
  description: 'Restaurant and food service businesses need payment gateways that understand MCC 5812. Compare UK options that approve your business type.',
  alternates: { canonical: '/mcc-5812-payment-gateway-uk' },
  openGraph: {
    title: 'MCC 5812 Payment Gateway UK: Best Options for Restaurants | ChosePayments',
    description: 'Restaurant and food service businesses need payment gateways that understand MCC 5812. Compare UK options that approve your business type.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <MCC5812Restaurants />
    </Suspense>
  )
}
