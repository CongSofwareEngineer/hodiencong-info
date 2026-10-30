'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import ProjectCard from '@/app/(Components)/ProjectCard'
import CountUp from '@/components/Cinematic/CountUp'
import Marquee from '@/components/Cinematic/Marquee'
import Reveal from '@/components/Cinematic/Reveal'
import SectionHeading from '@/components/Cinematic/SectionHeading'
import TiltCard from '@/components/Cinematic/TiltCard'
import TypeRoles from '@/components/Cinematic/TypeRoles'
import GlobeIcon from '@/components/Icons/Globe'
import CodeIcon from '@/components/Icons/Home/Code'
import ServerIcon from '@/components/Icons/Home/Server'
import SmartPhoneIcon from '@/components/Icons/Home/SmartPhone'
import { MapPinIcon } from '@/components/Icons/MapPin'
import { getYearsExperience, PROFILE, PROJECTS, SKILLS, TECH_MARQUEE } from '@/constants/profile'
import useLanguage from '@/hooks/useLanguage'
import useMedia from '@/hooks/useMedia'

const Scene3D = dynamic(() => import('@/components/Cinematic/Scene3D'), { ssr: false })

const SERVICES = [
  { key: 'web', icon: CodeIcon, color: 'from-amber-300 to-orange-500' },
  { key: 'mobile', icon: SmartPhoneIcon, color: 'from-fuchsia-400 to-pink-600' },
  { key: 'api', icon: ServerIcon, color: 'from-cyan-300 to-blue-600' },
  { key: 'web3', icon: GlobeIcon, color: 'from-lime-300 to-emerald-600' },
] as const

