import type { Metadata } from 'next'
import { Suspense } from 'react'
import PayoutSettlementExplained from '@/views/insights/PayoutSettlementExplained'

export const metadata: Metadata = {
  title: 'Payout & Settlement Explained: When Do You Get Paid? | ChosePayments',
  description: 'Settlement timing affects your cash flow. Learn how payment provider settlement cycles work and how to choose a provider with the right payout speed.',
  alternates: { canonical: '/insights/payout-settlement-explained' },
  openGraph: {
    title: 'Payout & Settlement Explained: When Do You Get Paid? | ChosePayments',
    description: 'Settlement timing affects your cash flow. Learn how payment provider settlement cycles work and how to choose a provider with the right payout speed.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <PayoutSettlementExplained />
    </Suspense>
  )
}
