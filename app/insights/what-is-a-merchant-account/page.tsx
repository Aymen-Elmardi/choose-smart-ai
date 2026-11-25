import type { Metadata } from 'next'
import WhatIsAMerchantAccount from '@/views/insights/WhatIsAMerchantAccount'

const TITLE = 'What Is a Merchant Account? And Do You Need One? (2026)'
const DESCRIPTION =
  'What a merchant account is, how it works, what it costs, and when US businesses need their own instead of Stripe, Square or PayPal.'
const PATH = '/insights/what-is-a-merchant-account'
const COVER = '/insights/what-is-a-merchant-account-cover.webp'
const COVER_ALT =
  'Illustration of a golden retriever in a green hoodie at a laptop, pointing at a whiteboard that shows your business, a merchant account and customer payments, next to the title What Is a Merchant Account?'

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
  return <WhatIsAMerchantAccount />
}
