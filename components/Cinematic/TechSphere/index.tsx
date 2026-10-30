'use client'
import { PointerEvent, useEffect, useMemo, useRef } from 'react'

import { cn } from '@/utils/tailwind'

type Props = {
  items: string[]
  radius?: number
  className?: string
}

const COLORS = ['#fbbf24', '#22d3ee', '#e879f9', '#f472b6', '#a3e635', '#ffffff']

// 3D tag cloud: tags sit on a sphere (fibonacci lattice) that auto-rotates and can be dragged
const TechSphere = ({ items, radius = 210, className }: Props) => {
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([])
  const velocity = useRef({ x: 0.003, y: 0.005 })
  const drag = useRef<{ x: number; y: number } | null>(null)

  const points = useMemo(() => {
    return items.map((_, index) => {
      const phi = Math.acos(1 - (2 * (index + 0.5)) / items.length)
      const theta = Math.PI * (1 + Math.sqrt(5)) * index

      return {
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(phi),
      }
    })
  }, [items])

  useEffect(() => {
    const current = points.map((p) => ({ ...p }))
    let frameId = 0

    const tick = () => {
      const { x: ax, y: ay } = velocity.current
      const cosX = Math.cos(ax)
      const sinX = Math.sin(ax)
      const cosY = Math.cos(ay)
      const sinY = Math.sin(ay)

      current.forEach((p, index) => {
        // rotate around X then Y
        const y1 = p.y * cosX - p.z * sinX
        const z1 = p.y * sinX + p.z * cosX
        const x2 = p.x * cosY + z1 * sinY
        const z2 = -p.x * sinY + z1 * cosY

        p.x = x2
        p.y = y1
        p.z = z2

        const element = itemRefs.current[index]

        if (element) {
          const depth = (p.z + 1) / 2
          const scale = 0.6 + depth * 0.7

          element.style.transform = `translate3d(${p.x * radius}px, ${p.y * radius}px, ${p.z * radius}px) translate(-50%, -50%) scale(${scale})`
          element.style.opacity = `${0.25 + depth * 0.75}`
          element.style.zIndex = `${Math.round(depth * 100)}`
          element.style.filter = depth < 0.35 ? 'blur(1px)' : 'none'
        }
      })

      if (!drag.current) {
        // ease back to idle spin after a drag
        velocity.current.x += (0.003 - velocity.current.x) * 0.02
        velocity.current.y += (0.005 - velocity.current.y) * 0.02
      }

      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frameId)
  }, [points, radius])

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    drag.current = { x: event.clientX, y: event.clientY }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return
    velocity.current = {
      x: -(event.clientY - drag.current.y) * 0.0006,
      y: (event.clientX - drag.current.x) * 0.0006,
    }
    drag.current = { x: event.clientX, y: event.clientY }
  }

  const onPointerUp = () => {
    drag.current = null
  }

  return (
    <div
      className={cn('relative mx-auto aspect-square w-full max-w-[520px] cursor-grab touch-none select-none active:cursor-grabbing', className)}
      style={{ perspective: 900 }}
      onPointerCancel={onPointerUp}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <div
        aria-hidden
        className='absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.25),rgba(232,121,249,0.12)_45%,transparent_70%)] blur-2xl animate-pulse-slow'
      />
      <div className='absolute left-1/2 top-1/2' style={{ transformStyle: 'preserve-3d' }}>
        {items.map((item, index) => (
          <span
            key={item}
            ref={(element) => {
              itemRefs.current[index] = element
            }}
            className='absolute left-0 top-0 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm md:text-base font-medium backdrop-blur-sm will-change-transform'
            style={{ color: COLORS[index % COLORS.length] }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default TechSphere
