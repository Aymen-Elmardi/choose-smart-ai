import type { Metadata } from 'next'
import StripeVsCheckoutCom from '@/views/insights/comparisons/StripeVsCheckoutCom'

export const metadata: Metadata = {
  title: 'Stripe vs Checkout.com: Fees and Features Comparison (2026)',
  description: 'Stripe publishes a flat 2.9% + $0.30 rate. Checkout.com quotes custom interchange-plus pricing. Real numbers, verified ratings, and an honest verdict.',
  alternates: { canonical: '/insights/comparisons/stripe-vs-checkout-com' },
  openGraph: {
    url: 'https://chosepayments.com/insights/comparisons/stripe-vs-checkout-com',
    images: ['/insights/comparisons/stripe-vs-checkout-com-cover.png'],
    title: 'Stripe vs Checkout.com: Fees and Features Comparison (2026) | ChosePayments',
    description: 'Stripe publishes a flat 2.9% + $0.30 rate. Checkout.com quotes custom interchange-plus pricing. Real numbers, verified ratings, and an honest verdict.',
    type: 'article',
  },
}

export default function Page() {
  return <StripeVsCheckoutCom />
}
