import type { Metadata } from 'next'
import Quiz from '@/views/Quiz'

export const metadata: Metadata = {
  title: 'Find Your Payment Processor: 5-Question Match',
  description: 'Answer 5 quick questions about your business and get matched with the US payment processors that fit you. Free, and takes about 30 seconds.',
  alternates: { canonical: '/assessment' },
  openGraph: {
    url: 'https://chosepayments.com/assessment',
    images: ['/og-default.png'], title: 'Free Payment Provider Assessment | ChosePayments', description: 'Answer a few questions about your business and get a personalised payment provider recommendation.', type: 'website' },
}

export default function Page() {
  return <Quiz />
}
