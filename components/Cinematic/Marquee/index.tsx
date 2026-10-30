import { cn } from '@/utils/tailwind'

type Props = {
  items: string[]
  reverse?: boolean
  className?: string
}

const Marquee = ({ items, reverse = false, className }: Props) => {
  // Rendered twice so the -50% translate loops seamlessly
  const loop = [...items, ...items]

  return (
    <div className={cn('marquee-mask relative w-full overflow-hidden py-4', className)}>
      <div className={cn('flex w-max gap-10 animate-marquee', reverse && '[animation-direction:reverse]')}>
        {loop.map((item, index) => (
          <span
            key={`marquee-${index}`}
            aria-hidden={index >= items.length}
            className='flex items-center gap-10 font-display text-3xl md:text-5xl uppercase tracking-wide text-white/15'
          >
            <span className='hover:text-white/80 transition-colors duration-300'>{item}</span>
            <span className='text-amber-400/60 text-xl'>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default Marquee
