import type { Metadata } from 'next'
import { Suspense } from 'react'
import SameDaySettlementAndInstantPayouts from '@/views/insights/SameDaySettlementAndInstantPayouts'

export const metadata: Metadata = {
  title: 'Same-Day Settlement & Instant Payouts: Which Providers Offer It | ChosePayments',
  description: 'Cash flow depends on settlement speed. Compare which payment providers offer same-day settlement and instant payouts for UK merchants.',
  alternates: { canonical: '/insights/same-day-settlement-and-instant-payouts' },
  openGraph: {
    title: 'Same-Day Settlement & Instant Payouts: Which Providers Offer It | ChosePayments',
    description: 'Cash flow depends on settlement speed. Compare which payment providers offer same-day settlement and instant payouts for UK merchants.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <SameDaySettlementAndInstantPayouts />
    </Suspense>
  )
}
