import type { Metadata } from 'next'
import { Suspense } from 'react'
import TRAExemption from '@/views/insights/TRAExemption'

export const metadata: Metadata = {
  title: 'TRA Exemption: Reduce Friction & Improve Approval Rates',
  description: 'TRA exemption explained: how it reduces checkout friction and improves approval odds. See if your business qualifies and how to use it to lower fraud.',
  alternates: { canonical: '/insights/tra-exemption-reduces-payment-friction' },
  openGraph: { title: 'TRA Exemption: Reduce Friction & Improve Approval Rates', description: 'TRA exemption explained: how it reduces checkout friction and improves approval odds.', type: 'article' },
}

export default function Page() {
  return (
    <Suspense>
      <TRAExemption />
    </Suspense>
  )
}
