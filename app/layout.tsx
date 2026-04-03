import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import AppErrorBoundary from '@/components/AppErrorBoundary'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://chosepayments.com'),
  title: {
    default: 'ChosePayments: Payment Processor Matching for UK Merchants',
    template: '%s | ChosePayments',
  },
  description:
    'Find the right payment processor for your business. Avoid frozen accounts and rejections. Get matched with a provider that fits your risk profile in 2 minutes.',
  openGraph: {
    type: 'website',
    siteName: 'ChosePayments',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'ChosePayments',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@chosepayments',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable} data-scroll-behavior="smooth">
      <body>
        <Providers>
          <AppErrorBoundary>
            {children}
          </AppErrorBoundary>
        </Providers>
      </body>
    </html>
  )
}
