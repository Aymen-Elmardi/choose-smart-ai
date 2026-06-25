import type { Metadata } from 'next'
import { Suspense } from 'react'
import FAQ from '@/views/FAQ'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Answers to common questions about how ChosePayments works, how we make money, payment provider matching, and merchant risk assessment.',
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    url: 'https://chosepayments.com/faq',
    images: ['/og-default.png'],
    title: 'Frequently Asked Questions | ChosePayments',
    description: 'Answers to common questions about how ChosePayments works, how we make money, payment provider matching, and merchant risk assessment.',
    type: 'website',
  },
}

export default function Page() {
  return (
    <Suspense>
      <FAQ />
    </Suspense>
  )
}
