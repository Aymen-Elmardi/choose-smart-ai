import type { Metadata } from 'next'
import { Suspense } from 'react'
import WhatToDoWhenFundsHeld from '@/views/insights/WhatToDoWhenFundsHeld'

export const metadata: Metadata = {
  title: 'What To Do When a Payment Provider Holds Your Funds | ChosePayments',
  description: 'Funds held or frozen by your payment provider? Step-by-step guidance on how to respond, what to provide, and how to recover access quickly.',
  alternates: { canonical: '/insights/what-to-do-when-funds-held' },
  openGraph: {
    title: 'What To Do When a Payment Provider Holds Your Funds | ChosePayments',
    description: 'Funds held or frozen by your payment provider? Step-by-step guidance on how to respond, what to provide, and how to recover access quickly.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <WhatToDoWhenFundsHeld />
    </Suspense>
  )
}
