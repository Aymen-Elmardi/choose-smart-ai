import type { Metadata } from 'next'
import { Suspense } from 'react'
import WhyProvidersReUnderwrite from '@/views/insights/WhyProvidersReUnderwrite'

export const metadata: Metadata = {
  title: 'Why Payment Providers Re-Underwrite Existing Accounts | ChosePayments',
  description: 'Re-underwriting can happen months after approval. Learn what triggers a provider to review your account again and how to prepare.',
  alternates: { canonical: '/insights/why-providers-re-underwrite-accounts' },
  openGraph: {
    title: 'Why Payment Providers Re-Underwrite Existing Accounts | ChosePayments',
    description: 'Re-underwriting can happen months after approval. Learn what triggers a provider to review your account again and how to prepare.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <WhyProvidersReUnderwrite />
    </Suspense>
  )
}
