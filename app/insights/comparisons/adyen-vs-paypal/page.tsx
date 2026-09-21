import type { Metadata } from 'next'
import AdyenVsPayPal from '@/views/insights/comparisons/AdyenVsPayPal'

export const metadata: Metadata = {
  title: 'Adyen vs PayPal: Fees and Features (2026)',
  description: 'Adyen vs PayPal compared: fees, enterprise fit, and whether PayPal works as a payment method on Adyen. Real numbers, verified ratings.',
  alternates: { canonical: '/insights/comparisons/adyen-vs-paypal' },
  openGraph: {
    url: 'https://chosepayments.com/insights/comparisons/adyen-vs-paypal',
    images: ['/insights/comparisons/adyen-vs-paypal-cover.png'],
    title: 'Adyen vs PayPal: Fees and Features (2026) | ChosePayments',
    description: 'Adyen vs PayPal compared: fees, enterprise fit, and whether PayPal works as a payment method on Adyen. Real numbers, verified ratings.',
    type: 'article',
  },
}

export default function Page() {
  return <AdyenVsPayPal />
}
