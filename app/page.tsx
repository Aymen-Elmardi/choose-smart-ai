import type { Metadata } from 'next'
import { Suspense } from 'react'
import Index from '@/views/Index'

export const metadata: Metadata = {
  // Hardcoded in full: the root layout's title.template does not apply to the
  // "/" route specifically (reproduced in the static export build output —
  // every other route templates correctly). Spelling out the final string here
  // avoids depending on that.
  title: 'Payment Processor Matching for UK Merchants | ChosePayments',
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
    images: ['/og-default.png'],
    title: 'ChosePayments: Free Payment Processor Matching for US and UK Businesses',
    description: 'Stop overpaying. Stop getting frozen. ChosePayments matches your business to the right payment processor for free. US, UK and EU coverage across all industries.',
    type: 'website',
    url: 'https://chosepayments.com',
  },
}

export default function Page() {
  return (
    <Suspense>
      <Index />
    </Suspense>
  )
}

// migration test: new MacBook M4 — 2026-05-14

// migration test: new MacBook M4 — 2026-05-14

// migration test: new MacBook M4 — 2026-05-14