const HomePage = () => {
  const { translate } = useLanguage()
  const { isMobile } = useMedia()

  const roles = [
    translate('portfolio.hero.roles.one'),
    translate('portfolio.hero.roles.two'),
    translate('portfolio.hero.roles.three'),
    translate('portfolio.hero.roles.four'),
  ]

  const stats = [
    { value: getYearsExperience(), suffix: '+', label: translate('portfolio.stats.years') },
    { value: PROJECTS.length, suffix: '+', label: translate('portfolio.stats.projects') },
    { value: Object.values(SKILLS).flat().length, suffix: '+', label: translate('portfolio.stats.technologies') },
    { value: 100, suffix: '%', label: translate('portfolio.stats.commitment') },
  ]

  const renderHero = () => {
    return (
      <section className='relative -mt-24 flex min-h-svh items-center overflow-hidden'>
        {isMobile ? (
          <div aria-hidden className='absolute inset-0 overflow-hidden md:hidden'>
            <div className='hero-orb' />
            <div className='cine-grain' />
          </div>
        ) : (
          <Scene3D className='opacity-60 md:opacity-100' />
        )}
        <div aria-hidden className='letterbox letterbox-top' />
        <div aria-hidden className='letterbox letterbox-bottom' />
        <div
          aria-hidden
          className='pointer-events-none absolute inset-0 bg-linear-to-r from-[#05050a] via-[#05050a]/60 to-transparent md:via-[#05050a]/30'
        />

        <div className='container relative z-10 mx-auto flex flex-col gap-7 px-5 pt-24 md:px-12'>
          <Reveal delay={1200} variant='fade'>
            <span className='cine-eyebrow'>{translate('portfolio.hero.eyebrow', { year: new Date().getFullYear() })}</span>
          </Reveal>

          <div className='flex flex-col gap-3'>
            <Reveal delay={1350} variant='fade'>
              <p className='text-lg text-white/60 md:text-xl'>{translate('portfolio.hero.greeting')}</p>
            </Reveal>
            <h1
              aria-label={PROFILE.name}
              className='font-display text-[15vw] font-bold uppercase leading-[0.85] tracking-tight md:text-[9vw] xl:text-[8rem]'
            >
              {PROFILE.name.split(' ').map((word, wordIndex) => (
                <span key={word} className='mr-[0.25em] inline-block whitespace-nowrap'>
                  {Array.from(word.normalize('NFC')).map((letter, letterIndex) => (
                    <span
                      key={`${word}-${letterIndex}`}
                      aria-hidden
                      className='hero-letter'
                      style={{ animationDelay: `${1.4 + (wordIndex * 4 + letterIndex) * 0.06}s` }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              ))}
            </h1>
          </div>

          <Reveal delay={2000}>
            <p className='text-xl text-white/80 md:text-3xl'>
              <span className='text-white/50'>{translate('portfolio.hero.rolePrefix')} </span>
              <TypeRoles className='font-display uppercase tracking-wide' roles={roles} />
            </p>
          </Reveal>

          <Reveal delay={2150}>
            <p className='max-w-xl text-base leading-relaxed text-white/60 md:text-lg'>{translate('portfolio.hero.description')}</p>
          </Reveal>

          <Reveal className='flex flex-wrap items-center gap-4' delay={2300}>
            <Link className='cine-btn cine-btn-primary' href='/projects'>
              ▶ {translate('portfolio.hero.ctaProjects')}
            </Link>
            <Link className='cine-btn cine-btn-ghost' href='/contact'>
              {translate('portfolio.hero.ctaContact')}
            </Link>
          </Reveal>

          <Reveal className='flex flex-wrap items-center gap-6 text-sm text-white/50' delay={2450}>
            <span className='flex items-center gap-2'>
              <MapPinIcon className='h-4 w-4 text-amber-300' />
              {translate('portfolio.hero.location')}
            </span>
            <span className='flex items-center gap-2'>
              <span className='relative flex h-2.5 w-2.5'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75' />
                <span className='relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400' />
              </span>
              {translate('portfolio.hero.available')}
            </span>
          </Reveal>
        </div>

        <div className='absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 md:flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/40'>
          {translate('portfolio.hero.scroll')}
          <span className='flex h-9 w-5 justify-center rounded-full border border-white/30 pt-1.5'>
            <span className='h-2 w-1 rounded-full bg-amber-300 animate-scroll-dot' />
          </span>
        </div>
      </section>
    )
  }

  const renderStats = () => {
    return (
      <section className='container mx-auto px-5 md:px-12'>
        <div className='glass grid grid-cols-2 gap-px overflow-hidden rounded-3xl md:grid-cols-4'>
          {stats.map((stat, index) => (
            <Reveal key={`stat-${index}`} className='flex flex-col items-center gap-2 px-4 py-10 text-center' delay={index * 120}>
              <CountUp className='font-display text-5xl text-gradient-gold md:text-7xl' suffix={stat.suffix} value={stat.value} />
              <span className='text-xs uppercase tracking-[0.25em] text-white/50'>{stat.label}</span>
            </Reveal>
          ))}
        </div>
      </section>
    )
  }

  const renderServices = () => {
    return (
      <section className='container mx-auto flex flex-col gap-14 px-5 md:px-12'>
        <SectionHeading eyebrow={translate('portfolio.services.eyebrow')} title={translate('portfolio.services.title')} />
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {SERVICES.map((service, index) => (
            <Reveal key={service.key} className='h-full' delay={index * 120} variant='flip'>
              <TiltCard className='h-full rounded-3xl'>
                <div className='glass shine-border flex h-full flex-col gap-5 rounded-3xl p-7'>
                  <span className='font-mono text-xs text-white/30'>{`0${index + 1}`}</span>
                  <span
                    className={`depth-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${service.color} shadow-[0_10px_40px_-10px_rgba(251,191,36,0.6)]`}
                  >
                    <service.icon className='h-7 w-7 text-black' />
                  </span>
                  <h3 className='depth-1 font-display text-2xl uppercase tracking-wide'>{translate(`portfolio.services.${service.key}.title`)}</h3>
                  <p className='text-sm leading-relaxed text-white/60'>{translate(`portfolio.services.${service.key}.des`)}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>
    )
  }

  const renderFeatured = () => {
    return (
      <section className='container mx-auto flex flex-col gap-14 px-5 md:px-12'>
        <div className='flex flex-col items-start justify-between gap-6 md:flex-row md:items-end'>
          <SectionHeading align='left' eyebrow={translate('portfolio.featured.eyebrow')} title={translate('portfolio.featured.title')} />
          <Reveal>
            <Link className='cine-btn cine-btn-ghost' href='/projects'>
              {translate('portfolio.featured.viewAll')} →
            </Link>
          </Reveal>
        </div>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {PROJECTS.slice(0, 3).map((project, index) => (
            <Reveal key={project.id} className='h-full' delay={index * 150}>
              <ProjectCard index={index} project={project} />
            </Reveal>
          ))}
        </div>
      </section>
    )
  }

  const renderCta = () => {
    return (
      <section className='container mx-auto px-5 md:px-12'>
        <Reveal variant='zoom'>
          <div className='glass relative overflow-hidden rounded-[2.5rem] px-6 py-20 text-center md:px-16 md:py-28'>
            <div aria-hidden className='hero-orb opacity-40' />
            <div className='relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6'>
              <span className='cine-eyebrow'>{translate('portfolio.cta.eyebrow')}</span>
              <h2 className='cine-title text-4xl md:text-7xl'>{translate('portfolio.cta.title')}</h2>
              <p className='text-base text-white/70 md:text-lg'>{translate('portfolio.cta.des')}</p>
              <Link className='cine-btn cine-btn-primary mt-4' href='/contact'>
                {translate('portfolio.cta.button')} ✦
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    )
  }

  return (
    <div className='flex flex-col gap-28 pb-28 md:gap-40'>
      {renderHero()}
      <div className='-my-10 flex flex-col gap-2 md:-my-20'>
        <Marquee items={TECH_MARQUEE} />
        <Marquee reverse items={[...TECH_MARQUEE].reverse()} />
      </div>
      {renderStats()}
      {renderServices()}
      {renderFeatured()}
      {renderCta()}
    </div>
  )
}

export default HomePage
