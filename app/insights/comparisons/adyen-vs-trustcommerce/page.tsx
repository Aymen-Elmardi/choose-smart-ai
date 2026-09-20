import type { Metadata } from 'next'
import AdyenVsTrustCommerce from '@/views/insights/comparisons/AdyenVsTrustCommerce'

export const metadata: Metadata = {
  title: 'Adyen vs TrustCommerce: Enterprise vs Healthcare Payments (2026)',
  description: 'Adyen is a global enterprise commerce platform. TrustCommerce is a HIPAA-native healthcare payments specialist. See which one actually applies to you.',
  alternates: { canonical: '/insights/comparisons/adyen-vs-trustcommerce' },
  openGraph: {
    url: 'https://chosepayments.com/insights/comparisons/adyen-vs-trustcommerce',
    images: ['/insights/comparisons/adyen-vs-trustcommerce-cover.png'],
    title: 'Adyen vs TrustCommerce: Enterprise vs Healthcare Payments (2026) | ChosePayments',
    description: 'Adyen is a global enterprise commerce platform. TrustCommerce is a HIPAA-native healthcare payments specialist. See which one actually applies to you.',
    type: 'article',
  },
}

export default function Page() {
  return <AdyenVsTrustCommerce />
}
