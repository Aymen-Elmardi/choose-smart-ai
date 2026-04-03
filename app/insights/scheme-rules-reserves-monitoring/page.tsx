import type { Metadata } from 'next'
import { Suspense } from 'react'
import SchemeRulesReservesMonitoring from '@/views/insights/SchemeRulesReservesMonitoring'

export const metadata: Metadata = {
  title: 'Scheme Rules: Reserves & Monitoring | ChosePayments',
  description: 'Card scheme monitoring programmes can trigger rolling reserves. Learn how Visa and Mastercard monitor merchants and what to do if you\'re flagged.',
  alternates: { canonical: '/insights/scheme-rules-reserves-monitoring' },
  openGraph: {
    title: 'Scheme Rules: Reserves & Monitoring | ChosePayments',
    description: 'Card scheme monitoring programmes can trigger rolling reserves. Learn how Visa and Mastercard monitor merchants and what to do if you\'re flagged.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <SchemeRulesReservesMonitoring />
    </Suspense>
  )
}
