import type { Metadata } from 'next'
import Quiz from '@/views/Quiz'

export const metadata: Metadata = {
  title: 'Which Payment Providers Will Accept Your Business?',
  description: 'Answer five questions and get matched with payment providers suited to your business model, processing volume and requirements. Free, and about 30 seconds.',
  alternates: { canonical: '/assessment' },
  openGraph: {
    url: 'https://chosepayments.com/assessment',
    images: ['/og-default.png'], title: 'Free Payment Provider Assessment | ChosePayments', description: 'Answer a few questions about your business and get a personalised payment provider recommendation.', type: 'website' },
}

export default function Page() {
  return <Quiz />
}
