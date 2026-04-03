import type { Metadata } from 'next'
import { Suspense } from 'react'
import Shift4PaymentsPlatform from '@/views/insights/Shift4PaymentsPlatform'

export const metadata: Metadata = {
  title: 'Shift4 Payments Platform: Enterprise Features for Hospitality & Retail | ChosePayments',
  description: 'Shift4 powers large hospitality, restaurant, and retail payment operations. Learn what makes their platform different from standard processors.',
  alternates: { canonical: '/insights/shift4-payments-platform' },
  openGraph: {
    title: 'Shift4 Payments Platform: Enterprise Features for Hospitality & Retail | ChosePayments',
    description: 'Shift4 powers large hospitality, restaurant, and retail payment operations. Learn what makes their platform different from standard processors.',
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
