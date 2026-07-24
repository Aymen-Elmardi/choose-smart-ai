import type { Metadata } from 'next'
import { Suspense } from 'react'
import ExplainerIndex from '@/views/insights/ExplainerIndex'

export const metadata: Metadata = {
  title: 'Payment Explainers: Terms & Mechanics Merchants Need to Know',
  description: 'Plain-English explainers on payment settlement, reserves, wallet payments, SCA exemptions, and the acronyms every merchant runs into — without the jargon.',
  alternates: { canonical: '/insights/explainer' },
  openGraph: {
    url: 'https://chosepayments.com/insights/explainer',
    images: ['/og-default.png'],
    title: 'Payment Explainers: Terms & Mechanics Merchants Need to Know | ChosePayments',
    description: 'Plain-English explainers on payment settlement, reserves, wallet payments, SCA exemptions, and the acronyms every merchant runs into.',
    type: 'website',
  },
}

export default function Page() {
  return (
    <Suspense>
      <ExplainerIndex />
    </Suspense>
  )
}
