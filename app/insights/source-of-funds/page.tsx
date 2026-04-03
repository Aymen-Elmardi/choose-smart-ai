import type { Metadata } from 'next'
import { Suspense } from 'react'
import SourceOfFunds from '@/views/insights/SourceOfFunds'

export const metadata: Metadata = {
  title: 'Source of Funds Requests: What They Mean and How to Respond | ChosePayments',
  description: 'Wondering why your bank is asking for source of funds? Learn why payment providers request bank statements and source of funds documentation, and how to respond.',
  alternates: { canonical: '/insights/source-of-funds' },
  openGraph: { title: 'Source of Funds Requests: What They Mean and How to Respond', description: 'Learn why payment providers request source of funds documentation and how to respond.', type: 'article' },
}

export default function Page() {
  return (
    <Suspense>
      <SourceOfFunds />
    </Suspense>
  )
}
