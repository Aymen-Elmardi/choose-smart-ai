import type { Metadata } from 'next'
import HiddenFeeCrisis from '@/views/insights/crisis/HiddenFeeCrisis'

export const metadata: Metadata = {
  title: 'Hidden Fee Crisis: When Your Provider Costs More Than You Thought',
  description: 'Low headline rate, high real cost? Learn how to calculate your all-in effective rate and spot the fees that quietly inflate your processing bill. Ask us.',
  alternates: { canonical: '/insights/crisis/hidden-fee-crisis' },
  openGraph: {
    url: 'https://chosepayments.com/insights/crisis/hidden-fee-crisis',
    images: ['/og-default.png'],
    title: 'Hidden Fee Crisis: When Your Provider Costs More Than You Thought | ChosePayments',
    description: 'Low headline rate, high real cost? Learn how to calculate your all-in effective rate and spot the fees that quietly inflate your processing bill. Ask us.',
    type: 'article',
  },
}

export default function Page() {
  return <HiddenFeeCrisis />
}
