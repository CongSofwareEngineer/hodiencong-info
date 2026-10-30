'use client'
import Link from 'next/link'

import PageHero from '@/components/Cinematic/PageHero'
import Reveal from '@/components/Cinematic/Reveal'
import SectionHeading from '@/components/Cinematic/SectionHeading'
import TiltCard from '@/components/Cinematic/TiltCard'
import AwardIcon from '@/components/Icons/Home/Award'
import CodeIcon from '@/components/Icons/Home/Code'
import CoffeeIcon from '@/components/Icons/Home/Coffee'
import SparklesIcon from '@/components/Icons/Home/Sparkles'
import ZapIcon from '@/components/Icons/Zap'
import MyImage from '@/components/MyImage'
import { images } from '@/config/images'
import { getYearsExperience, JOURNEY, PROFILE } from '@/constants/profile'
import useLanguage from '@/hooks/useLanguage'
import { cn } from '@/utils/tailwind'

const VALUES = [
  { key: 'clean', icon: CodeIcon, color: 'text-amber-300' },
  { key: 'performance', icon: ZapIcon, color: 'text-cyan-300' },
  { key: 'ux', icon: SparklesIcon, color: 'text-fuchsia-300' },
  { key: 'growth', icon: AwardIcon, color: 'text-lime-300' },
] as const

const FACTS = [
  { key: 'coffee', emoji: '☕' },
  { key: 'music', emoji: '🎧' },
  { key: 'learn', emoji: '📚' },
  { key: 'ship', emoji: '🚀' },
] as const

