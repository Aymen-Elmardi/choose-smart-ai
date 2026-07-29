import type { Metadata } from 'next'
import { Suspense } from 'react'
import MastercardThreeDSFeeChangesEurope from '@/views/insights/MastercardThreeDSFeeChangesEurope'

export const metadata: Metadata = {
  title: "Mastercard's 2026 3DS Authentication Fee Changes in Europe: What Merchants Should Know",
  description: "Mastercard restructured its EMV 3DS Authentication Fee across Europe from 29 July 2026, splitting rates by recurring vs one-off transactions and by approved vs declined outcomes. Here's what changed and how SCA exemptions reduce your exposure.",
  alternates: { canonical: '/insights/mastercard-3ds-authentication-fee-changes-europe' },
  openGraph: {
    url: 'https://chosepayments.com/insights/mastercard-3ds-authentication-fee-changes-europe',
    images: ['/og-default.png'],
    title: "Mastercard's 2026 3DS Authentication Fee Changes in Europe | ChosePayments",
    description: "What changed in Mastercard's EMV 3DS Authentication Fee from 29 July 2026, and how SCA exemptions reduce your exposure to it.",
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <MastercardThreeDSFeeChangesEurope />
    </Suspense>
  )
}
