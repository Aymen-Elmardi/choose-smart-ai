import type { Metadata } from 'next'
import { Suspense } from 'react'
import FiservPaymentsPlatform from '@/views/insights/FiservPaymentsPlatform'

export const metadata: Metadata = {
  title: 'Fiserv Payments Platform: What Merchants Need to Know | ChosePayments',
  description: 'Fiserv is one of the world\'s largest payment processors. Learn about their Clover and Carat platforms and when Fiserv makes sense for your business.',
  alternates: { canonical: '/insights/fiserv-payments-platform' },
  openGraph: {
    title: 'Fiserv Payments Platform: What Merchants Need to Know | ChosePayments',
    description: 'Fiserv is one of the world\'s largest payment processors. Learn about their Clover and Carat platforms and when Fiserv makes sense for your business.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <FiservPaymentsPlatform />
    </Suspense>
  )
}
