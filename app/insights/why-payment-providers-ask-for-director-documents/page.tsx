import type { Metadata } from 'next'
import { Suspense } from 'react'
import WhyPaymentProvidersAskForDirectorDocuments from '@/views/insights/WhyPaymentProvidersAskForDirectorDocuments'

export const metadata: Metadata = {
  title: 'Why Payment Providers Ask for Director Documents | ChosePayments',
  description: 'Director document requests are standard, but timing matters. Learn why providers ask and what to prepare to avoid delays.',
  alternates: { canonical: '/insights/why-payment-providers-ask-for-director-documents' },
  openGraph: {
    title: 'Why Payment Providers Ask for Director Documents | ChosePayments',
    description: 'Director document requests are standard, but timing matters. Learn why providers ask and what to prepare to avoid delays.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <WhyPaymentProvidersAskForDirectorDocuments />
    </Suspense>
  )
}
