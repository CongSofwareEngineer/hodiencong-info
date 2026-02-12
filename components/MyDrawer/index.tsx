'use client'
import React, { useEffect, useState } from 'react'

import { CloseIcon } from '../Icons/Close'

import { drawer as drawerZustand } from '@/zustand/drawer'
import { cn } from '@/utils/tailwind'

const MyDrawer = () => {
  const { drawer, closeDrawer } = drawerZustand((state) => state)
  const [isAnimating, setIsAnimating] = useState(false)

  const isVertical = drawer?.placement === 'top' || drawer?.placement === 'bottom'

  useEffect(() => {
    if (drawer?.isOpen) {
      setIsAnimating(true)
      // Allow animation to complete
      const timer = setTimeout(() => setIsAnimating(false), 300)

      return () => clearTimeout(timer)
    } else {
      setIsAnimating(true)
    }
  }, [drawer])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (drawer?.isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.overscrollBehavior = 'unset'
    } else {
      const scrollY = document.body.style.top

      document.body.style.removeProperty('overflow')
      document.body.style.removeProperty('overscrollBehavior')
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }

    return () => {
      document.body.style.removeProperty('overflow')
      document.body.style.removeProperty('position')
      document.body.style.removeProperty('width')
      document.body.style.removeProperty('top')
    }
  }, [drawer])

  if (!drawer?.isOpen) return null

  // Animation classes based on placement
  const getAnimationClasses = () => {
    const base = 'transition-transform duration-300 ease-out'

    if (!drawer?.isOpen && isAnimating) {
      // Exiting
      switch (drawer?.placement) {
        case 'bottom':
          return `${base} translate-y-full`
        case 'top':
          return `${base} -translate-y-full`
        case 'left':
          return `${base} -translate-x-full`
        case 'right':
          return `${base} translate-x-full`
        default:
          return ''
      }
    }

    // Entering or stable
    return `${base} translate-y-0 translate-x-0`
  }

  return (
    <div className='fixed w-screen inset-0 h-screen bg-black/50 backdrop-blur-sm z-[9997] pointer-events-auto' onClick={() => closeDrawer()}>
      <div
        className={cn(
          'bg-white fixed z-[9999] w-full  dark:bg-slate-600 right-0 bottom-0 flex flex-col pointer-events-auto',
          isVertical ? 'h-[calc(100dvh-70px)] max-h-[calc(100dvh-70px)]' : ' h-[100dvh]  min-w-[300px] max-w-[300px]',
          drawer?.placement === 'bottom' && 'bottom-0 left-0 right-0',
          drawer?.placement === 'top' && 'top-0 left-0 right-0',
          drawer?.placement === 'left' && 'left-0 top-0 bottom-0',
          drawer?.placement === 'right' && 'right-0 top-0 bottom-0',
          getAnimationClasses(),
          drawer?.className || ''
        )}
      >
        <div className='px-5 pr-2 py-2 flex justify-between items-center bg-slate-700 border-b border-slate-500'>
          <h3 className='text-xl dark:text-white font-semibold'>{drawer?.title}</h3>
          <CloseIcon className='size-5 w-7 h-7 text-white cursor-pointer ' onClick={() => closeDrawer()} />
        </div>

        {/* Body - Scrollable */}
        <div className='flex-1 overflow-y-auto overflow-x-hidden'>{drawer?.children}</div>
      </div>
    </div>
  )
}

export default MyDrawer
