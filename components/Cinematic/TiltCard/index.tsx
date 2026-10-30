'use client'
import { HTMLAttributes, PointerEvent, useRef } from 'react'

import { cn } from '@/utils/tailwind'

type Props = {
  maxTilt?: number
  glare?: boolean
} & HTMLAttributes<HTMLDivElement>

// Card that rotates in 3D toward the pointer, with a moving light glare
const TiltCard = ({ maxTilt = 12, glare = true, className, children, ...props }: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    const element = ref.current

    if (!element || event.pointerType === 'touch') return

    const rect = element.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height

    element.style.setProperty('--rx', `${(0.5 - py) * maxTilt}deg`)
    element.style.setProperty('--ry', `${(px - 0.5) * maxTilt}deg`)
    element.style.setProperty('--gx', `${px * 100}%`)
    element.style.setProperty('--gy', `${py * 100}%`)
  }

  const handleLeave = () => {
    const element = ref.current

    if (!element) return

    element.style.setProperty('--rx', '0deg')
    element.style.setProperty('--ry', '0deg')
  }

  return (
    <div ref={ref} {...props} className={cn('tilt-card group/tilt', className)} onPointerLeave={handleLeave} onPointerMove={handleMove}>
      {children}
      {glare && <div aria-hidden className='tilt-glare' />}
    </div>
  )
}

export default TiltCard
