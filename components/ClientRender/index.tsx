'use client'
import dynamic from 'next/dynamic'
import { PropsWithChildren, Suspense, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'

import LoadingFirstLoad from '../LoadingFirstLoad'

import { THEME_MODE } from '@/constants/app'
import { cn } from '@/utils/tailwind'
import useTheme from '@/zustand/theme'

const Footer = dynamic(() => import('../Footer'))
const Header = dynamic(() => import('../Header'))
const MyModal = dynamic(() => import('../MyModal'))
const MyDrawer = dynamic(() => import('../MyDrawer'))
const BackToTop = dynamic(() => import('../BackToTop'))

const ClientRender = ({ children }: PropsWithChildren) => {
  const { isDarkMode } = useTheme()

  useEffect(() => {
    document.documentElement.classList.toggle(THEME_MODE.Dark)
  }, [isDarkMode])

  return (
    <Suspense>
      <Header />
      <main className={cn('light w-full h-full min-h-[calc(100vh-56px)]', isDarkMode ? 'dark' : 'light')}>
        {children}

        <MyModal />
        <MyDrawer />

        <ToastContainer position='top-right' style={{ marginTop: 10 }} />
        <BackToTop />

        <LoadingFirstLoad />
      </main>

      <Footer />
    </Suspense>
  )
}

export default ClientRender
