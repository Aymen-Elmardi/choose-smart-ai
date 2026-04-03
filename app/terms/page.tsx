import type { Metadata } from 'next'
import { Suspense } from 'react'
import Terms from '@/views/Terms'

export const metadata: Metadata = {
  title: 'Terms of Service | ChosePayments',
  description: 'Terms of Service for ChosePayments. Read our terms and conditions for using our payment provider advisory services.',
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: 'Terms of Service | ChosePayments',
    description: 'Terms of Service for ChosePayments. Read our terms and conditions for using our payment provider advisory services.',
    type: 'website',
  },
}

export default function Page() {
  return (
    <Suspense>
      <Terms />
    </Suspense>
  )
}
