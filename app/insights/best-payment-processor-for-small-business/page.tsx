import type { Metadata } from 'next'
import BestPaymentProcessorSmallBusiness from '@/views/insights/BestPaymentProcessorSmallBusiness'

const TITLE = 'Best Payment Processor for Small Business (2026): 5 Picks'
const DESCRIPTION =
  'Which payment processor actually fits your small business, what it really costs at real volume, and which ones will reject your application.'

export const metadata: Metadata = {
  // `absolute`: 57 characters on its own; the brand suffix would push it past 65.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    'best payment processor for small business',
    'payment processor',
    'which payment processor is best for small business',
    'cheapest payment processor for small business',
    'best credit card processor for small business',
  ],
  alternates: { canonical: '/insights/best-payment-processor-for-small-business' },
  openGraph: {
    url: 'https://chosepayments.com/insights/best-payment-processor-for-small-business',
    images: [
      {
        url: '/insights/best-payment-processor-for-small-business-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'Best payment processor for small business, compared by use case, real cost, and approval odds.',
      },
    ],
    title: TITLE,
    description: DESCRIPTION,
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/insights/best-payment-processor-for-small-business-cover.jpg'],
  },
}

export default function Page() {
  return <BestPaymentProcessorSmallBusiness />
}
