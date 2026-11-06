import { Metadata } from 'next'

import JourneyClient from './client'

import { SITE_CONFIG } from '@/config/site'
import { LINK_CONTACT } from '@/constants/app'
import { CERTIFICATES } from '@/constants/journey'
import { PROFILE } from '@/constants/profile'
import vn from '@/public/assets/language/vn.json'

// The site is served in Vietnamese by default (<html lang='vi'>), so SEO text comes from vn.json
const seo = vn.portfolio.journey
const PATH = '/journey'
// ~60 chars after the layout template appends the site name — avoids truncation in Google results
const title = `${vn.portfolio.nav.journey} & ${seo.certificates.title.split(' & ')[0]}`

// Safety net: keep the page out of Google until every TODO placeholder has been replaced
const hasPlaceholder = JSON.stringify(seo).includes('TODO')

const isFilled = (...values: string[]) => values.every((value) => !value.includes('TODO'))

export const metadata: Metadata = {
  title,
  description: seo.metaDes,
  keywords: ['Hồ Diên Công', 'hành trình lập trình viên', 'chứng nhận khởi nghiệp', 'nghiên cứu khoa học', 'Fullstack Software Engineer'],
  alternates: { canonical: PATH },
  openGraph: {
    title,
    description: seo.metaDes,
    url: PATH,
    type: 'profile',
    locale: 'vi_VN',
    siteName: SITE_CONFIG.title,
    images: { url: SITE_CONFIG.thumbnail, width: 1200, height: 630, alt: title },
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: seo.metaDes,
    images: { url: SITE_CONFIG.thumbnail, alt: title },
  },
  ...(hasPlaceholder && { robots: { index: false, follow: true } }),
}

const buildJsonLd = () => {
  const items = CERTIFICATES.map((certificate) => ({ certificate, text: seo.certificates.items[certificate.id] })).filter(({ text }) =>
    isFilled(text.title, text.issuer, text.des)
  )

  const credentials = items
    .filter(({ certificate }) => certificate.category !== 'award')
    .map(({ certificate, text }) => ({
      '@type': 'EducationalOccupationalCredential',
      name: text.title,
      description: text.des,
      credentialCategory: seo.certificates.filter[certificate.category],
      recognizedBy: { '@type': 'Organization', name: text.issuer },
      ...(certificate.year && /^\d{4}$/.test(certificate.year) && { dateCreated: certificate.year }),
      ...(certificate.image && { image: new URL(certificate.image, SITE_CONFIG.url).toString() }),
      ...(certificate.link && { url: certificate.link }),
    }))

  const awards = items.filter(({ certificate }) => certificate.category === 'award').map(({ text }) => `${text.title} — ${text.issuer}`)

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: new URL(PATH, SITE_CONFIG.url).toString(),
    name: title,
    description: seo.metaDes,
    inLanguage: 'vi',
    mainEntity: {
      '@type': 'Person',
      name: PROFILE.name,
      url: SITE_CONFIG.url,
      jobTitle: 'Fullstack Software Engineer',
      sameAs: [LINK_CONTACT.Github, LINK_CONTACT.LinkedIn, LINK_CONTACT.FaceBook].filter(Boolean),
      ...(credentials.length > 0 && { hasCredential: credentials }),
      ...(awards.length > 0 && { award: awards }),
    },
  }
}

export default function JourneyPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }} type='application/ld+json' />
      <JourneyClient />
    </>
  )
}
