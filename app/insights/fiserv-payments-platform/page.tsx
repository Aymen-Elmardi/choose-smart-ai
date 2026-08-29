import type { Metadata } from 'next'
import FiservPaymentsPlatform from '@/views/insights/FiservPaymentsPlatform'

export const metadata: Metadata = {
  title: 'Fiserv Payments Platform 2026: Clover, Carat & Who It Fits',
  description: 'Fiserv is one of the world\'s largest payment processors. See how Clover and Carat work, and when Fiserv actually makes sense for your business.',
  alternates: { canonical: '/insights/fiserv-payments-platform' },
  openGraph: {
    url: 'https://chosepayments.com/insights/fiserv-payments-platform',
    images: ['/og-default.png'],
    title: 'Fiserv Payments Platform 2026: Clover, Carat & Who It Fits',
    description: 'Fiserv is one of the world\'s largest payment processors. See how Clover and Carat work, and when Fiserv actually makes sense for your business.',
    type: 'article',
  },
}

export default function Page() {
  return <FiservPaymentsPlatform />
}
