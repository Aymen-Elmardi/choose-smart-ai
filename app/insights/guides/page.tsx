import type { Metadata } from 'next'
import Guides from '@/views/insights/Guides'

export const metadata: Metadata = {
  // `absolute` opts out of the root layout's '%s | ChosePayments' template.
  // This title already ends in the brand, so the template appended it twice.
  title: { absolute: "Practical Guides | ChosePayments Insights" },
  description: "Step-by-step guides on payment provider verification, documentation requirements, and how to respond to compliance requests.",
  alternates: {
    canonical: '/insights/guides',
  },
  openGraph: {
    url: 'https://chosepayments.com/insights/guides',
    images: ['/og-default.png'],
    title: "Practical Guides | ChosePayments Insights",
    description: "Step-by-step guides on payment provider verification, documentation requirements, and how to respond to compliance requests.",
    type: 'website',
  },
}

export default function Page() {
  return <Guides />
}
