import type { Metadata } from 'next'
import { Suspense } from 'react'
import Contact from '@/views/Contact'

export const metadata: Metadata = {
  title: 'Contact Us | ChosePayments',
  description: 'Get in touch with ChosePayments for help choosing a payment provider or any questions.',
  alternates: { canonical: '/contact' },
  openGraph: { title: 'Contact Us | ChosePayments', description: 'Get in touch with ChosePayments for help choosing a payment provider or any questions.', type: 'website' },
}

export default function Page() {
  return (
    <Suspense>
      <Contact />
    </Suspense>
  )
}
