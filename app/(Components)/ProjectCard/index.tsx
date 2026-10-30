import { CSSProperties } from 'react'

import TiltCard from '@/components/Cinematic/TiltCard'
import { ExternalLinkIcon } from '@/components/Icons/ExternalLink'
import GlobeIcon from '@/components/Icons/Globe'
import DataBaseIcon from '@/components/Icons/Home/Database'
import SmartPhoneIcon from '@/components/Icons/Home/SmartPhone'
import MyImage from '@/components/MyImage'
import { Project } from '@/constants/profile'
import useLanguage from '@/hooks/useLanguage'
import { cn } from '@/utils/tailwind'

type Props = {
  project: Project
  index?: number
  className?: string
}

const CATEGORY_ICON = {
  web: GlobeIcon,
  mobile: SmartPhoneIcon,
  api: DataBaseIcon,
}

const ProjectCard = ({ project, index = 0, className }: Props) => {
  const { translate } = useLanguage()
  const Icon = CATEGORY_ICON[project.category]

  return (
    <TiltCard className={cn('h-full rounded-3xl', className)} maxTilt={10}>
      <a
        className='glass shine-border group flex h-full flex-col overflow-hidden rounded-3xl transition-shadow duration-500 hover:shadow-[0_30px_80px_-20px_var(--accent)]'
        href={project.link}
        rel='noopener noreferrer'
        style={{ '--accent': `${project.accent}99` } as CSSProperties}
        target='_blank'
      >
        <div className='relative h-56 overflow-hidden'>
          <MyImage
            alt={project.title}
            className='h-full! w-full! object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110'
            sizes='(max-width: 768px) 100vw, 33vw'
            src={project.image}
          />
          <div className='absolute inset-0 bg-linear-to-t from-[#05050a] via-[#05050a]/30 to-transparent' />
          <div
            className='absolute inset-0 opacity-0 mix-blend-color transition-opacity duration-500 group-hover:opacity-40'
            style={{ background: project.accent }}
          />
          <span className='absolute left-4 top-4 font-mono text-[11px] tracking-[0.3em] text-white/70'>
            {`#${String(index + 1).padStart(2, '0')} · ${project.year}`}
          </span>
          <span className='depth-1 absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-black/40 backdrop-blur-md'>
            <Icon className='h-5 w-5' style={{ color: project.accent }} />
          </span>
        </div>

        <div className='flex flex-1 flex-col gap-4 p-6'>
          <div className='flex items-center justify-between gap-3'>
            <h3 className='font-display text-2xl uppercase tracking-wide text-white'>{project.title}</h3>
            {project.isPersonal && (
              <span className='rounded-full border border-amber-300/30 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-amber-200/80'>
                {translate('portfolio.projects.personal')}
              </span>
            )}
          </div>
          <p className='text-sm leading-relaxed text-white/60'>{translate(`portfolio.projects.items.${project.id}`)}</p>
          <div className='flex flex-wrap gap-2'>
            {project.technologies.map((tech) => (
              <span key={tech} className='rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70'>
                {tech}
              </span>
            ))}
          </div>
          <span className='mt-auto inline-flex items-center gap-2 pt-2 text-sm uppercase tracking-[0.2em] text-white/80 transition-colors group-hover:text-amber-300'>
            {translate('portfolio.projects.visit')}
            <ExternalLinkIcon className='h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1' />
          </span>
        </div>
      </a>
    </TiltCard>
  )
}

export default ProjectCard
