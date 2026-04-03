import type { Metadata } from 'next'
import { Suspense } from 'react'
import AdyenVsFirstData from '@/views/insights/AdyenVsFirstData'

export const metadata: Metadata = {
  title: 'Adyen vs First Data (Fiserv): Enterprise Payment Platform Comparison | ChosePayments',
  description: 'Adyen and First Data (now Fiserv) both serve large merchants. Compare their global acquiring, pricing models, and risk approach.',
  alternates: { canonical: '/insights/adyen-vs-first-data' },
  openGraph: {
    title: 'Adyen vs First Data (Fiserv): Enterprise Payment Platform Comparison | ChosePayments',
    description: 'Adyen and First Data (now Fiserv) both serve large merchants. Compare their global acquiring, pricing models, and risk approach.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <AdyenVsFirstData />
    </Suspense>
  )
}
