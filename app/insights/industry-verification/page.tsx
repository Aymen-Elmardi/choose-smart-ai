import type { Metadata } from 'next'
import { Suspense } from 'react'
import IndustryVerification from '@/views/insights/IndustryVerification'

export const metadata: Metadata = {
  title: 'Industry Verification: What Payment Providers Check | ChosePayments',
  description: 'Payment providers verify your industry before approving your account. Learn what they check and how to present your business correctly.',
  alternates: { canonical: '/insights/industry-verification' },
  openGraph: {
    title: 'Industry Verification: What Payment Providers Check | ChosePayments',
    description: 'Payment providers verify your industry before approving your account. Learn what they check and how to present your business correctly.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <IndustryVerification />
    </Suspense>
  )
}
