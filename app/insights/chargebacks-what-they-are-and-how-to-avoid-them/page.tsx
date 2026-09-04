import type { Metadata } from 'next'
import Chargebacks from '@/views/insights/Chargebacks'

export const metadata: Metadata = {
  title: 'Chargebacks: Why They Happen and How to Avoid Them',
  description: 'Too many chargebacks can freeze your payment account. See what actually triggers a dispute, what it costs, and how to reduce them before providers notice.',
  alternates: { canonical: '/insights/chargebacks-what-they-are-and-how-to-avoid-them' },
  openGraph: {
    url: 'https://chosepayments.com/insights/chargebacks-what-they-are-and-how-to-avoid-them',
    images: ['/insights/chargebacks-guide-cover.jpg'],
    title: 'Chargebacks: Why They Happen and How to Avoid Them | ChosePayments',
    description: 'Too many chargebacks can freeze your payment account. See what actually triggers a dispute, what it costs, and how to reduce them before providers notice.',
    type: 'article',
  },
}

export default function Page() {
  return <Chargebacks />
}
