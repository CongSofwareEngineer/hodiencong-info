import ContactClient from './client'

import en from '@/public/assets/language/en.json'

export const metadata = {
  title: en.portfolio.nav.contact,
  description: en.portfolio.contact.metaDes,
}

export default function ContactPage() {
  return <ContactClient />
}
