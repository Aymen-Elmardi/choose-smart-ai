import type { Metadata } from 'next'
import { Suspense } from 'react'
import RiskProfileMatching from '@/views/RiskProfileMatching'

export const metadata: Metadata = {
  title: "Risk-Profile Matching: Never Choose the Wrong Payment Processor | ChosePayments",
  description: "Our engine matches payment providers to your business risk profile. Stop choosing processors based on marketing. Find the one that actually fits your industry, volume, and model.",
  keywords: [
    'payment processor matching',
    'risk profile payment provider',
    'best payment processor for my business',
    'payment provider risk fit',
    'merchant risk profile',
  ],
  alternates: {
    canonical: '/risk-profile-matching',
  },
  openGraph: {
    title: "Risk-Profile Matching: Never Choose the Wrong Payment Processor | ChosePayments",
    description: "Our engine matches payment providers to your business risk profile. Stop choosing processors based on marketing. Find the one that actually fits your industry, volume, and model.",
    type: 'website',
  },
}

export default function Page() {
  return (
    <Suspense>
      <RiskProfileMatching />
    </Suspense>
  )
}
