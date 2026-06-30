import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
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
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon.ico', sizes: 'any' },
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
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-L6LB24F1J8" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-L6LB24F1J8');`}
        </Script>
        <Script id="crisp-chat" strategy="afterInteractive">
          {`window.$crisp=[];window.CRISP_WEBSITE_ID="0292116c-4c90-40f8-9367-5343a3431cc8";(function(){var loaded=false;function load(){if(loaded)return;loaded=true;var d=document,s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);}var evts=["mousemove","scroll","keydown","touchstart","click"];function onInteract(){load();evts.forEach(function(e){window.removeEventListener(e,onInteract);});}evts.forEach(function(e){window.addEventListener(e,onInteract,{passive:true});});setTimeout(load,8000);})();`}
        </Script>
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","uybbw4kt5g");`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://chosepayments.com/#organization","name":"ChosePayments","url":"https://chosepayments.com","logo":"https://chosepayments.com/favicon.png","description":"Free payment processor matching service for US, UK and EU businesses. We match your business to the right merchant account provider. Always free for merchants.","areaServed":["GB","EU"],"contactPoint":{"@type":"ContactPoint","contactType":"customer support","url":"https://chosepayments.com/contact","areaServed":["GB","EU"],"availableLanguage":"English"},"sameAs":["https://www.linkedin.com/company/chosepayments"]},{"@type":"WebSite","@id":"https://chosepayments.com/#website","url":"https://chosepayments.com","name":"ChosePayments","description":"Independent payment processor matching for UK and EU merchants. Find the provider that fits your risk profile before you apply.","publisher":{"@id":"https://chosepayments.com/#organization"},"sameAs":["https://www.linkedin.com/company/chosepayments"]}]}`,
          }}
        />
      </body>
    </html>
  )
}
