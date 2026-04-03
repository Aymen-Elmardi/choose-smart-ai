import type { Metadata } from 'next'
import { Suspense } from 'react'
import WalletPaymentsGuaranteedSuccess from '@/views/insights/WalletPaymentsGuaranteedSuccess'

export const metadata: Metadata = {
  title: 'Why Wallet Payments Have Higher Success Rates | ChosePayments',
  description: 'Apple Pay and Google Pay consistently outperform card payments on approval rates. Learn why wallets succeed where cards fail.',
  alternates: { canonical: '/insights/wallet-payments-guaranteed-success' },
  openGraph: {
    title: 'Why Wallet Payments Have Higher Success Rates | ChosePayments',
    description: 'Apple Pay and Google Pay consistently outperform card payments on approval rates. Learn why wallets succeed where cards fail.',
    type: 'article',
  },
}

export default function Page() {
  return (
    <Suspense>
      <WalletPaymentsGuaranteedSuccess />
    </Suspense>
  )
}
