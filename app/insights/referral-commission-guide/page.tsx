import type { Metadata } from 'next'
import { Suspense } from 'react'
import ReferralCommissionGuide from '@/views/insights/ReferralCommissionGuide'

export const metadata: Metadata = {
  title: 'Payment Provider Referral & Commission Guide',
  description: 'How referral arrangements work in the payment industry. Understanding commission structures helps you evaluate whether your advisor is truly independent.',
  alternates: { canonical: '/insights/referral-commission-guide' },
  openGraph: {
    url: 'https://chosepayments.com/insights/referral-commission-guide',
    images: ['/og-default.png'], title: 'Payment Provider Referral & Commission Guide | ChosePayments', description: 'How referral arrangements work in the payment industry.', type: 'article' },
}

export default function Page() {
  return (
    <Suspense>
      <ReferralCommissionGuide />
    </Suspense>
  )
}
