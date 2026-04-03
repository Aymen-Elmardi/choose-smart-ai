import type { Metadata } from 'next'
import { Suspense } from 'react'
import Shift4VsStripe from '@/views/insights/Shift4VsStripe'

export const metadata: Metadata = {
  title: 'Shift4 vs Stripe for Enterprise: Which Is Right for Your Business? | ChosePayments',
  description: 'Shift4 and Stripe both serve enterprise merchants — but in very different ways. Compare their strengths, pricing, and risk appetites.',
  alternates: { canonical: '/insights/shift4-vs-stripe-enterprise' },
  openGraph: {
    title: 'Shift4 vs Stripe for Enterprise: Which Is Right for Your Business? | ChosePayments',
    description: 'Shift4 and Stripe both serve enterprise merchants — but in very different ways. Compare their strengths, pricing, and risk appetites.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <Shift4VsStripe />
    </Suspense>
  )
}
