import type { Metadata } from 'next'
import HighRiskEcommercePaymentProcessing from '@/views/insights/HighRiskEcommercePaymentProcessing'

const TITLE = 'High-Risk Ecommerce Merchant Account: How to Get Approved'
const DESCRIPTION =
  'What makes ecommerce high risk, 2026 Visa chargeback thresholds, reserves and costs, how underwriting works, and how to get approved and stay stable.'
const COVER = '/insights/high-risk-ecommerce-payment-processing-cover.jpg'

export const metadata: Metadata = {
  // `absolute`: the brand suffix would push the 57-character title past 65.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    'high risk merchant account',
    'high risk payment processing',
    'high risk payment processor ecommerce',
    'high risk merchant account fees',
    'best high risk payment processors',
    'what is a high risk merchant account',
  ],
  alternates: { canonical: '/high-risk-ecommerce-payment-processing' },
  openGraph: {
    url: 'https://chosepayments.com/high-risk-ecommerce-payment-processing',
    images: [
      {
        url: COVER,
        width: 1200,
        height: 630,
        alt: 'High-risk ecommerce payments: merchant accounts, reserves and approvals explained.',
      },
    ],
    title: TITLE,
    description: DESCRIPTION,
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    images: [COVER],
  },
}

export default function Page() {
  return <HighRiskEcommercePaymentProcessing />
}
