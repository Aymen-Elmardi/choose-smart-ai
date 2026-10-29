import type { Metadata } from 'next'
import StripeAlternativesGuide from '@/views/insights/StripeAlternativesGuide'

const TITLE = 'Best Stripe Alternatives (2026): Cheaper, Safer and Better Fits'
const DESCRIPTION =
  'The best Stripe alternatives in 2026, compared on real fees, worked cost examples, account risk and who each one fits.'
const COVER = '/insights/stripe-alternatives-cover.jpg'

export const metadata: Metadata = {
  // `absolute`: 63 characters on its own; the brand suffix would push it past 65.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    'stripe alternatives',
    'best stripe alternative',
    'cheaper stripe alternatives',
    'stripe alternatives for small business',
    'payment processors besides stripe',
    'stripe account alternative',
  ],
  alternates: { canonical: '/insights/stripe-alternatives' },
  openGraph: {
    url: 'https://chosepayments.com/insights/stripe-alternatives',
    images: [
      {
        url: COVER,
        width: 1200,
        height: 630,
        alt: 'Beyond Stripe? Explore better payment options: Checkout.com, Adyen, PayPal and Square.',
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
  return <StripeAlternativesGuide />
}
