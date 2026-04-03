import type { Metadata } from 'next'
import { Suspense } from 'react'
import Chargebacks from '@/views/insights/Chargebacks'

export const metadata: Metadata = {
  title: 'Chargebacks Explained: Costs, Causes, and How to Reduce Them (UK & EU)',
  description: 'Too many chargebacks can freeze your account. Learn what a chargeback fee is, how chargebacks work, and how to reduce them before they damage your business.',
  alternates: { canonical: '/insights/chargebacks-what-they-are-and-how-to-avoid-them' },
  openGraph: { title: 'Chargebacks Explained: Costs, Causes, and How to Reduce Them', description: 'Too many chargebacks can freeze your account. Learn how chargebacks work and how to reduce them.', type: 'article' },
}

export default function Page() {
  return (
    <Suspense>
      <Chargebacks />
    </Suspense>
  )
}
