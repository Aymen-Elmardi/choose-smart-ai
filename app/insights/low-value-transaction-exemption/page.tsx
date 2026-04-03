import type { Metadata } from 'next'
import { Suspense } from 'react'
import LowValueTransactionExemption from '@/views/insights/LowValueTransactionExemption'

export const metadata: Metadata = {
  title: 'Low Value Transaction Exemption: Reduce SCA Friction | ChosePayments',
  description: 'The low value exemption lets you skip SCA for small transactions. Learn how it works, the thresholds, and how to configure it with your payment provider.',
  alternates: { canonical: '/insights/low-value-transaction-exemption' },
  openGraph: {
    title: 'Low Value Transaction Exemption: Reduce SCA Friction | ChosePayments',
    description: 'The low value exemption lets you skip SCA for small transactions. Learn how it works, the thresholds, and how to configure it with your payment provider.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <LowValueTransactionExemption />
    </Suspense>
  )
}
