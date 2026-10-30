'use client'
import { useState } from 'react'

import ProjectCard from '@/app/(Components)/ProjectCard'
import PageHero from '@/components/Cinematic/PageHero'
import Reveal from '@/components/Cinematic/Reveal'
import { ProjectCategory, PROJECTS } from '@/constants/profile'
import useLanguage from '@/hooks/useLanguage'
import { cn } from '@/utils/tailwind'

type Filter = 'all' | ProjectCategory

const FILTERS: Filter[] = ['all', 'web', 'mobile', 'api']

const ProjectsClient = () => {
  const { translate } = useLanguage()
  const [filter, setFilter] = useState<Filter>('all')

  const projects = filter === 'all' ? PROJECTS : PROJECTS.filter((project) => project.category === filter)

  return (
    <div className='flex flex-col gap-16 pb-28'>
      <PageHero
        description={translate('portfolio.projects.des')}
        eyebrow={translate('portfolio.projects.eyebrow')}
        scene='04 / 05'
        title={translate('portfolio.nav.projects')}
      />

      <section className='container mx-auto flex flex-col gap-12 px-5 md:px-12'>
        <Reveal className='flex flex-wrap justify-center gap-3'>
          {FILTERS.map((item) => (
            <button
              key={item}
              className={cn(
                'rounded-full px-6 py-2.5 text-sm uppercase tracking-[0.2em] transition-all duration-300',
                filter === item
                  ? 'bg-linear-to-r from-amber-300 to-orange-500 text-black shadow-[0_0_30px_-5px_rgba(251,191,36,0.6)]'
                  : 'border border-white/15 text-white/70 hover:border-white/40 hover:text-white'
              )}
              type='button'
              onClick={() => setFilter(item)}
            >
              {translate(`portfolio.projects.filter.${item}`)}
              <span className='ml-2 opacity-60'>
                {item === 'all' ? PROJECTS.length : PROJECTS.filter((project) => project.category === item).length}
              </span>
            </button>
          ))}
        </Reveal>

        <div key={filter} className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {projects.map((project, index) => (
            <Reveal key={project.id} className='h-full' delay={index * 100}>
              <ProjectCard index={PROJECTS.indexOf(project)} project={project} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ProjectsClient
