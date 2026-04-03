import type { Metadata } from 'next'
import { Suspense } from 'react'
import ChargebackThresholds from '@/views/insights/ecommerce/ChargebackThresholds'

export const metadata: Metadata = {
  title: 'Chargeback Thresholds & High-Risk Processors: What to Know | ChosePayments',
  description: 'Visa and Mastercard set chargeback thresholds that trigger monitoring programmes. Learn the limits, consequences, and which processors work above standard thresholds.',
  alternates: { canonical: '/insights/ecommerce/chargeback-thresholds-high-risk-processors' },
  openGraph: {
    title: 'Chargeback Thresholds & High-Risk Processors: What to Know | ChosePayments',
    description: 'Visa and Mastercard set chargeback thresholds that trigger monitoring programmes. Learn the limits, consequences, and which processors work above standard thresholds.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <ChargebackThresholds />
    </Suspense>
  )
}
