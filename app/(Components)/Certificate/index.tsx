'use client'
import { CSSProperties, useEffect } from 'react'

import HoverCard from '@/components/Cinematic/HoverCard'
import { ExternalLinkIcon } from '@/components/Icons/ExternalLink'
import { XMarkIcon } from '@/components/Icons/XMark'
import MyImage from '@/components/MyImage'
import { Certificate, CERTIFICATE_CATEGORY_STYLE } from '@/constants/journey'
import useLanguage from '@/hooks/useLanguage'
import { cn } from '@/utils/tailwind'

const CertificateVisual = ({ certificate, large = false }: { certificate: Certificate; large?: boolean }) => {
  const { translate } = useLanguage()
  const style = CERTIFICATE_CATEGORY_STYLE[certificate.category]
  const title = translate(`portfolio.journey.certificates.items.${certificate.id}.title`)

  if (certificate.image) {
    return (
      <MyImage
        alt={title}
        className={cn(
          'h-full! w-full!',
          large ? 'object-contain' : 'object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110'
        )}
        sizes={large ? '90vw' : '(max-width: 768px) 100vw, 33vw'}
        src={certificate.image}
      />
    )
  }

  // Placeholder "paper" until a real scan is added
  return (
    <div
      className='flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center'
      style={{
        background: `radial-gradient(circle at 50% 35%, ${style.accent}33, transparent 65%), linear-gradient(${style.accent}14 1px, transparent 1px) 0 0 / 24px 24px, linear-gradient(90deg, ${style.accent}14 1px, transparent 1px) 0 0 / 24px 24px`,
      }}
    >
      <span className={cn('transition-transform duration-500 group-hover:scale-110', large ? 'text-8xl' : 'text-6xl')}>{style.emoji}</span>
      <span className='font-mono text-[10px] uppercase tracking-[0.3em] text-white/40'>{translate('portfolio.journey.certificates.noImage')}</span>
    </div>
  )
}

export const CertificateCard = ({ certificate, onOpen }: { certificate: Certificate; onOpen: () => void }) => {
  const { translate } = useLanguage()
  const style = CERTIFICATE_CATEGORY_STYLE[certificate.category]

  return (
    <HoverCard className='h-full rounded-2xl'>
      <button
        className='glass shine-border group flex h-full w-full flex-col overflow-hidden rounded-2xl text-left transition-shadow duration-500 hover:shadow-[0_30px_80px_-20px_var(--accent)]'
        style={{ '--accent': `${style.accent}99` } as CSSProperties}
        type='button'
        onClick={onOpen}
      >
        <div className='relative aspect-[4/3] w-full overflow-hidden border-b border-white/10 bg-white/[0.03]'>
          <CertificateVisual certificate={certificate} />
          <div className='pointer-events-none absolute inset-0 bg-linear-to-t from-[#03040b]/80 via-transparent to-transparent' />
          <span
            className='absolute left-4 top-4 rounded-md border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md'
            style={{ borderColor: `${style.accent}66`, color: style.accent, background: 'rgba(0,0,0,0.4)' }}
          >
            {translate(`portfolio.journey.certificates.filter.${certificate.category}`)}
          </span>
          <span className='absolute bottom-4 right-4 font-mono text-xs tracking-[0.3em] text-white/70'>{certificate.year}</span>
        </div>

        <div className='flex flex-1 flex-col gap-2 p-6'>
          <h3 className='font-display text-xl uppercase tracking-wide text-white'>
            {translate(`portfolio.journey.certificates.items.${certificate.id}.title`)}
          </h3>
          <p className='text-sm text-white/50'>{translate(`portfolio.journey.certificates.items.${certificate.id}.issuer`)}</p>
          {/* Rendered in the card (not only in the viewer) so the text is in the server HTML for crawlers */}
          <p className='line-clamp-3 text-sm leading-relaxed text-white/60'>
            {translate(`portfolio.journey.certificates.items.${certificate.id}.des`)}
          </p>
          <span className='mt-auto pt-3 text-xs uppercase tracking-[0.2em] text-white/70 transition-colors group-hover:text-cyan-300'>
            {translate('portfolio.journey.certificates.view')} →
          </span>
        </div>
      </button>
    </HoverCard>
  )
}

export const CertificateViewer = ({ certificate, onClose }: { certificate: Certificate | null; onClose: () => void }) => {
  const { translate } = useLanguage()

  useEffect(() => {
    if (!certificate) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [certificate, onClose])

  if (!certificate) return null

  const style = CERTIFICATE_CATEGORY_STYLE[certificate.category]
  const key = `portfolio.journey.certificates.items.${certificate.id}` as const

  return (
    <div aria-modal className='fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10' role='dialog'>
      <button
        aria-label={translate('portfolio.journey.certificates.close')}
        className='absolute inset-0 cursor-default bg-black/85 backdrop-blur-md'
        tabIndex={-1}
        type='button'
        onClick={onClose}
      />
      <div className='glass relative flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-2xl lg:flex-row'>
        <button
          aria-label={translate('portfolio.journey.certificates.close')}
          className='absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/80 transition-colors hover:text-white'
          type='button'
          onClick={onClose}
        >
          <XMarkIcon className='h-5 w-5' />
        </button>

        <div className='relative min-h-[40vh] flex-1 bg-black/40 lg:min-h-[70vh]'>
          <CertificateVisual large certificate={certificate} />
        </div>

        <div className='flex flex-col gap-4 overflow-y-auto p-6 lg:w-80 lg:p-8'>
          <span className='font-mono text-xs uppercase tracking-[0.3em]' style={{ color: style.accent }}>
            {style.emoji} {translate(`portfolio.journey.certificates.filter.${certificate.category}`)} · {certificate.year}
          </span>
          <h3 className='font-display text-2xl uppercase tracking-wide text-white'>{translate(`${key}.title`)}</h3>
          <p className='text-sm text-white/50'>{translate(`${key}.issuer`)}</p>
          <p className='text-sm leading-relaxed text-white/70'>{translate(`${key}.des`)}</p>
          {certificate.link && (
            <a className='cine-btn cine-btn-ghost mt-2 self-start' href={certificate.link} rel='noopener noreferrer' target='_blank'>
              {translate('portfolio.journey.certificates.verify')}
              <ExternalLinkIcon className='ml-2 h-4 w-4' />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
