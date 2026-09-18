import type { Metadata } from 'next'
import StripeVsPayPal from '@/views/insights/comparisons/StripeVsPayPal'

export const metadata: Metadata = {
  title: 'Stripe vs PayPal: Fees and Features Comparison 2026',
  description: 'Stripe charges 2.9% + $0.30. PayPal charges 2.99% to 3.49% + $0.49. Real cost math, verified ratings, and an honest verdict for 2026.',
  alternates: { canonical: '/insights/comparisons/stripe-vs-paypal' },
  openGraph: {
    url: 'https://chosepayments.com/insights/comparisons/stripe-vs-paypal',
    images: ['/insights/comparisons/stripe-vs-paypal-cover.png'],
    title: 'Stripe vs PayPal: Fees and Features Comparison 2026 | ChosePayments',
    description: 'Stripe charges 2.9% + $0.30. PayPal charges 2.99% to 3.49% + $0.49. Real cost math, verified ratings, and an honest verdict for 2026.',
    type: 'article',
  },
}

export default function Page() {
  return <StripeVsPayPal />
}
