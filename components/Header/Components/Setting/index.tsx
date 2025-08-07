import { Download, ExternalLink, Menu, Moon, Sun, X } from 'lucide-react'

import Nav from '../Nav'

import MyButton from '@/components/MyButton'
import { LINK_CONTACT, THEME_MODE } from '@/constants/app'
import useDrawer from '@/hooks/useDrawer'
import useMedia from '@/hooks/useMedia'
import { viewExternal } from '@/utils/functions'
import useTheme from '@/zustand/theme'

const Setting = () => {
  const { isMobile } = useMedia(850)
  const { seTheme, isDarkMode } = useTheme()
  const { openDrawer, drawer } = useDrawer()

  const handleSetTheme = () => {
    if (isDarkMode) {
      seTheme(THEME_MODE.Light)
    } else {
      seTheme(THEME_MODE.Dark)
    }
  }
  const handleMenu = () => {
    openDrawer({
      children: (
        <div className='w-full flex flex-col'>
          <Nav />
          {renderOption()}
        </div>
      ),
      placement: 'right',
      classNames: {
        base: '!w-auto !min-w-[200px]',
      },
    })
  }

  const renderOption = () => {
    return (
      <div className='flex items-center w-full md:flex-row flex-col'>
        <MyButton
          className='relative bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group overflow-hidden'
          onClick={() => viewExternal(LINK_CONTACT.CV)}
        >
          <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
          <span className='relative z-10 flex items-center'>
            <Download className='w-4 h-4 mr-2 group-hover:animate-bounce' />
            CV
            <ExternalLink className='w-4 h-4 ml-2 group-hover:rotate-12 transition-transform duration-300' />
          </span>
        </MyButton>
      </div>
    )
  }

  const renderMobile = () => {
    return (
      <div className='flex flex-1 justify-end items-center space-x-4 ml-8 pl-8  '>
        <MyButton
          className='relative border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 rounded-xl group'
          color='outline'
          onClick={handleSetTheme}
        >
          {isDarkMode ? (
            <Sun className='w-5 h-5 group-hover:rotate-12 transition-transform duration-300' />
          ) : (
            <Moon className='w-5 h-5 group-hover:rotate-12 transition-transform duration-300' />
          )}
        </MyButton>
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
      </div>
    )
  }

  const renderDesktop = () => {
    return <div className='flex items-center space-x-4 ml-8 pl-8 border-l border-gray-200 dark:border-gray-700'>{renderOption()}</div>
  }

  return isMobile ? renderMobile() : renderDesktop()
}

export default Setting
