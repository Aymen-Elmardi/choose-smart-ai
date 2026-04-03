import type { Metadata } from 'next'
import { Suspense } from 'react'
import WhyProvidersImposeReserves from '@/views/insights/WhyProvidersImposeReserves'

export const metadata: Metadata = {
  title: 'Why Payment Providers Impose Rolling Reserves | ChosePayments',
  description: 'Rolling reserves hold back a percentage of your revenue. Learn why providers impose them, how long they last, and how to negotiate their removal.',
  alternates: { canonical: '/insights/why-providers-impose-reserves' },
  openGraph: {
    title: 'Why Payment Providers Impose Rolling Reserves | ChosePayments',
    description: 'Rolling reserves hold back a percentage of your revenue. Learn why providers impose them, how long they last, and how to negotiate their removal.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <WhyProvidersImposeReserves />
    </Suspense>
  )
}
