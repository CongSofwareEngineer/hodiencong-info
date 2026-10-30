'use client'
import { CSSProperties, HTMLAttributes, useEffect, useRef, useState } from 'react'

import { cn } from '@/utils/tailwind'

type Props = {
  delay?: number
  variant?: 'up' | 'fade' | 'zoom' | 'left' | 'right' | 'flip'
} & HTMLAttributes<HTMLDivElement>

// Plays a one-shot entrance animation the first time the element enters the viewport
const Reveal = ({ delay = 0, variant = 'up', className, style, children, ...props }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      {...props}
      className={cn('reveal', `reveal-${variant}`, isVisible && 'reveal-visible', className)}
      style={{ transitionDelay: `${delay}ms`, ...style } as CSSProperties}
    >
      {children}
    </div>
  )
}

export default Reveal
