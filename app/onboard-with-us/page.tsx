import type { Metadata } from 'next'
import { Suspense } from 'react'
import OnboardWithUs from '@/views/OnboardWithUs'

export const metadata: Metadata = {
  title: 'Onboard With Us',
  description: 'Start onboarding with a payment provider matched to your business. Simple, transparent, no hidden fees.',
  alternates: { canonical: '/onboard-with-us' },
  openGraph: {
    url: 'https://chosepayments.com/onboard-with-us',
    images: ['/og-default.png'], title: 'Onboard With Us | ChosePayments', description: 'Start onboarding with a payment provider matched to your business.', type: 'website' },
}

export default function Page() {
  return (
    <Suspense>
      <OnboardWithUs />
    </Suspense>
  )
}
