import type { Metadata } from 'next'
import { Suspense } from 'react'
import IndexUS from '@/views/IndexUS'

export const metadata: Metadata = {
  title: 'ChosePayments: Payment Processor Matching for US Merchants',
  description: 'Find the right payment processor for your US business. Avoid frozen accounts and rejections. Get matched with a provider that fits your risk profile.',
  keywords: [
    'payment provider matching US',
    'best payment processor for my business',
    'merchant risk assessment',
    'payment provider fit',
  ],
  alternates: {
    canonical: '/us',
  },
  openGraph: {
    title: 'ChosePayments: Payment Processor Matching for US Merchants',
    description: 'Find the right payment processor for your US business. Avoid frozen accounts and rejections. Get matched with a provider that fits your risk profile.',
    type: 'website',
  },
}

export default function Page() {
  return (
    <Suspense>
      <IndexUS />
    </Suspense>
  )
}
