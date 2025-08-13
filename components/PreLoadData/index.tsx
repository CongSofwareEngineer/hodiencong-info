import { useEffect } from 'react'

import { THEME_MODE } from '@/constants/app'
import useTheme from '@/zustand/theme'

const PreLoadData = () => {
  const { isDarkMode } = useTheme()

  useEffect(() => {
    document.documentElement.classList.toggle(THEME_MODE.Dark)
  }, [isDarkMode])

  return <></>
}

export default PreLoadData
