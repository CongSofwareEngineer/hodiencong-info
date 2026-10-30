import { ReactNode } from 'react'

import Reveal from '../Reveal'

type Props = {
  eyebrow: ReactNode
  title: ReactNode
  description?: ReactNode
  scene?: string
}

// Opening title card for sub pages — letterbox bars slide away like a film intro
const PageHero = ({ eyebrow, title, description, scene }: Props) => {
  return (
    <section className='relative -mt-24 flex min-h-[70vh] items-center justify-center overflow-hidden px-5 pt-24'>
      <div aria-hidden className='letterbox letterbox-top' />
      <div aria-hidden className='letterbox letterbox-bottom' />
      <div aria-hidden className='hero-orb' />

      <div className='relative z-10 flex max-w-4xl flex-col items-center gap-6 text-center'>
        {scene && <span className='font-mono text-xs tracking-[0.4em] text-white/40'>{scene}</span>}
        <Reveal variant='fade'>
          <span className='cine-eyebrow'>{eyebrow}</span>
        </Reveal>
        <Reveal delay={150} variant='zoom'>
          <h1 className='cine-title text-5xl md:text-8xl'>{title}</h1>
        </Reveal>
        {description && (
          <Reveal delay={300}>
            <p className='max-w-2xl text-base md:text-xl text-white/60 leading-relaxed'>{description}</p>
          </Reveal>
        )}
      </div>
    </section>
  )
}

export default PageHero
