import type { Metadata } from 'next'
import { Suspense } from 'react'
import Privacy from '@/views/Privacy'

export const metadata: Metadata = {
  title: 'Privacy Policy | ChosePayments',
  description: 'Learn how ChosePayments collects, uses, and protects your personal information when using our payment provider recommendation service.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | ChosePayments',
    description: 'Learn how ChosePayments collects, uses, and protects your personal information when using our payment provider recommendation service.',
    type: 'website',
  },
}

export default function Page() {
  return (
    <Suspense>
      <Privacy />
    </Suspense>
  )
}
