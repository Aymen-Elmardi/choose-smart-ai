import type { Metadata } from 'next'
import { Suspense } from 'react'
import MerchantAccountProblems from '@/views/MerchantAccountProblems'

export const metadata: Metadata = {
  title: "Merchant Account Problems Explained | ChosePayments",
  description: "Funds withheld, reserves imposed, fees higher than expected. Understand what your payment provider is doing and why, clearly explained.",
  alternates: {
    canonical: '/merchant-account-problems',
  },
  openGraph: {
    title: "Merchant Account Problems Explained | ChosePayments",
    description: "Funds withheld, reserves imposed, fees higher than expected. Understand what your payment provider is doing and why, clearly explained.",
    type: 'website',
  },
}

export default function Page() {
  return (
    <Suspense>
      <MerchantAccountProblems />
    </Suspense>
  )
}
