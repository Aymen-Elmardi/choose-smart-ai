import type { Metadata } from 'next'
import { Suspense } from 'react'
import ApplePayGooglePayExplained from '@/views/insights/ApplePayGooglePayExplained'

export const metadata: Metadata = {
  title: 'Apple Pay & Google Pay Explained for Merchants | ChosePayments',
  description: 'Digital wallets are now expected by customers. Learn how Apple Pay and Google Pay work for merchants, their costs, and which providers support them.',
  alternates: { canonical: '/insights/apple-pay-google-pay-explained' },
  openGraph: {
    title: 'Apple Pay & Google Pay Explained for Merchants | ChosePayments',
    description: 'Digital wallets are now expected by customers. Learn how Apple Pay and Google Pay work for merchants, their costs, and which providers support them.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <ApplePayGooglePayExplained />
    </Suspense>
  )
}
