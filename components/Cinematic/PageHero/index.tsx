import { ReactNode } from 'react'

import Reveal from '../Reveal'

type Props = {
  eyebrow: ReactNode
  title: ReactNode
  description?: ReactNode
  scene?: string
}

// Opening title card for sub pages — HUD frame around a soft glowing core (CSS only)
const PageHero = ({ eyebrow, title, description, scene }: Props) => {
  return (
    <section className='relative -mt-24 flex min-h-[70vh] items-center justify-center overflow-hidden px-5 pt-24'>
      <div aria-hidden className='hero-orb' />

      {/* Abstract targeting rings behind the title */}
      <svg
        aria-hidden
        className='absolute left-1/2 top-1/2 h-[min(640px,120vw)] w-[min(640px,120vw)] -translate-x-1/2 -translate-y-1/2 text-cyan-200/20'
        fill='none'
        viewBox='0 0 640 640'
      >
        <circle cx='320' cy='320' r='300' stroke='currentColor' strokeDasharray='1 9' />
        <circle cx='320' cy='320' r='250' stroke='currentColor' strokeDasharray='120 40 8 40' strokeOpacity='0.7' />
        <path d='M320 0 V40 M320 600 V640 M0 320 H40 M600 320 H640' stroke='currentColor' />
      </svg>

      {/* HUD corner readouts */}
      <div aria-hidden className='pointer-events-none absolute inset-x-5 bottom-10 top-28 hidden md:block md:inset-x-12'>
        <span className='absolute left-0 top-0 h-6 w-6 border-l border-t border-cyan-300/50' />
        <span className='absolute right-0 top-0 h-6 w-6 border-r border-t border-cyan-300/50' />
        <span className='absolute bottom-0 left-0 h-6 w-6 border-b border-l border-cyan-300/50' />
        <span className='absolute bottom-0 right-0 h-6 w-6 border-b border-r border-cyan-300/50' />
        <span className='absolute bottom-3 left-9 flex items-center gap-2'>
          <span className='h-1.5 w-1.5 animate-blink rounded-full bg-cyan-300 shadow-[0_0_8px_#22d3ee]' />
          <span className='h-px w-16 bg-linear-to-r from-cyan-300/60 to-transparent' />
        </span>
        {/* decorative "signal" bars */}
        <span className='absolute right-9 top-3 flex items-end gap-1'>
          {[6, 10, 4, 12, 8, 14, 5].map((height, index) => (
            <span key={`bar-${index}`} className='w-0.5 bg-cyan-300/40' style={{ height }} />
          ))}
        </span>
      </div>

      <div className='relative z-10 flex max-w-4xl flex-col items-center gap-6 text-center'>
        {scene && <span className='font-mono text-xs tracking-[0.4em] text-cyan-200/50'>[ {scene} ]</span>}
        <Reveal variant='fade'>
          <span className='cine-eyebrow'>{eyebrow}</span>
        </Reveal>
        <Reveal delay={150} variant='zoom'>
          <h1 className='cine-title text-5xl md:text-8xl'>{title}</h1>
        </Reveal>
        {description && (
          <Reveal delay={300}>
            <p className='max-w-2xl text-base leading-relaxed text-white/60 md:text-xl'>{description}</p>
          </Reveal>
        )}
      </div>
    </section>
  )
}

export default PageHero
