import type { Metadata } from 'next'
import { Suspense } from 'react'
import ComplianceIndex from '@/views/insights/ComplianceIndex'

export const metadata: Metadata = {
  title: 'Payment Compliance: Scheme Rules, Reserves & Monitoring',
  description: 'How Visa and Mastercard scheme rules, reserve requirements, and monitoring programmes actually work — and what triggers them for merchants.',
  alternates: { canonical: '/insights/compliance' },
  openGraph: {
    url: 'https://chosepayments.com/insights/compliance',
    images: ['/og-default.png'],
    title: 'Payment Compliance: Scheme Rules, Reserves & Monitoring | ChosePayments',
    description: 'How Visa and Mastercard scheme rules, reserves, and monitoring programmes actually work.',
    type: 'website',
  },
}

export default function Page() {
  return (
    <Suspense>
      <ComplianceIndex />
    </Suspense>
  )
}
