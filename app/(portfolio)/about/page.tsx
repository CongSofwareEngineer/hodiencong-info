import AboutClient from './client'

import en from '@/public/assets/language/en.json'

export const metadata = {
  title: en.portfolio.nav.about,
  description: en.portfolio.about.metaDes,
}

export default function AboutPage() {
  return <AboutClient />
}
