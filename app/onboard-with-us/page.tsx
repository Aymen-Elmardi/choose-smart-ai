import type { Metadata } from 'next'
import { Suspense } from 'react'
import OnboardWithUs from '@/views/OnboardWithUs'

export const metadata: Metadata = {
  title: 'Onboard With Us | ChosePayments',
  description: 'Start onboarding with a payment provider matched to your business. Simple, transparent, no hidden fees.',
  alternates: { canonical: '/onboard-with-us' },
  openGraph: { title: 'Onboard With Us | ChosePayments', description: 'Start onboarding with a payment provider matched to your business.', type: 'website' },
}

export default function Page() {
  return (
    <Suspense>
      <OnboardWithUs />
    </Suspense>
  )
}
