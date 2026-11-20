import type { Metadata } from 'next'
import FundsOnHold from '@/views/insights/crisis/FundsOnHold'

const TITLE = 'Funds on hold: what it means and how rolling reserves work'
const DESCRIPTION =
  'Payment processor holding your funds? Learn the difference between a hold, freeze, and rolling reserve, how long each lasts, and how to get paid faster.'
const PATH = '/insights/crisis/funds-on-hold-rolling-reserve-payment-processor'
const COVER = '/insights/funds-on-hold-hero.jpg'

export const metadata: Metadata = {
  // `absolute`: 58 characters on its own; the brand suffix would push it past 65.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    'funds on hold',
    'what does funds on hold mean',
    'rolling reserve',
    'what is a rolling reserve',
    'payment processor holding funds',
    'merchant account reserve',
  ],
  alternates: { canonical: PATH },
  openGraph: {
    url: `https://chosepayments.com${PATH}`,
    images: [
      {
        url: COVER,
        width: 1600,
        height: 900,
        alt: 'Hold, freeze and rolling reserve compared: three different states of a merchant account.',
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
  return <FundsOnHold />
}
