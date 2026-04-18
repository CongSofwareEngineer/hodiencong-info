'use client'
import { Spinner } from '@heroui/react'
import { useLayoutEffect } from 'react'

import useClient from '@/hooks/useClient'
import useTheme from '@/zustand/theme'
import { THEME_MODE } from '@/constants/app'

const LoadingFirstLoad = () => {
  const isClient = useClient()
  const { isDarkMode } = useTheme()

  useLayoutEffect(() => {
    document.documentElement.classList.toggle(THEME_MODE.Dark)
  }, [isDarkMode])

  if (isClient) {
    return <></>
  }

  return (
    <div className='fixed z-9999 top-0 left-0 w-screen h-screen flex items-center justify-center bg-black'>
      <Spinner scale={2} />
    </div>
  )
}

export default LoadingFirstLoad
