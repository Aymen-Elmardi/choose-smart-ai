import type { Metadata } from 'next'
import { Suspense } from 'react'
import FiservPaymentsPlatform from '@/views/insights/FiservPaymentsPlatform'

export const metadata: Metadata = {
  title: 'Fiserv and the First Data Payment Gateway: What Merchants Need to Know',
  description: 'Fiserv acquired First Data in 2019, creating one of the largest payment gateway and merchant processing networks in the world. What merchants need to know before choosing Fiserv.',
  alternates: { canonical: '/insights/fiserv-payments-platform' },
  openGraph: {
    url: 'https://chosepayments.com/insights/fiserv-payments-platform',
    images: ['/og-default.png'],
    title: 'Fiserv and the First Data Payment Gateway: What Merchants Need to Know',
    description: 'Fiserv acquired First Data in 2019, creating one of the largest payment gateway and merchant processing networks in the world. What merchants need to know before choosing Fiserv.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <FiservPaymentsPlatform />
    </Suspense>
  )
}
