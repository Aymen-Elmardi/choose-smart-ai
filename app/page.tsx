import type { Metadata } from 'next'
import { Suspense } from 'react'
import Index from '@/views/Index'

export const metadata: Metadata = {
  title: 'ChosePayments: Payment Processor Matching for UK Merchants',
  description: 'Find the right payment processor for your business. Avoid frozen accounts and rejections. Get matched with a provider that fits your risk profile in 2 minutes.',
  keywords: [
    'payment provider risk profile',
    'best payment processor for my business',
    'payment provider matching',
    'merchant risk assessment',
    'payment provider fit',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ChosePayments: Payment Processor Matching for UK Merchants',
    description: 'Find the right payment processor for your business. Avoid frozen accounts and rejections. Get matched with a provider that fits your risk profile in 2 minutes.',
    type: 'website',
  },
}

export default function Page() {
  return (
    <Suspense>
      <Index />
    </Suspense>
  )
}
