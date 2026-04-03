import type { Metadata } from 'next'
import { Suspense } from 'react'
import BlendedVsInterchange from '@/views/insights/pricing/BlendedVsInterchange'

export const metadata: Metadata = {
  title: 'Blended vs Interchange Pricing: Which Is Better for Your Business? | ChosePayments',
  description: 'Blended rates are simple but often more expensive. Interchange++ is complex but fairer at scale. Learn which model suits your transaction mix.',
  alternates: { canonical: '/insights/pricing-models/blended-vs-interchange' },
  openGraph: {
    title: 'Blended vs Interchange Pricing: Which Is Better for Your Business? | ChosePayments',
    description: 'Blended rates are simple but often more expensive. Interchange++ is complex but fairer at scale. Learn which model suits your transaction mix.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <BlendedVsInterchange />
    </Suspense>
  )
}
