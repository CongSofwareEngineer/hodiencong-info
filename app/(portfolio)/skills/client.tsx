'use client'
import { useState } from 'react'

import PageHero from '@/components/Cinematic/PageHero'
import Reveal from '@/components/Cinematic/Reveal'
import SectionHeading from '@/components/Cinematic/SectionHeading'
import TechSphere from '@/components/Cinematic/TechSphere'
import TiltCard from '@/components/Cinematic/TiltCard'
import StarIcon from '@/components/Icons/Star'
import { SkillCategory, SKILLS } from '@/constants/profile'
import useLanguage from '@/hooks/useLanguage'
import useMedia from '@/hooks/useMedia'
import { cn } from '@/utils/tailwind'

const CATEGORY_COLOR: Record<SkillCategory, string> = {
  frontend: 'from-amber-300 to-orange-500',
  backend: 'from-lime-300 to-emerald-500',
  mobile: 'from-fuchsia-400 to-pink-600',
  database: 'from-orange-400 to-red-500',
  cloud: 'from-cyan-300 to-blue-600',
  tools: 'from-violet-300 to-indigo-600',
}

const SkillsClient = () => {
  const { translate } = useLanguage()
  const { isMobile } = useMedia()
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('frontend')

  const sphereItems = Object.values(SKILLS)
    .flat()
    .map((skill) => skill.name)

  const getLevelLabel = (level: number) => {
    if (level >= 90) return translate('home.veryGood')
    if (level >= 80) return translate('home.advanced')
    if (level >= 70) return translate('home.intermediate')

    return translate('home.beginner')
  }

  const renderSphere = () => {
    return (
      <section className='container mx-auto grid items-center gap-10 px-5 md:px-12 lg:grid-cols-2'>
        <SectionHeading
          align='left'
          description={translate('portfolio.skills.orbitDes')}
          eyebrow={translate('portfolio.skills.eyebrow')}
          title={translate('portfolio.skills.orbitTitle')}
        />
        <Reveal variant='zoom'>
          <TechSphere items={sphereItems} radius={isMobile ? 140 : 210} />
        </Reveal>
      </section>
    )
  }

  const renderSkills = () => {
    return (
      <section className='container mx-auto flex flex-col gap-12 px-5 md:px-12'>
        <Reveal className='flex flex-wrap justify-center gap-3'>
          {(Object.keys(SKILLS) as SkillCategory[]).map((category) => (
            <button
              key={category}
              className={cn(
                'rounded-full px-5 py-2.5 text-sm uppercase tracking-[0.15em] transition-all duration-300',
                activeCategory === category
                  ? cn('bg-linear-to-r text-black shadow-[0_0_30px_-5px_rgba(251,191,36,0.6)]', CATEGORY_COLOR[category])
                  : 'border border-white/15 text-white/70 hover:border-white/40 hover:text-white'
              )}
              type='button'
              onClick={() => setActiveCategory(category)}
            >
              {translate(`portfolio.skills.categories.${category}`)}
            </button>
          ))}
        </Reveal>

        <div key={activeCategory} className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {SKILLS[activeCategory].map((skill, index) => (
            <Reveal key={skill.name} delay={index * 70} variant='flip'>
              <TiltCard className='rounded-3xl'>
                <div className='glass shine-border flex flex-col gap-5 rounded-3xl p-6'>
                  <div className='flex items-center justify-between'>
                    <span className='depth-2 text-4xl'>{skill.icon}</span>
                    <span
                      className={cn('rounded-full bg-linear-to-r px-2.5 py-0.5 text-xs font-semibold text-black', CATEGORY_COLOR[activeCategory])}
                    >
                      {skill.level}%
                    </span>
                  </div>
                  <h3 className='depth-1 font-display text-xl uppercase tracking-wide'>{skill.name}</h3>
                  <div className='h-1.5 w-full overflow-hidden rounded-full bg-white/10'>
                    <div
                      className={cn('skill-bar h-full rounded-full bg-linear-to-r', CATEGORY_COLOR[activeCategory])}
                      style={{ width: `${skill.level}%`, animationDelay: `${index * 70 + 300}ms` }}
                    />
                  </div>
                  <div className='flex items-center justify-between text-xs text-white/50'>
                    <span>{translate('home.proficiency')}</span>
                    <span className='flex items-center gap-1'>
                      {skill.level >= 90 && <StarIcon className='h-3 w-3 fill-current text-amber-300' />}
                      {getLevelLabel(skill.level)}
                    </span>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>
    )
  }

  return (
    <div className='flex flex-col gap-24 pb-28 md:gap-32'>
      <PageHero
        description={translate('portfolio.skills.des')}
        eyebrow={translate('portfolio.skills.eyebrow')}
        scene='03 / 05'
        title={translate('portfolio.nav.skills')}
      />
      {renderSphere()}
      {renderSkills()}
    </div>
  )
}

export default SkillsClient
