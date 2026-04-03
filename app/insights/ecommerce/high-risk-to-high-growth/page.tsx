import type { Metadata } from 'next'
import { Suspense } from 'react'
import HighRiskToHighGrowth from '@/views/insights/ecommerce/HighRiskToHighGrowth'

export const metadata: Metadata = {
  title: 'From High-Risk to High-Growth: Payment Strategy for Scaling Ecommerce | ChosePayments',
  description: 'High-risk labels don\'t have to hold you back. Learn how to reposition your ecommerce business and access better payment infrastructure as you scale.',
  alternates: { canonical: '/insights/ecommerce/high-risk-to-high-growth' },
  openGraph: {
    title: 'From High-Risk to High-Growth: Payment Strategy for Scaling Ecommerce | ChosePayments',
    description: 'High-risk labels don\'t have to hold you back. Learn how to reposition your ecommerce business and access better payment infrastructure as you scale.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <HighRiskToHighGrowth />
    </Suspense>
  )
}
