import type { Metadata } from 'next'
import { Suspense } from 'react'
import OpenBankingPaymentsUK from '@/views/insights/OpenBankingPaymentsUK'

export const metadata: Metadata = {
  title: 'Open Banking Payments UK: What Merchants Need to Know | ChosePayments',
  description: 'Open banking is changing how UK merchants get paid. Learn how account-to-account payments work and when they make sense for your business.',
  alternates: { canonical: '/insights/open-banking-payments-uk' },
  openGraph: {
    title: 'Open Banking Payments UK: What Merchants Need to Know | ChosePayments',
    description: 'Open banking is changing how UK merchants get paid. Learn how account-to-account payments work and when they make sense for your business.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <OpenBankingPaymentsUK />
    </Suspense>
  )
}
