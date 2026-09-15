import type { Metadata } from 'next'
import StripeVsTrustCommerce from '@/views/insights/comparisons/StripeVsTrustCommerce'

export const metadata: Metadata = {
  title: 'Stripe vs TrustCommerce: Which Fits Your Healthcare Business (2026)',
  description: 'Stripe is a general-purpose processor with flat pricing. TrustCommerce is a HIPAA-native healthcare payments platform. See which one actually fits.',
  alternates: { canonical: '/insights/comparisons/stripe-vs-trustcommerce' },
  openGraph: {
    url: 'https://chosepayments.com/insights/comparisons/stripe-vs-trustcommerce',
    images: ['/insights/comparisons/stripe-vs-trustcommerce-cover.png'],
    title: 'Stripe vs TrustCommerce: Which Fits Your Healthcare Business (2026) | ChosePayments',
    description: 'Stripe is a general-purpose processor with flat pricing. TrustCommerce is a HIPAA-native healthcare payments platform. See which one actually fits.',
    type: 'article',
  },
}

export default function Page() {
  return <StripeVsTrustCommerce />
}
