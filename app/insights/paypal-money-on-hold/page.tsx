import type { Metadata } from 'next'
import PayPalMoneyOnHold from '@/views/insights/PayPalMoneyOnHold'

const TITLE = 'PayPal Money on Hold? Why, How Long, and How to Release It'
const DESCRIPTION =
  'PayPal holding your money? Learn why holds, reserves and limitations happen, how long PayPal can hold funds, and how US sellers get money released.'
const PATH = '/insights/paypal-money-on-hold'
const COVER = '/insights/paypal-money-on-hold-cover.jpg'
const COVER_ALT = 'PayPal money on hold? Here is how to release it fast.'

export const metadata: Metadata = {
  // `absolute`: the brief sets the exact title tag, without the brand suffix.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    url: `https://chosepayments.com${PATH}`,
    images: [{ url: COVER, width: 1672, height: 941, alt: COVER_ALT }],
    title: TITLE,
    description: DESCRIPTION,
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [COVER],
  },
}

export default function Page() {
  return <PayPalMoneyOnHold />
}
