import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { Providers } from './providers'
import AppErrorBoundary from '@/components/AppErrorBoundary'
import CookieConsent from '@/components/CookieConsent'
import { LOGO } from '@/lib/brand'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Headings, logo wordmark and stat numbers in the 2026 homepage design.
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-space-grotesk',
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
      // No SVG variant for the 2026 mark yet. Left out deliberately: browsers
      // prefer an SVG icon over every PNG, so a stale one silently wins the tab.
      { url: LOGO.icons.png32, type: 'image/png', sizes: '32x32' },
      { url: LOGO.icons.png16, type: 'image/png', sizes: '16x16' },
      { url: LOGO.icons.ico, sizes: 'any' },
    ],
    apple: LOGO.icons.apple,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable}`} data-scroll-behavior="smooth">
      <head>
        {/* Goji Website visitors. Snippet as supplied, with its consent line
            enabled: nothing is tracked until CookieConsent calls
            GojiberryVisitors.init() after the visitor accepts. `defer`
            instead of `async`: React hoists async scripts to the top of
            <head>, ahead of the consent stub, which would let Goji start
            before consent. A deferred script stays here and runs after it. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.GojiberryVisitors=window.GojiberryVisitors||{init:function(){window.GojiberryVisitors.initCalled=true}};`,
          }}
        />
        <script defer src="https://visitor.wv.gojiberry.ai/wv.js?uid=40376&aid=38032"></script>
      </head>
      <body>
        <Providers>
          <AppErrorBoundary>
            {children}
          </AppErrorBoundary>
          <CookieConsent />
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
            __html: `{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://chosepayments.com/#organization","name":"ChosePayments","alternateName":["Chose Payments","Choose Payments"],"url":"https://chosepayments.com/","logo":"https://chosepayments.com/favicon.png","description":"Independent payment advisory that helps US businesses find, compare and switch payment processors.","areaServed":"US","contactPoint":{"@type":"ContactPoint","contactType":"customer support","url":"https://chosepayments.com/contact","areaServed":"US","availableLanguage":"English"},"sameAs":["https://www.linkedin.com/company/chosepayments"]},{"@type":"WebSite","@id":"https://chosepayments.com/#website","url":"https://chosepayments.com","name":"ChosePayments","description":"Independent payment advisory that helps US businesses find, compare and switch payment processors.","publisher":{"@id":"https://chosepayments.com/#organization"},"sameAs":["https://www.linkedin.com/company/chosepayments"]}]}`,
          }}
        />
      </body>
    </html>
  )
}
