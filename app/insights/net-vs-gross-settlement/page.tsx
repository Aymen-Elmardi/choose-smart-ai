import type { Metadata } from 'next'
import { Suspense } from 'react'
import NetVsGrossSettlement from '@/views/insights/NetVsGrossSettlement'

export const metadata: Metadata = {
  title: 'Net vs Gross Settlement: What It Means for Your Cash Flow | ChosePayments',
  description: 'Net settlement deducts fees before paying you. Gross settlement pays the full amount then invoices separately. Learn which is better for your business.',
  alternates: { canonical: '/insights/net-vs-gross-settlement' },
  openGraph: {
    title: 'Net vs Gross Settlement: What It Means for Your Cash Flow | ChosePayments',
    description: 'Net settlement deducts fees before paying you. Gross settlement pays the full amount then invoices separately. Learn which is better for your business.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <NetVsGrossSettlement />
    </Suspense>
  )
}
