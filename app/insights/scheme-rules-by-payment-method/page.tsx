import type { Metadata } from 'next'
import { Suspense } from 'react'
import SchemeRulesByPaymentMethod from '@/views/insights/SchemeRulesByPaymentMethod'

export const metadata: Metadata = {
  title: 'Scheme Rules by Payment Method | ChosePayments',
  description: 'Different payment methods have different scheme rules. Understand how rules vary for debit, credit, corporate cards, and wallet payments.',
  alternates: { canonical: '/insights/scheme-rules-by-payment-method' },
  openGraph: {
    title: 'Scheme Rules by Payment Method | ChosePayments',
    description: 'Different payment methods have different scheme rules. Understand how rules vary for debit, credit, corporate cards, and wallet payments.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <SchemeRulesByPaymentMethod />
    </Suspense>
  )
}
