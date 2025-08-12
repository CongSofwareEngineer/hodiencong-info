import { Download, ExternalLink, Menu, X } from 'lucide-react'

import Nav from '../Nav'

import MyButton from '@/components/MyButton'
import { LINK_CONTACT } from '@/constants/app'
import useDrawer from '@/hooks/useDrawer'
import useMedia from '@/hooks/useMedia'
import { viewExternal } from '@/utils/functions'

const Setting = () => {
  const { isMobile } = useMedia(850)
  const { openDrawer, drawer, closeDrawer } = useDrawer()

  const handleMenu = () => {
    openDrawer({
      children: (
        <div className='w-full flex flex-col gap-3'>
          <Nav />
          {renderDesktop()}
        </div>
      ),
      placement: 'right',
      classNames: {
        base: '!w-auto !min-w-[200px]',
      },
    })
  }

  const renderDesktop = () => {
    return (
      <MyButton
        className='relative md:min-h-12 min-h-min md:py-2.5 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white px-6  rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group overflow-hidden'
        onClick={() => {
          viewExternal(LINK_CONTACT.CV)
          closeDrawer()
        }}
      >
        <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
        <span className='relative z-10 flex items-center'>
          <Download className='w-4 h-4 mr-2 group-hover:animate-bounce' />
          CV
          <ExternalLink className='w-4 h-4 ml-2 group-hover:rotate-12 transition-transform duration-300' />
        </span>
      </MyButton>
    )
  }

  const renderMobile = () => {
    return (
      <button
        className='lg:hidden relative p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group'
        onClick={handleMenu}
      >
        <div className='relative w-6 h-6'>
          {drawer?.isOpen ? (
            <X className='w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300' />
          ) : (
            <Menu className='w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300' />
          )}
        </div>
      </button>
    )
  }

  return isMobile ? renderMobile() : renderDesktop()
}

export default Setting
