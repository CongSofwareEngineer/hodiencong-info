import { Metadata } from 'next'
import React from 'react'
import { Inter } from 'next/font/google'
import AntdProvider from '@/components/AntdProvider'
import ReduxProvider from '@/components/ReduxProvider'
import MyModalProvider from '@/components/MyModal'
import '@/styles/globals.scss'
import '@/styles/override.scss'
// import '@/styles/aos.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import StyledComponentsRegistry from '@/components/RegistryApp'
import ClientRender from '@/components/ClientRender'
import type { Viewport } from 'next'
import ReactQueryProvider from '@/components/ReactQueryProvider'
import DrawerProvider from '@/components/DrawerProvider'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Script from 'next/script'
import localFont from 'next/font/local'

const font_local = localFont({
  src: './Fast-Hand.otf',
  variable: '--font-font-local',
})

const inter = Inter({ subsets: ['latin'] })

const BaseMeta = {
  title: process.env.NEXT_PUBLIC_TITLE,
  description: process.env.NEXT_PUBLIC_TITLE_DES,
  images: process.env.NEXT_PUBLIC_IMAGE,
}
export const metadata: Metadata = {
  metadataBase: new URL('https://hdcong.vercel.app/'),
  title: BaseMeta.title,
  description: BaseMeta.description,
  keywords: [
    'Hồ Diên Công',
    'Công',
    'Software Engineer',
    'Công front end',
    'Công full stack',
    'Reactjs',
    'React native',
    'Website',
  ],
  openGraph: {
    title: BaseMeta.title,
    description: BaseMeta.description,
    images: BaseMeta.images,
    siteName: BaseMeta.title,
    url: 'https://hdcong.vercel.app',
  },
  bookmarks: 'https://hdcong.vercel.app',
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: { url: '/favicon.ico' },
    shortcut: { url: '/favicon.ico' },
    apple: { url: '/favicon.ico' },
  },
  manifest: '/manifest.json',
  twitter: {
    title: BaseMeta.title,
    description: BaseMeta.description,
    card: 'summary_large_image',
    images: BaseMeta.images,
  },
  appleWebApp: {
    title: BaseMeta.title,
  },
  verification: {
    // google: '-SD7kSWHZKEXxbtkWRvn1r5wtOy8o6Gv0wDuA_ituHk',
    google: '-SD7kSWHZKEXxbtkWRvn1r5wtOy8o6Gv0wDuA_ituHk',
  },
  appLinks: {
    web: {
      url: 'https://hdcong.vercel.app',
      should_fallback: true,
    },
  },
}

export const viewport: Viewport = {
  themeColor: 'black',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

const LayoutMain = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <link rel="profile" href="https://gmpg.org/xfn/11" />
        {/* Google / Search Engine Tags  */}
        <meta itemProp="name" content={process.env.NEXT_PUBLIC_TITLE} />
        <meta
          itemProp="description"
          content={process.env.NEXT_PUBLIC_TITLE_DES}
        />
        <meta itemProp="image" content={'/favicon.ico'} />

        {process.env.NEXT_PUBLIC_MODE_PRODUCTION && (
          <>
            <meta
              name="google-site-verification"
              content="-SD7kSWHZKEXxbtkWRvn1r5wtOy8o6Gv0wDuA_ituHk"
            />
            <Script
              id="GTM-T7S7DKJ4"
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-T7S7DKJ4')`,
              }}
            />
            <Script
              id="G-Z7WSP07S5Y"
              dangerouslySetInnerHTML={{
                __html: `<script async src="https://www.googletagmanager.com/gtag/js?id=G-Z7WSP07S5Y"></script>
                <script>
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                
                  gtag('config', 'G-Z7WSP07S5Y');
                </script>`,
              }}
            />
          </>
        )}

        <link
          href="https://unpkg.com/aos@2.3.1/dist/aos.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} ${font_local.variable}`}>
        {/* <script src="https://unpkg.com/aos@next/dist/aos.js"></script> */}
        {/* <script src="bower_components/aos/dist/aos.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `AOS && AOS.refresh()`,
          }}
        /> */}
        {/* 
        
         <script
          dangerouslySetInnerHTML={{
            __html: `setTimeout(() => {AOS.init({duration: 1000})},[500])`,
          }}
        /> */}
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
            <AntdRegistry>
              <AntdProvider>
                <ReduxProvider>
                  <MyModalProvider>
                    <DrawerProvider>
                      <ClientRender>{children}</ClientRender>
                    </DrawerProvider>
                  </MyModalProvider>
                </ReduxProvider>
              </AntdProvider>
            </AntdRegistry>
          </StyledComponentsRegistry>
        </ReactQueryProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}

export default LayoutMain
