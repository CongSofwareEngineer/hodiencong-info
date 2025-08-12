import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

import MyButton from '../MyButton'
import MyImage from '../MyImage'

import Nav from './Components/Nav'
import Setting from './Components/Setting'

import BackLink from '@/app/(Components)/BackLink'
import { images } from '@/config/images'
import { THEME_MODE } from '@/constants/app'
import useMedia from '@/hooks/useMedia'
import { cn } from '@/utils/tailwind'
import useTheme from '@/zustand/theme'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  const { isMobile } = useMedia(850)
  const { isDarkMode, seTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSetTheme = () => {
    if (isDarkMode) {
      seTheme(THEME_MODE.Light)
    } else {
      seTheme(THEME_MODE.Dark)
    }
  }

  return (
    <>
      <header
        className={cn(
          ' w-full flex justify-between items-center z-[11] fixed inset-0 h-16  transition-all duration-500',
          isDarkMode ? 'dark' : 'light',
          isScrolled
            ? 'light:bg-white/90 dark:!bg-gray-900/90 backdrop-blur-xl shadow-2xl border-b border-gray-200/20 dark:!border-gray-800/30'
            : 'light:bg-white/95 dark:!bg-gray-900/95 backdrop-blur-md shadow-lg'
        )}
      >
        <div className='w-full max-w-[1550px] px-5 m-auto flex items-center gap-3 h-full '>
          <div className='h-full relative '>
            <BackLink href={'/'}>
              <MyImage fill alt='logo-ho-dien-cong' className='!relative !w-auto !h-full' src={images.favicon} />
            </BackLink>
          </div>

          <div className='flex flex-1 justify-between items-center'>
            {isMobile ? (
              <div className='flex flex-col gap-1'>
                <h1 className='text-xl bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300'>
                  Hồ Diên Công
                </h1>
                <p className='text-sm text-gray-600 dark:text-gray-400 -mt-1 flex items-center'>
                  <div className='w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse' />
                  Software Engineer
                </p>
              </div>
            ) : (
              <Nav />
            )}
            <div className='flex md:pl-8 pl-3 md:gap-8 gap-3 items-center border-l border-gray-200 dark:border-gray-700'>
              <MyButton
                className='relative md:border-2 md:px-3 px-2 md:min-w-20 min-w-max  border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 rounded-xl group'
                color='outline'
                onClick={handleSetTheme}
              >
                {isDarkMode ? (
                  <Sun className='w-5 h-5 group-hover:rotate-12 transition-transform duration-300' />
                ) : (
                  <Moon className='w-5 h-5 group-hover:rotate-12 transition-transform duration-300' />
                )}
              </MyButton>
              <Setting />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
