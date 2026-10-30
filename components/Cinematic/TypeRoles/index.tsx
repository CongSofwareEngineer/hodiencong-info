'use client'
import { useEffect, useState } from 'react'

import { cn } from '@/utils/tailwind'

type Props = {
  roles: string[]
  className?: string
}

// Typewriter that cycles through roles
const TypeRoles = ({ roles, className }: Props) => {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const full = roles[index % roles.length] || ''

    if (!isDeleting && text === full) {
      const pause = setTimeout(() => setIsDeleting(true), 1800)

      return () => clearTimeout(pause)
    }

    if (isDeleting && text === '') {
      setIsDeleting(false)
      setIndex((prev) => prev + 1)

      return
    }

    const timer = setTimeout(() => setText(isDeleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1)), isDeleting ? 35 : 75)

    return () => clearTimeout(timer)
  }, [text, isDeleting, index, roles])

  return (
    <span className={cn('inline-flex items-center', className)}>
      <span className='text-gradient-gold'>{text}</span>
      <span className='ml-1 inline-block h-[1em] w-[3px] bg-amber-300 animate-caret' />
    </span>
  )
}

export default TypeRoles
