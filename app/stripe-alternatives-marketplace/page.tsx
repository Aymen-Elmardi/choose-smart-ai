import type { Metadata } from 'next'
import StripeAlternatives from '@/views/StripeAlternatives'

const TITLE = 'Stripe Connect Alternatives for US Marketplaces (2026)'
const DESCRIPTION =
  'Compare Stripe Connect alternatives for US marketplaces: Adyen for Platforms, Finix, PayPal and more. Real 2026 costs, risks, and which one fits your stage.'
const PATH = '/stripe-alternatives-marketplace'
const COVER = '/insights/stripe-connect-alternatives-cover.jpg'

export const metadata: Metadata = {
  // The site template adds " | ChosePayments" to this title.
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    url: `https://chosepayments.com${PATH}`,
    images: [
      {
        url: COVER,
        width: 1671,
        height: 941,
        alt: 'Stripe Connect alternatives for US ecommerce: compare top alternatives.',
      },
    ],
    title: `${TITLE} | ChosePayments`,
    description: DESCRIPTION,
    type: 'article',
  },
}

export default function Page() {
  return <StripeAlternatives />
}
