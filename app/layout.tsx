import '@/styles/aos.css'
import '@/styles/globals.scss'
import '@/styles/overrides.scss'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import clsx from 'clsx'
import { Metadata, Viewport } from 'next'

import ClientRender from '@/components/ClientRender'
import { HeroUIProvider } from '@/components/HeroUIProvider'
import ReactQueryProvider from '@/components/ReactQueryProvider'
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry'
import { SITE_CONFIG } from '@/config/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s - ${SITE_CONFIG.title}`,
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,

  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: SITE_CONFIG.images,
    siteName: SITE_CONFIG.title,
    url: SITE_CONFIG.url,
    phoneNumbers: ['+84392225405'],
    locale: 'vi',
    emails: 'hodiencong2000@gmail.com',
    countryName: 'Vietnamese',
    type: 'website',
  },
  bookmarks: SITE_CONFIG.url,
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  applicationName: SITE_CONFIG.title,
  icons: {
    icon: { url: SITE_CONFIG.icon },
    shortcut: { url: SITE_CONFIG.icon },
    apple: { url: SITE_CONFIG.icon },
  },
  manifest: '/manifest.json',
  twitter: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: SITE_CONFIG.images,
    site: SITE_CONFIG.url,
  },
  appleWebApp: {
    title: SITE_CONFIG.title,
    capable: true,
  },
  // <meta name="google-site-verification" content="-SD7kSWHZKEXxbtkWRvn1r5wtOy8o6Gv0wDuA_ituHk" />
  verification: {
    // google: 'YXX_WFs2UUKUX0hoW9cYgZsaKYARrlvneVgGWm7eGx8',
    google: process.env.NEXT_PUBLIC_MODE_PRODUCTION ? '-SD7kSWHZKEXxbtkWRvn1r5wtOy8o6Gv0wDuA_ituHk' : '',
    // me:'YXX_WFs2UUKUX0hoW9cYgZsaKYARrlvneVgGWm7eGx8'
  },
}

export const viewport: Viewport = {
  themeColor: 'white',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  colorScheme: 'light',
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang='vi'>
      {process.env.NEXT_PUBLIC_MODE_PRODUCTION && <GoogleTagManager gtmId='GTM-Z7WSP07S5Y' />}

      <head>
        {process.env.NEXT_PUBLIC_MODE_PRODUCTION && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'Engineer',
                  name: SITE_CONFIG.title,
                  url: SITE_CONFIG.url,
                  logo: SITE_CONFIG.images,
                  description: SITE_CONFIG.description,
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Tân Bình',
                    addressLocality: 'Sài Gòn',
                    addressCountry: 'Việt nam',
                  },
                  contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: '+84-392-225-405',
                    contactType: 'hodiencong2000@gmail.com',
                  },
                }),
              }}
              type='application/ld+json'
            />
          </>
        )}
      </head>
      <body
        className={clsx(
          // robotoSlab.variable,
          'bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900'
        )}
      >
        {process.env.NEXT_PUBLIC_MODE_PRODUCTION && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T7S7DKJ4"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
        )}
        <ReactQueryProvider>
          <StyledComponentsRegistry>
            <HeroUIProvider themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
              <ClientRender>{children}</ClientRender>
            </HeroUIProvider>
          </StyledComponentsRegistry>
        </ReactQueryProvider>
      </body>
      {process.env.NEXT_PUBLIC_MODE_PRODUCTION && (
        <>
          <GoogleAnalytics gaId='G-6PQHPT7TWN' />
        </>
      )}
    </html>
  )
}
