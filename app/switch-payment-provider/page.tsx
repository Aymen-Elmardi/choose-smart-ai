import type { Metadata } from 'next'
import { Suspense } from 'react'
import SwitchProvider from '@/views/SwitchProvider'

export const metadata: Metadata = {
  title: 'Switching Payment Providers — What to Check First',
  description: "Stuck with the wrong provider? Learn how to leave without exit fees, fund holds, or unnecessary disruption.",
  alternates: {
    canonical: '/switch-payment-provider',
  },
  openGraph: {
    title: 'Switching Payment Providers — What to Check First',
    description: "Stuck with the wrong provider? Learn how to leave without exit fees, fund holds, or unnecessary disruption.",
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <SwitchProvider />
    </Suspense>
  )
}
