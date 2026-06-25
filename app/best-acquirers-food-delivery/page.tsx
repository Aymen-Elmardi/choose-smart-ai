import type { Metadata } from 'next'
import { Suspense } from 'react'
import FoodDeliveryAcquirers from '@/views/insights/provider-fit/FoodDeliveryAcquirers'

export const metadata: Metadata = {
  title: 'Best Acquirers for Food Delivery Platforms',
  description: 'Food delivery platforms face unique payment challenges. Find acquirers that support high volume, split payments, and marketplace structures.',
  alternates: { canonical: '/best-acquirers-food-delivery' },
  openGraph: {
    url: 'https://chosepayments.com/best-acquirers-food-delivery',
    images: ['/og-default.png'],
    title: 'Best Acquirers for Food Delivery Platforms | ChosePayments',
    description: 'Food delivery platforms face unique payment challenges. Find acquirers that support high volume, split payments, and marketplace structures.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <FoodDeliveryAcquirers />
    </Suspense>
  )
}
