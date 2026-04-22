'use client'
import { useEffect } from 'react'

import { THEME_MODE } from '@/constants/app'
import useTheme from '@/zustand/theme'

const PreLoadData = () => {
  const { isDarkMode } = useTheme()

  useEffect(() => {
    document.documentElement.classList.remove(THEME_MODE.Dark, THEME_MODE.Light)
    document.documentElement.classList.add(isDarkMode ? THEME_MODE.Dark : THEME_MODE.Light)
  }, [isDarkMode])

  return <></>
}

export default PreLoadData
