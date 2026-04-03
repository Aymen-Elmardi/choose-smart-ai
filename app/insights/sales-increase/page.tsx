import type { Metadata } from 'next'
import { Suspense } from 'react'
import SalesIncrease from '@/views/insights/SalesIncrease'

export const metadata: Metadata = {
  title: 'Sales Increase Documentation: What Payment Providers Need | ChosePayments',
  description: 'When your sales spike, providers want proof it\'s legitimate. Learn exactly what documentation satisfies their review teams.',
  alternates: { canonical: '/insights/sales-increase' },
  openGraph: {
    title: 'Sales Increase Documentation: What Payment Providers Need | ChosePayments',
    description: 'When your sales spike, providers want proof it\'s legitimate. Learn exactly what documentation satisfies their review teams.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <SalesIncrease />
    </Suspense>
  )
}
