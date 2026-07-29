import type { Metadata } from 'next'
import { Suspense } from 'react'
import StripeFees from '@/views/insights/StripeFees'

export const metadata: Metadata = {
  title: 'Stripe Fees & Pricing UK 2026: 1.5% + 20p Explained',
  description: 'Stripe fees start at 1.5% + 20p, but Connect, chargebacks, FX and add-ons push the real cost higher. See the full 2026 breakdown and what you\'ll actually pay.',
  alternates: { canonical: '/insights/stripe-fees-explained' },
  openGraph: {
    url: 'https://chosepayments.com/insights/stripe-fees-explained',
    images: ['/og-default.png'],
    title: 'Stripe Fees & Pricing UK 2026: 1.5% + 20p Explained | ChosePayments',
    description: 'Stripe fees start at 1.5% + 20p, but Connect, chargebacks, FX and add-ons push the real cost higher. See the full 2026 breakdown and what you\'ll actually pay.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <StripeFees />
    </Suspense>
  )
}
