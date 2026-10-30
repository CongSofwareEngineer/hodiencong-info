import SkillsClient from './client'

import en from '@/public/assets/language/en.json'

export const metadata = {
  title: en.portfolio.nav.skills,
  description: en.portfolio.skills.metaDes,
}

export default function SkillsPage() {
  return <SkillsClient />
}
