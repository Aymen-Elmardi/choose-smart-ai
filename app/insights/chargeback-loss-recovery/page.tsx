import type { Metadata } from 'next'
import { Suspense } from 'react'
import ChargebackLossRecovery from '@/views/insights/ChargebackLossRecovery'

export const metadata: Metadata = {
  title: 'Chargeback Loss Recovery: How to Fight & Win Disputes | ChosePayments',
  description: 'Not all chargebacks are legitimate. Learn how to build evidence packs, submit representments, and recover revenue from fraudulent disputes.',
  alternates: { canonical: '/insights/chargeback-loss-recovery' },
  openGraph: {
    title: 'Chargeback Loss Recovery: How to Fight & Win Disputes | ChosePayments',
    description: 'Not all chargebacks are legitimate. Learn how to build evidence packs, submit representments, and recover revenue from fraudulent disputes.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <ChargebackLossRecovery />
    </Suspense>
  )
}
