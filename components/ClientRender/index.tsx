'use client'
import dynamic from 'next/dynamic'
import { PropsWithChildren, useEffect } from 'react'
import { Toast } from '@heroui/react'

import LoadingFirstLoad from '../LoadingFirstLoad'

import { THEME_MODE } from '@/constants/app'
import { cn } from '@/utils/tailwind'
import useTheme from '@/zustand/theme'

const Footer = dynamic(() => import('../Footer'))
const Header = dynamic(() => import('../Header'))
const MyModal = dynamic(() => import('../MyModal'))
const MyDrawer = dynamic(() => import('../MyDrawer'))
const BackToTop = dynamic(() => import('../BackToTop'), { ssr: false })

const ClientRender = ({ children }: PropsWithChildren) => {
  const { isDarkMode } = useTheme()

  useEffect(() => {
    document.documentElement.classList.toggle(THEME_MODE.Dark)
  }, [isDarkMode])

  return (
    <>
      <Header />
      <main className={cn('light w-full h-full md:min-h-[calc(100vh-56px)] pt-24', isDarkMode ? 'dark' : 'light')}>
        {children}

        <MyModal />
        <MyDrawer />

        <BackToTop />
        <Toast.Provider placement='top end' className={'text-sm dark:bg-gray-600'} />
        <LoadingFirstLoad />
      </main>

      <Footer />
    </>
  )
}

export default ClientRender
