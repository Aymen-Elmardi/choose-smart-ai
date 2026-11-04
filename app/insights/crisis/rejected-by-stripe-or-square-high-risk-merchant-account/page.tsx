import type { Metadata } from 'next'
import RejectedByStripeOrSquare from '@/views/insights/crisis/RejectedByStripeOrSquare'

const TITLE = 'Rejected by Stripe or Square? High-Risk Account Guide'
const DESCRIPTION =
  'Stripe or Square rejected your business? Learn why, what high-risk means, and how to get approved with a high-risk merchant account provider. Book a free call.'
const PATH = '/insights/crisis/rejected-by-stripe-or-square-high-risk-merchant-account'
const COVER = '/insights/rejected-stripe-square-hero.jpg'

export const metadata: Metadata = {
  // `absolute`: 53 characters on its own; the brand suffix would push it past 65.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    'rejected by stripe or square',
    'high risk merchant account',
    'stripe account rejected',
    'merchant account for high risk business',
    'MATCH list',
  ],
  alternates: { canonical: PATH },
  openGraph: {
    url: `https://chosepayments.com${PATH}`,
    images: [
      {
        url: COVER,
        width: 1600,
        height: 900,
        alt: "A vague rejection email next to what is actually being evaluated: MCC, ticket size, delivery model and chargeback history.",
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
  return <RejectedByStripeOrSquare />
}
