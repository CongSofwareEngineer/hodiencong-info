import { CSSProperties } from 'react'

import { cn } from '@/utils/tailwind'

type Props = {
  items: string[]
  className?: string
}

const COLORS = ['#67e8f9', '#a5b4fc', '#c4b5fd', '#7dd3fc', '#5eead4', '#ffffff']

// Tag cloud with a gentle CSS float — replaces the old JS-driven 3D sphere
const TechCloud = ({ items, className }: Props) => {
  return (
    <div className={cn('relative mx-auto flex w-full max-w-[560px] flex-wrap items-center justify-center gap-3', className)}>
      <div aria-hidden className='soft-glow absolute inset-0 -z-10' />
      {items.map((item, index) => (
        <span
          key={item}
          className='tag-float rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium transition-colors duration-300 hover:border-cyan-300/60 hover:bg-cyan-300/10 md:text-base'
          style={{ color: COLORS[index % COLORS.length], animationDelay: `${(index % 7) * -0.6}s` } as CSSProperties}
        >
          {item}
        </span>
      ))}
    </div>
  )
}

export default TechCloud
