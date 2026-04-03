import type { Metadata } from 'next'
import { Suspense } from 'react'
import WhyAccountsFrozenWithoutWarning from '@/views/insights/WhyAccountsFrozenWithoutWarning'

export const metadata: Metadata = {
  title: 'Why Payment Accounts Get Frozen Without Warning | ChosePayments',
  description: 'Account freezes rarely come with advance notice. Understand the hidden triggers that cause sudden payment account freezes and what you can do about them.',
  alternates: { canonical: '/insights/why-payment-accounts-get-frozen-without-warning' },
  openGraph: {
    title: 'Why Payment Accounts Get Frozen Without Warning | ChosePayments',
    description: 'Account freezes rarely come with advance notice. Understand the hidden triggers that cause sudden payment account freezes and what you can do about them.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <WhyAccountsFrozenWithoutWarning />
    </Suspense>
  )
}
