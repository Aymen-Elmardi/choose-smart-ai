import type { Metadata } from 'next'
import { Suspense } from 'react'
import ContractsInvoices from '@/views/insights/ContractsInvoices'

export const metadata: Metadata = {
  title: 'Contracts & Invoices: What Payment Providers Want to See | ChosePayments',
  description: 'Payment providers often request contracts and invoices to verify your business model. Learn what format they expect and how to respond.',
  alternates: { canonical: '/insights/contracts-invoices' },
  openGraph: {
    title: 'Contracts & Invoices: What Payment Providers Want to See | ChosePayments',
    description: 'Payment providers often request contracts and invoices to verify your business model. Learn what format they expect and how to respond.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <ContractsInvoices />
    </Suspense>
  )
}
