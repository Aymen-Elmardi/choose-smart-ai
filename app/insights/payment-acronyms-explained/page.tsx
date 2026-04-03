import type { Metadata } from 'next'
import { Suspense } from 'react'
import PaymentAcronymsExplained from '@/views/insights/PaymentAcronymsExplained'

export const metadata: Metadata = {
  title: 'Payment Acronyms Explained: PSP, MCC, SCA, PCI and More | ChosePayments',
  description: 'The payments industry runs on acronyms. Learn what PSP, acquirer, MCC, SCA, 3DS, PCI DSS, and 40+ other payment terms actually mean.',
  alternates: { canonical: '/insights/payment-acronyms-explained' },
  openGraph: {
    title: 'Payment Acronyms Explained: PSP, MCC, SCA, PCI and More | ChosePayments',
    description: 'The payments industry runs on acronyms. Learn what PSP, acquirer, MCC, SCA, 3DS, PCI DSS, and 40+ other payment terms actually mean.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <PaymentAcronymsExplained />
    </Suspense>
  )
}
