import type { Metadata } from 'next'
import CheckoutComVsPayPal from '@/views/insights/comparisons/CheckoutComVsPayPal'

export const metadata: Metadata = {
  title: 'Checkout.com vs PayPal: Enterprise Rates vs Consumer Trust (2026)',
  description: 'Checkout.com quotes custom enterprise pricing. PayPal publishes a flat 2.99% to 3.49% + $0.49. Verified ratings and an honest fit-based verdict.',
  alternates: { canonical: '/insights/comparisons/checkout-com-vs-paypal' },
  openGraph: {
    url: 'https://chosepayments.com/insights/comparisons/checkout-com-vs-paypal',
    images: ['/insights/comparisons/checkout-com-vs-paypal-cover.png'],
    title: 'Checkout.com vs PayPal: Enterprise Rates vs Consumer Trust (2026) | ChosePayments',
    description: 'Checkout.com quotes custom enterprise pricing. PayPal publishes a flat 2.99% to 3.49% + $0.49. Verified ratings and an honest fit-based verdict.',
    type: 'article',
  },
}

export default function Page() {
  return <CheckoutComVsPayPal />
}
