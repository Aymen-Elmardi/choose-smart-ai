import type { Metadata } from 'next'
import { Suspense } from 'react'
import WhySomeBusinessesNeverApproved from '@/views/insights/WhySomeBusinessesNeverApproved'

export const metadata: Metadata = {
  title: 'Why Some Businesses Never Get Payment Provider Approval',
  description: 'Some businesses are structurally incompatible with mainstream providers. Learn whether your business model is causing systematic rejections.',
  alternates: { canonical: '/insights/why-some-businesses-never-get-approved' },
  openGraph: {
    url: 'https://chosepayments.com/insights/why-some-businesses-never-get-approved',
    images: ['/og-default.png'],
    title: 'Why Some Businesses Never Get Payment Provider Approval | ChosePayments',
    description: 'Some businesses are structurally incompatible with mainstream providers. Learn whether your business model is causing systematic rejections.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <WhySomeBusinessesNeverApproved />
    </Suspense>
  )
}
