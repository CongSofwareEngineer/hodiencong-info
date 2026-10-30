import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

import { MoonIcon } from '../Icons/Moon'
import { SunIcon } from '../Icons/Sun'
import MyImage from '../MyImage'

import Nav from './Components/Nav'
import Setting from './Components/Setting'
// import UserMenu from './Components/UserMenu'

import LanguageSelector from './Components/LanguageSelector'

import BackLink from '@/app/(Components)/BackLink'
import { images } from '@/config/images'
import { THEME_MODE } from '@/constants/app'
import useMedia from '@/hooks/useMedia'
import { cn } from '@/utils/tailwind'
import useTheme from '@/zustand/theme'
import useLanguage from '@/hooks/useLanguage'
import { PORTFOLIO_ROUTES, PROFILE } from '@/constants/profile'
const UserMenu = dynamic(() => import('./Components/UserMenu'))

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  const { isMobile } = useMedia(850)
  const { isDarkMode, seTheme } = useTheme()
  const { translate } = useLanguage()
  const pathName = usePathname()
  const isPortfolioPage = PORTFOLIO_ROUTES.includes(pathName)

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
    <header
      className={cn(
        'dark fixed inset-x-0 top-0 z-[11] flex h-16 w-full items-center text-white transition-all duration-500 md:h-20',
        isScrolled || !isPortfolioPage ? 'border-b border-white/10 bg-[#05050a]/70 backdrop-blur-xl' : 'bg-transparent'
      )}
    >
      <div className='m-auto flex h-full w-full max-w-[1550px] items-center gap-4 px-5'>
        <BackLink className='group flex items-center gap-3' href={'/'}>
          <span className='relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/5 transition-transform duration-500 group-hover:rotate-[360deg]'>
            <MyImage fill alt='logo-ho-dien-cong' className='!h-7 !w-7' sizes='40px' src={images.favicon} />
          </span>
          <span className='flex flex-col leading-tight'>
            <span className='font-display text-lg uppercase tracking-wider'>{PROFILE.name}</span>
            <span className='flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-white/50'>
              <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400' />
              {translate('header.softwareEngineer')}
            </span>
          </span>
        </BackLink>

        <div className='flex flex-1 items-center justify-end gap-3 md:gap-4'>
          {!isMobile && (
            <div className='flex flex-1 justify-center'>
              <Nav />
            </div>
          )}
          {!isPortfolioPage && (
            <button
              className='btn btn-outline relative flex h-10 w-10 min-w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 p-0 text-white transition-all duration-300 hover:border-amber-300/60 group'
              onClick={handleSetTheme}
              type='button'
            >
              {isDarkMode ? (
                <SunIcon className='w-5 h-5 group-hover:rotate-12 transition-transform duration-300' />
              ) : (
                <MoonIcon className='w-5 h-5 group-hover:rotate-12 transition-transform duration-300' />
              )}
            </button>
          )}
          <LanguageSelector />

          {!isMobile && <UserMenu />}

          <Setting />
        </div>
      </div>
    </header>
  )
}

export default Header
