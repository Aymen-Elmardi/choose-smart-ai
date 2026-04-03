import type { Metadata } from 'next'
import { Suspense } from 'react'
import WhatIsAnAcquirer from '@/views/insights/WhatIsAnAcquirer'

export const metadata: Metadata = {
  title: 'What Is an Acquirer? Payment Acquiring Explained | ChosePayments',
  description: 'Acquirers are the banks behind your payment processor. Understanding the acquirer relationship explains fees, risk, and why some businesses get rejected.',
  alternates: { canonical: '/insights/what-is-an-acquirer' },
  openGraph: {
    title: 'What Is an Acquirer? Payment Acquiring Explained | ChosePayments',
    description: 'Acquirers are the banks behind your payment processor. Understanding the acquirer relationship explains fees, risk, and why some businesses get rejected.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <WhatIsAnAcquirer />
    </Suspense>
  )
}
