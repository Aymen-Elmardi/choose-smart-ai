import type { Metadata } from 'next'
import { Suspense } from 'react'
import About from '@/views/About'

export const metadata: Metadata = {
  title: 'Independent Payment Advisory | Why ChosePayments is Different',
  description: "We're not a comparison site. ChosePayments provides expert risk assessment and strategic guidance, helping businesses avoid payment provider mismatch before it costs them.",
  keywords: [
    'independent payment advisory',
    'payment risk assessment',
    'payment risk analysis',
    'ChosePayments',
  ],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'Independent Payment Advisory | Why ChosePayments is Different',
    description: "We're not a comparison site. ChosePayments provides expert risk assessment and strategic guidance, helping businesses avoid payment provider mismatch before it costs them.",
    type: 'website',
  },
}

export default function Page() {
  return (
    <Suspense>
      <About />
    </Suspense>
  )
}
