import type { Metadata } from 'next'
import Index from '@/views/Index'

const TITLE = 'Find the Right Payment Processor for Your US Business | ChosePayments'
const DESCRIPTION = 'Switching, comparing or rejected? Find the right payment processor for your business. We compare 50+ US processors and negotiate your rates. Free.'

export const metadata: Metadata = {
  // Hardcoded in full: the root layout's title.template does not apply to the
  // "/" route specifically (reproduced in the static export build output;
  // every other route templates correctly). Spelling out the final string here
  // avoids depending on that.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    'payment provider risk profile',
    'best payment processor for my business',
    'payment provider matching',
    'merchant risk assessment',
    'payment provider fit',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    images: ['/og-default.png'],
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    url: 'https://chosepayments.com',
  },
}

// Homepage-only Service schema. The Organization and WebSite schema come from
// the root layout; the FAQPage schema is built from HOME_FAQS in CpFaq.
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Payment processor matching',
  serviceType: 'Payment processor comparison and matching',
  provider: { '@type': 'Organization', name: 'ChosePayments', url: 'https://chosepayments.com/' },
  areaServed: 'US',
  description: 'We compare 50+ US payment processors and match businesses with the ones that fit their business type, volume and risk profile, then negotiate rates and help with the switch.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c') }}
      />
      <Index />
    </>
  )
}

// migration test: new MacBook M4, 2026-05-14

// migration test: new MacBook M4, 2026-05-14

// migration test: new MacBook M4, 2026-05-14
