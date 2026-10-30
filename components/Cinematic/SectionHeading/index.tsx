import { ReactNode } from 'react'

import Reveal from '../Reveal'

import { cn } from '@/utils/tailwind'

type Props = {
  eyebrow: ReactNode
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

const SectionHeading = ({ eyebrow, title, description, align = 'center', className }: Props) => {
  return (
    <Reveal className={cn('flex flex-col gap-4', align === 'center' ? 'items-center text-center' : 'items-start text-left', className)}>
      <span className='cine-eyebrow'>{eyebrow}</span>
      <h2 className='cine-title text-4xl md:text-6xl'>{title}</h2>
      {description && <p className='max-w-2xl text-base md:text-lg text-white/60 leading-relaxed'>{description}</p>}
    </Reveal>
  )
}

export default SectionHeading
