import type { Metadata } from 'next'
import StripeVsAdyen from '@/views/insights/StripeVsAdyen'

export const metadata: Metadata = {
  title: 'Stripe vs Adyen: Fees and Features (2026)',
  description: 'Stripe charges a flat 2.9% + $0.30. Adyen uses interchange-plus with no published rate. Real pricing math, contract terms, and verified reviews.',
  alternates: { canonical: '/insights/stripe-vs-adyen' },
  openGraph: {
    url: 'https://chosepayments.com/insights/stripe-vs-adyen',
    images: ['/insights/comparisons/stripe-vs-adyen-cover.png'],
    title: 'Stripe vs Adyen: Fees and Features (2026) | ChosePayments',
    description: 'Stripe charges a flat 2.9% + $0.30. Adyen uses interchange-plus with no published rate. Real pricing math, contract terms, and verified reviews.',
    type: 'article',
  },
}

export default function Page() {
  return <StripeVsAdyen />
}
