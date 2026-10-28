import type { Metadata } from 'next'
import SquareFees from '@/views/insights/SquareFees'

const TITLE = 'Square Fees Explained (2026): What You Actually Pay'
const DESCRIPTION =
  'Every Square fee in 2026: Free, Plus and Premium rates, monthly costs, worked examples, break-even points and when Square gets expensive.'
const COVER = '/insights/square-fees-explained-cover.jpg'

export const metadata: Metadata = {
  // `absolute`: 51 characters on its own; the brand suffix would push it past 65.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    'square fees',
    'square pricing',
    'square credit card processing fees',
    'square fees per transaction',
    'square fees 2026',
    'does square charge a monthly fee',
  ],
  alternates: { canonical: '/insights/square-fees-explained' },
  openGraph: {
    url: 'https://chosepayments.com/insights/square-fees-explained',
    images: [
      {
        url: COVER,
        width: 1200,
        height: 630,
        alt: 'Square fees explained 2026: what you actually pay on the Free, Plus and Premium plans.',
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
  return <SquareFees />
}
