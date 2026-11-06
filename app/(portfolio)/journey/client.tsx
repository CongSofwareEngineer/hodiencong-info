'use client'
import Link from 'next/link'
import { useCallback, useState } from 'react'

import { CertificateCard, CertificateViewer } from '@/app/(Components)/Certificate'
import PageHero from '@/components/Cinematic/PageHero'
import Reveal from '@/components/Cinematic/Reveal'
import SectionHeading from '@/components/Cinematic/SectionHeading'
import MyImage from '@/components/MyImage'
import { Certificate, CertificateCategory, CERTIFICATES, JOURNEY_CHAPTERS } from '@/constants/journey'
import useLanguage from '@/hooks/useLanguage'
import { cn } from '@/utils/tailwind'

type Filter = 'all' | CertificateCategory

const CATEGORY_ORDER: CertificateCategory[] = ['startup', 'research', 'award', 'course']

const JourneyClient = () => {
  const { translate } = useLanguage()
  const [filter, setFilter] = useState<Filter>('all')
  const [openedCertificate, setOpenedCertificate] = useState<Certificate | null>(null)

  const closeViewer = useCallback(() => setOpenedCertificate(null), [])

  // Only show filter chips for categories that actually have certificates
  const filters: Filter[] = ['all', ...CATEGORY_ORDER.filter((category) => CERTIFICATES.some((item) => item.category === category))]
  const certificates = filter === 'all' ? CERTIFICATES : CERTIFICATES.filter((item) => item.category === filter)

  const renderChapters = () => {
    return (
      <section className='container mx-auto flex flex-col gap-16 px-5 md:px-12'>
        <SectionHeading eyebrow={translate('portfolio.journey.chaptersEyebrow')} title={translate('portfolio.journey.chaptersTitle')} />

        <div className='relative mx-auto flex w-full max-w-5xl flex-col gap-20 md:gap-28'>
          <div
            aria-hidden
            className='absolute bottom-0 left-6 top-0 w-px bg-linear-to-b from-amber-300/60 via-fuchsia-400/40 to-cyan-400/60 md:left-[7.5rem]'
          />

          {JOURNEY_CHAPTERS.map((chapter, index) => (
            <Reveal key={chapter.id} className='relative grid gap-6 pl-16 md:grid-cols-[6rem_minmax(0,1fr)] md:gap-16 md:pl-0'>
              <div className='flex flex-col md:items-end md:pt-2 md:text-right'>
                <span className='font-mono text-[11px] uppercase tracking-[0.3em] text-white/40'>
                  {translate('portfolio.journey.chapterLabel', { number: String(index + 1).padStart(2, '0') })}
                </span>
                <span className='font-display text-4xl leading-tight md:text-5xl' style={{ color: chapter.accent }}>
                  {chapter.year}
                </span>
              </div>

              <span
                aria-hidden
                className='absolute left-6 top-1 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border bg-[#05050a] text-2xl md:left-[7.5rem] md:top-2'
                style={{ borderColor: chapter.accent, boxShadow: `0 0 30px -4px ${chapter.accent}` }}
              >
                {chapter.emoji}
              </span>

              <div className='glass shine-border flex flex-col gap-5 rounded-3xl p-6 md:ml-6 md:p-10'>
                <h3 className='font-display text-2xl uppercase tracking-wide md:text-4xl'>
                  {translate(`portfolio.journey.chapters.${chapter.id}.title`)}
                </h3>
                <p className='text-base leading-relaxed text-white/70 md:text-lg'>{translate(`portfolio.journey.chapters.${chapter.id}.des`)}</p>
                {chapter.image && (
                  <div className='relative aspect-video overflow-hidden rounded-2xl'>
                    <MyImage
                      alt={translate(`portfolio.journey.chapters.${chapter.id}.title`)}
                      className='h-full! w-full! object-cover'
                      sizes='(max-width: 768px) 100vw, 60vw'
                      src={chapter.image}
                    />
                  </div>
                )}
                <blockquote className='border-l-2 pl-4 text-sm italic text-white/50 md:text-base' style={{ borderColor: chapter.accent }}>
                  “{translate(`portfolio.journey.chapters.${chapter.id}.lesson`)}”
                </blockquote>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    )
  }

  const renderCertificates = () => {
    return (
      <section className='container mx-auto flex flex-col gap-12 px-5 md:px-12'>
        <SectionHeading eyebrow={translate('portfolio.journey.certificates.eyebrow')} title={translate('portfolio.journey.certificates.title')} />

        <Reveal className='flex flex-wrap justify-center gap-3'>
          {filters.map((item) => (
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
              {translate(`portfolio.journey.certificates.filter.${item}`)}
              <span className='ml-2 opacity-60'>
                {item === 'all' ? CERTIFICATES.length : CERTIFICATES.filter((cert) => cert.category === item).length}
              </span>
            </button>
          ))}
        </Reveal>

        <div key={filter} className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {certificates.map((certificate, index) => (
            <Reveal key={certificate.id} className='h-full' delay={index * 100}>
              <CertificateCard certificate={certificate} onOpen={() => setOpenedCertificate(certificate)} />
            </Reveal>
          ))}
        </div>
      </section>
    )
  }

  const renderClosing = () => {
    return (
      <section className='container mx-auto px-5 md:px-12'>
        <Reveal variant='zoom'>
          <div className='glass relative overflow-hidden rounded-[2.5rem] px-6 py-20 text-center md:px-16 md:py-24'>
            <div aria-hidden className='hero-orb opacity-40' />
            <div className='relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6'>
              <span className='cine-eyebrow'>{translate('portfolio.journey.closing.eyebrow')}</span>
              <h2 className='cine-title text-3xl md:text-6xl'>{translate('portfolio.journey.closing.title')}</h2>
              <p className='text-base text-white/70 md:text-lg'>{translate('portfolio.journey.closing.des')}</p>
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
      <PageHero
        description={translate('portfolio.journey.des')}
        eyebrow={translate('portfolio.journey.eyebrow')}
        scene='03 / 06'
        title={translate('portfolio.nav.journey')}
      />
      {renderChapters()}
      {renderCertificates()}
      {renderClosing()}
      <CertificateViewer certificate={openedCertificate} onClose={closeViewer} />
    </div>
  )
}

export default JourneyClient
