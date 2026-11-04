import type { Metadata } from 'next'
import InterchangePlusVsBlended from '@/views/insights/pricing/InterchangePlusVsBlended'

const TITLE = 'Interchange Plus vs. Blended Pricing: Which Saves You More?'
const DESCRIPTION =
  'Compare interchange plus and blended credit card processing pricing with real 2026 rate data. See which model cuts costs for your business and when to switch.'
const PATH = '/insights/pricing-models/interchange-plus-vs-blended-pricing'
const COVER = '/insights/interchange-plus-vs-blended-hero.jpg'

export const metadata: Metadata = {
  // `absolute`: 58 characters on its own; the brand suffix would push it past 65.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    'interchange plus vs blended pricing',
    'interchange plus pricing explained',
    'credit card processing pricing models',
    'how to lower credit card processing fees',
    'blended pricing credit card processing',
  ],
  alternates: { canonical: PATH },
  openGraph: {
    url: `https://chosepayments.com${PATH}`,
    images: [
      {
        url: COVER,
        width: 1600,
        height: 900,
        alt: 'Interchange plus broken into interchange, assessment and markup, versus a single flat blended rate.',
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
  return <InterchangePlusVsBlended />
}
