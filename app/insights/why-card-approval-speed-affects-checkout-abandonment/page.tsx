import type { Metadata } from 'next'
import { Suspense } from 'react'
import WhyCardApprovalSpeedAffectsCheckoutAbandonment from '@/views/insights/WhyCardApprovalSpeedAffectsCheckoutAbandonment'

export const metadata: Metadata = {
  title: 'Why Card Approval Speed Affects Checkout Abandonment | ChosePayments',
  description: 'Slow authorisation kills conversions. Learn how approval speed varies between providers and what it means for your checkout abandonment rate.',
  alternates: { canonical: '/insights/why-card-approval-speed-affects-checkout-abandonment' },
  openGraph: {
    title: 'Why Card Approval Speed Affects Checkout Abandonment | ChosePayments',
    description: 'Slow authorisation kills conversions. Learn how approval speed varies between providers and what it means for your checkout abandonment rate.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <WhyCardApprovalSpeedAffectsCheckoutAbandonment />
    </Suspense>
  )
}
