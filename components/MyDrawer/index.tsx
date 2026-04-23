'use client'
import React, { useEffect, useState } from 'react'

import { CloseIcon } from '../Icons/Functions/Close'

import { drawer as drawerZustand } from '@/zustand/drawer'
import { cn } from '@/utils/tailwind'
import { ZUSTAND } from '@/constants/zustand'

const MyDrawer = () => {
  const { [ZUSTAND.Drawer]: drawer, closeDrawer } = drawerZustand((state) => state)
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  const isVertical = drawer?.placement === 'top' || drawer?.placement === 'bottom'

  useEffect(() => {
    if (drawer?.isOpen) {
      setMounted(true)
      // Small timeout to ensure the browser has chance to render the initial state before transition
      const timer = setTimeout(() => {
        setVisible(true)
      }, 10)
      return () => clearTimeout(timer)
    } else {
      setVisible(false)
      const timer = setTimeout(() => {
        setMounted(false)
      }, 300) // Match duration-300
      return () => clearTimeout(timer)
    }
  }, [drawer?.isOpen])

  useEffect(() => {
    if (mounted && visible) {
      document.body.style.overflow = 'hidden'
    } else if (!visible) {
      document.body.style.removeProperty('overflow')
    }

    return () => {
      document.body.style.removeProperty('overflow')
    }
  }, [mounted, visible])

  if (!mounted) return null

  const getAnimationClasses = () => {
    const base = 'transition-transform duration-300 ease-out'

    if (!visible) {
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
          return `${base} translate-y-full`
      }
    }

    return `${base} translate-y-0 translate-x-0`
  }

  return (
    <div
      className={cn(
        'fixed inset-0 w-screen h-screen bg-black/40 backdrop-blur-sm z-[9997] transition-opacity duration-300',
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}
      onClick={() => closeDrawer()}
    >
      <div
        className={cn(
          'fixed z-[99] flex flex-col pointer-events-auto',
          /* sizing */
          isVertical ? 'w-full h-[calc(100dvh-70px)] max-h-[calc(100dvh-70px)]' : 'h-[100dvh] min-w-[300px] max-w-[300px]',
          /* placement */
          drawer?.placement === 'bottom' && 'bottom-0 left-0 right-0',
          drawer?.placement === 'top' && 'top-0 left-0 right-0',
          drawer?.placement === 'left' && 'left-0 top-0 bottom-0',
          drawer?.placement === 'right' && 'right-0 top-0 bottom-0',
          /* colors */
          'bg-white dark:bg-gray-900',
          'border border-gray-200 dark:border-gray-700',
          'shadow-2xl',
          getAnimationClasses(),
          drawer?.className || ''
        )}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {/* Header */}
        <div
          className={cn(
            'px-5 pr-3 py-3 flex justify-between items-center',
            'border-b border-gray-100 dark:border-gray-800',
            'bg-gray-50 dark:bg-gray-800'
          )}
        >
          <h3 className='text-base font-semibold text-gray-900 dark:text-white'>{drawer?.title}</h3>
          <button
            className={cn(
              'p-1.5 rounded-[6px] transition-colors',
              'text-gray-500 hover:text-gray-900 hover:bg-gray-200',
              'dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700'
            )}
            onClick={() => closeDrawer()}
          >
            <CloseIcon className='size-5' />
          </button>
        </div>

        {/* Body */}
        <div className='flex-1 p-5 overflow-y-auto overflow-x-hidden text-gray-700 dark:text-gray-200'>{drawer?.children}</div>
      </div>
    </div>
  )
}

export default MyDrawer
