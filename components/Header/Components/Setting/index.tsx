import { usePathname } from 'next/navigation'

import Nav from '../Nav'
import LanguageSelector from '../LanguageSelector'
import UserMenu from '../UserMenu'

import { DownloadIcon } from '@/components/Icons/Download'
import { MenuIcon } from '@/components/Icons/Functions/Menu'
import { XMarkIcon } from '@/components/Icons/XMark'
import { LINK_CONTACT } from '@/constants/app'
import useDrawer from '@/hooks/useDrawer'
import useMedia from '@/hooks/useMedia'
import useUser from '@/hooks/useUser'
import { viewExternal } from '@/utils/functions'
import { PORTFOLIO_ROUTES } from '@/constants/profile'
import useLanguage from '@/hooks/useLanguage'

const Setting = () => {
  const { isMobile } = useMedia(850)
  const { openDrawer, drawer, closeDrawer } = useDrawer()
  const { user } = useUser()
  const patchName = usePathname()
  const isPortfolioPage = PORTFOLIO_ROUTES.includes(patchName)
  const { translate } = useLanguage()

  const handleMenu = () => {
    openDrawer({
      title: user?.name,
      children: (
        <div className='w-full flex flex-col gap-4 p-4'>
          <div className='flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4'>
            <span className='text-sm font-medium text-gray-500'>🌐</span>
            <LanguageSelector />
          </div>
          <Nav />
          <UserMenu />
        </div>
      ),
      placement: 'right',
    })
  }

  const renderDesktop = () => {
    if (!isPortfolioPage) {
      return <></>
    }

    return (
      <button
        className='cine-btn cine-btn-primary h-10 px-5 py-0 text-xs group'
        onClick={() => {
          viewExternal(LINK_CONTACT.CV)
          closeDrawer()
        }}
        type='button'
      >
        <DownloadIcon className='w-4 h-4 group-hover:animate-bounce' />
        {translate('portfolio.nav.cv')}
      </button>
    )
  }

  const renderMobile = () => {
    return (
      <button
        className='relative p-2.5 rounded-full border border-white/15 bg-white/5 hover:border-amber-300/60 transition-all duration-300 group'
        onClick={handleMenu}
      >
        <div className='relative w-6 h-6'>
          {drawer?.isOpen ? (
            <XMarkIcon className='w-6 h-6 text-white group-hover:text-amber-300 transition-colors duration-300' />
          ) : (
            <MenuIcon className='w-6 h-6 text-white group-hover:text-amber-300 transition-colors duration-300' />
          )}
        </div>
      </button>
    )
  }

  return isMobile ? renderMobile() : renderDesktop()
}

export default Setting
