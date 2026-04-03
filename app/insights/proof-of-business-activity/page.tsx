import type { Metadata } from 'next'
import { Suspense } from 'react'
import ProofOfBusinessActivity from '@/views/insights/ProofOfBusinessActivity'

export const metadata: Metadata = {
  title: 'Understanding Proof of Business Activity Requests | ChosePayments',
  description: 'Understanding why payment providers ask for proof of business activity and how to prepare your documentation.',
  alternates: { canonical: '/insights/proof-of-business-activity' },
  openGraph: { title: 'Understanding Proof of Business Activity Requests | ChosePayments', description: 'Why payment providers ask for proof of business activity and how to prepare your documentation.', type: 'article' },
}

export default function Page() {
  return (
    <Suspense>
      <ProofOfBusinessActivity />
    </Suspense>
  )
}
