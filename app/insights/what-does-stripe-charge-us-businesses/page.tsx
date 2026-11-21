import type { Metadata } from 'next'
import StripeFeesUS from '@/views/insights/StripeFeesUS'

const TITLE = 'What Does Stripe Charge US Businesses? Every Fee in 2026'
const DESCRIPTION =
  'Stripe charges US businesses 2.9% + 30¢ per online card payment. See every other fee, what you really pay by order size, and what users say about Stripe.'
const PATH = '/insights/what-does-stripe-charge-us-businesses'
const COVER = '/insights/stripe-fees-us-hero.png'

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
        width: 1600,
        height: 900,
        alt: 'Stripe fees for US businesses in 2026: 2.9% + 30¢ per online card payment, 2.7% + 5¢ in person, 1.5% extra for international cards, 1% for currency conversion, 0.8% for ACH capped at $5, a $15 dispute fee and no monthly fee.',
      },
    ],
    title: `${TITLE} | ChosePayments`,
    description: DESCRIPTION,
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    images: [COVER],
  },
}

export default function Page() {
  return <StripeFeesUS />
}
