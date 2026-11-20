import type { Metadata } from 'next'
import EffectiveRateHiddenFees from '@/views/insights/crisis/EffectiveRateHiddenFees'

const TITLE = 'Effective rate explained: hidden credit card processing fees'
const DESCRIPTION =
  "Your headline rate isn't your real cost. Learn how to calculate your effective rate, the 5 fees processors hide, and how to cut your true cost. US guide."
const PATH = '/insights/crisis/effective-rate-hidden-fees-credit-card-processing'
const COVER = '/insights/effective-rate-hero.jpg'

export const metadata: Metadata = {
  // `absolute`: 60 characters on its own; the brand suffix would push it past 65.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    'effective rate credit card processing',
    'hidden credit card processing fees',
    'interchange fee',
    'chargeback fee',
    'pci compliance fee',
    'cross border fee',
    'lower credit card processing fees',
  ],
  alternates: { canonical: PATH },
  openGraph: {
    url: `https://chosepayments.com${PATH}`,
    images: [
      {
        url: COVER,
        width: 1600,
        height: 900,
        alt: 'A sample processing statement: a 1.50% headline rate plus five hidden fee layers adding up to a 2.70% effective rate.',
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
  return <EffectiveRateHiddenFees />
}
