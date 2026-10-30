import ProjectsClient from './client'

import en from '@/public/assets/language/en.json'

export const metadata = {
  title: en.portfolio.nav.projects,
  description: en.portfolio.projects.metaDes,
}

export default function ProjectsPage() {
  return <ProjectsClient />
}
