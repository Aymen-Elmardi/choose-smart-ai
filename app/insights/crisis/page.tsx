import type { Metadata } from 'next'
import { Suspense } from 'react'
import CrisisIndex from '@/views/insights/CrisisIndex'

export const metadata: Metadata = {
  title: 'Crisis Intervention Guides | ChosePayments',
  description: 'Urgent guides for merchants dealing with frozen accounts, hidden fees, or provider rejections. Practical steps to recover and find the right payment partner.',
  alternates: { canonical: '/insights/crisis' },
  openGraph: { title: 'Crisis Intervention Guides | ChosePayments', description: 'Urgent guides for merchants dealing with frozen accounts, hidden fees, or provider rejections.', type: 'website' },
}

export default function Page() {
  return (
    <Suspense>
      <CrisisIndex />
    </Suspense>
  )
}
