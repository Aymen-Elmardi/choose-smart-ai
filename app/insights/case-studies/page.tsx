import type { Metadata } from 'next'
import CaseStudies from '@/views/insights/CaseStudies'

export const metadata: Metadata = {
  // `absolute` opts out of the root layout's '%s | ChosePayments' template.
  // This title already ends in the brand, so the template appended it twice.
  title: { absolute: "Case Studies | ChosePayments Insights" },
  description: "Real-world examples of how businesses navigate payment provider challenges, account reviews, and compliance requirements.",
  alternates: {
    canonical: '/insights/case-studies',
  },
  openGraph: {
    url: 'https://chosepayments.com/insights/case-studies',
    images: ['/og-default.png'],
    title: "Case Studies | ChosePayments Insights",
    description: "Real-world examples of how businesses navigate payment provider challenges, account reviews, and compliance requirements.",
    type: 'website',
  },
}

export default function Page() {
  return <CaseStudies />
}