const AboutClient = () => {
  const { translate } = useLanguage()

  const renderStory = () => {
    return (
      <section className='container mx-auto grid items-center gap-14 px-5 md:px-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]'>
        <Reveal variant='left'>
          <TiltCard className='mx-auto w-full max-w-sm rounded-[2rem]' maxTilt={14}>
            <div className='glass relative overflow-hidden rounded-[2rem] p-3'>
              <div className='relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-linear-to-br from-amber-400/30 via-fuchsia-500/20 to-cyan-400/30'>
                <MyImage alt={PROFILE.name} className='h-full! w-full! object-cover' src={images.logo} />
                <div className='absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent' />
                <div className='depth-2 absolute inset-x-5 bottom-5 flex flex-col gap-1'>
                  <span className='font-display text-3xl uppercase'>{PROFILE.name}</span>
                  <span className='text-sm text-amber-200/80'>{translate('portfolio.hero.roles.one')}</span>
                </div>
              </div>
              <div className='depth-2 absolute -right-3 top-8 rotate-6 rounded-2xl bg-linear-to-br from-amber-300 to-orange-500 px-4 py-3 text-center text-black shadow-2xl'>
                <div className='font-display text-3xl leading-none'>{getYearsExperience()}+</div>
                <div className='text-[10px] font-semibold uppercase tracking-widest'>{translate('portfolio.stats.years')}</div>
              </div>
            </div>
          </TiltCard>
        </Reveal>

        <div className='flex flex-col gap-6'>
          <SectionHeading align='left' eyebrow={translate('portfolio.about.storyTitle')} title={translate('portfolio.about.title')} />
          {(['story1', 'story2', 'story3'] as const).map((key, index) => (
            <Reveal key={key} delay={index * 150}>
              <p
                className={cn(
                  'text-base leading-relaxed text-white/70 md:text-lg',
                  index === 0 &&
                    'first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:leading-none first-letter:text-amber-300'
                )}
              >
                {translate(`portfolio.about.${key}`)}
              </p>
            </Reveal>
          ))}
          <Reveal className='flex flex-wrap gap-4 pt-2' delay={450}>
            <Link className='cine-btn cine-btn-primary' href='/projects'>
              {translate('portfolio.featured.viewAll')}
            </Link>
            <Link className='cine-btn cine-btn-ghost' href='/contact'>
              {translate('portfolio.cta.button')}
            </Link>
          </Reveal>
        </div>
      </section>
    )
  }

  const renderValues = () => {
    return (
      <section className='container mx-auto flex flex-col gap-14 px-5 md:px-12'>
        <SectionHeading eyebrow={translate('portfolio.about.valuesEyebrow')} title={translate('portfolio.about.valuesTitle')} />
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {VALUES.map((value, index) => (
            <Reveal key={value.key} className='h-full' delay={index * 120} variant='flip'>
              <TiltCard className='h-full rounded-3xl'>
                <div className='glass shine-border flex h-full flex-col gap-4 rounded-3xl p-7'>
                  <value.icon className={cn('depth-2 h-10 w-10', value.color)} />
                  <h3 className='depth-1 font-display text-2xl uppercase tracking-wide'>{translate(`portfolio.about.values.${value.key}.title`)}</h3>
                  <p className='text-sm leading-relaxed text-white/60'>{translate(`portfolio.about.values.${value.key}.des`)}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>
    )
  }

  const renderJourney = () => {
    return (
      <section className='container mx-auto flex flex-col gap-16 px-5 md:px-12'>
        <SectionHeading eyebrow={translate('portfolio.about.journeyEyebrow')} title={translate('portfolio.about.journeyTitle')} />
        <div className='relative mx-auto w-full max-w-4xl'>
          <div aria-hidden className='absolute bottom-0 left-4 top-0 w-px bg-linear-to-b from-amber-300 via-fuchsia-400 to-cyan-400 md:left-1/2' />
          <div className='flex flex-col gap-12'>
            {JOURNEY.map((key, index) => {
              const isLeft = index % 2 === 0

              return (
                <Reveal
                  key={key}
                  className={cn('relative pl-12 md:w-1/2 md:pl-0', isLeft ? 'md:pr-14 md:text-right' : 'md:ml-auto md:pl-14')}
                  variant={isLeft ? 'left' : 'right'}
                >
                  <span
                    aria-hidden
                    className={cn(
                      'absolute left-4 top-6 h-4 w-4 -translate-x-1/2 rounded-full bg-amber-300 shadow-[0_0_20px_4px_rgba(251,191,36,0.7)]',
                      isLeft ? 'md:left-auto md:right-0 md:translate-x-1/2' : 'md:left-0'
                    )}
                  />
                  <div className='glass shine-border flex flex-col gap-2 rounded-3xl p-6'>
                    <span className='font-display text-5xl text-gradient-gold'>{key.replace('y', '')}</span>
                    <h3 className='font-display text-xl uppercase tracking-wide'>{translate(`portfolio.about.journey.${key}.title`)}</h3>
                    <p className='text-sm leading-relaxed text-white/60'>{translate(`portfolio.about.journey.${key}.des`)}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  const renderFacts = () => {
    return (
      <section className='container mx-auto flex flex-col gap-14 px-5 md:px-12'>
        <SectionHeading eyebrow={translate('portfolio.about.factsEyebrow')} title={translate('portfolio.about.factsTitle')} />
        <div className='grid grid-cols-2 gap-6 md:grid-cols-4'>
          {FACTS.map((fact, index) => (
            <Reveal key={fact.key} delay={index * 100} variant='zoom'>
              <div className='glass group flex flex-col items-center gap-4 rounded-3xl px-4 py-10 text-center'>
                <span className='text-5xl transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-12 group-hover:scale-125'>
                  {fact.emoji}
                </span>
                <span className='text-sm uppercase tracking-[0.2em] text-white/70'>{translate(`portfolio.about.facts.${fact.key}`)}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className='flex justify-center'>
          <CoffeeIcon className='h-8 w-8 animate-float text-amber-300/60' />
        </Reveal>
      </section>
    )
  }

  return (
    <div className='flex flex-col gap-28 pb-28 md:gap-40'>
      <PageHero
        description={translate('portfolio.about.des')}
        eyebrow={translate('portfolio.about.eyebrow')}
        scene='02 / 05'
        title={translate('portfolio.nav.about')}
      />
      {renderStory()}
      {renderValues()}
      {renderJourney()}
      {renderFacts()}
    </div>
  )
}

export default AboutClient
