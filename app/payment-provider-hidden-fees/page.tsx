import type { Metadata } from 'next'
import { Suspense } from 'react'
import HiddenFees from '@/views/HiddenFees'

export const metadata: Metadata = {
  title: 'Hidden Payment Fees: What Your Provider Isn\'t Telling You',
  description: "The rate you're quoted often isn't the rate you pay. Insider knowledge on hidden fees, rolling reserves, and why effective rates differ from advertised rates.",
  keywords: [
    'hidden payment fees',
    'payment processing costs',
    'effective rate',
    'rolling reserve',
    'provider pricing',
  ],
  alternates: {
    canonical: '/payment-provider-hidden-fees',
  },
  openGraph: {
    title: 'Hidden Payment Fees: What Your Provider Isn\'t Telling You',
    description: "The rate you're quoted often isn't the rate you pay. Insider knowledge on hidden fees, rolling reserves, and why effective rates differ from advertised rates.",
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <HiddenFees />
    </Suspense>
  )
}
