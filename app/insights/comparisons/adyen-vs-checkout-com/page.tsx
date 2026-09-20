import type { Metadata } from 'next'
import AdyenVsCheckoutCom from '@/views/insights/comparisons/AdyenVsCheckoutCom'

export const metadata: Metadata = {
  title: 'Adyen vs Checkout.com: Enterprise Payments Compared (2026)',
  description: 'Both use custom interchange-plus pricing and target enterprise merchants. Verified ratings and real architectural differences, not just marketing claims.',
  alternates: { canonical: '/insights/comparisons/adyen-vs-checkout-com' },
  openGraph: {
    url: 'https://chosepayments.com/insights/comparisons/adyen-vs-checkout-com',
    images: ['/insights/comparisons/adyen-vs-checkout-com-cover.png'],
    title: 'Adyen vs Checkout.com: Enterprise Payments Compared (2026) | ChosePayments',
    description: 'Both use custom interchange-plus pricing and target enterprise merchants. Verified ratings and real architectural differences, not just marketing claims.',
    type: 'article',
  },
}

export default function Page() {
  return <AdyenVsCheckoutCom />
}
