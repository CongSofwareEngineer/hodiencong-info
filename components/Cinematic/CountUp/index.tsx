'use client'
import { useEffect, useRef, useState } from 'react'

type Props = {
  value: number
  suffix?: string
  duration?: number
  className?: string
}

const CountUp = ({ value, suffix = '', duration = 1800, className }: Props) => {
  const ref = useRef<HTMLSpanElement>(null)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const element = ref.current

    if (!element) return

    let frameId = 0
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()

      const start = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        // easeOutExpo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)

        setCurrent(Math.round(eased * value))
        if (progress < 1) frameId = requestAnimationFrame(tick)
      }

      frameId = requestAnimationFrame(tick)
    })

    observer.observe(element)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frameId)
    }
  }, [value, duration])

  return (
    <span ref={ref} className={className}>
      {current}
      {suffix}
    </span>
  )
}

export default CountUp
