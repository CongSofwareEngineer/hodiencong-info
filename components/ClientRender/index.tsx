'use client'
import dynamic from 'next/dynamic'
import { PropsWithChildren } from 'react'

import LoadingFirstLoad from '../LoadingFirstLoad'

// import { THEME_MODE } from '@/constants/app'
// import { cn } from '@/utils/tailwind'
// import useTheme from '@/zustand/theme'

const Footer = dynamic(() => import('../Footer'))
const Header = dynamic(() => import('../Header'))
const MyModal = dynamic(() => import('../MyModal'))
const MyDrawer = dynamic(() => import('../MyDrawer'))
const MyToast = dynamic(() => import('../MyToast'), { ssr: false })
const BackToTop = dynamic(() => import('../BackToTop'), { ssr: false })

const ClientRender = ({ children }: PropsWithChildren) => {
  // const { isDarkMode } = useTheme()

  // useEffect(() => {
  //   document.documentElement.classList.toggle(THEME_MODE.Dark)
  // }, [isDarkMode])

  return (
    <>
      <Header />
      <main className={'w-full h-full md:min-h-[calc(100vh-56px)] pt-24'}>
        {children}

        <MyModal />
        <MyDrawer />

        <BackToTop />
        <MyToast />
        <LoadingFirstLoad />
      </main>

      <Footer />
    </>
  )
}

export default ClientRender
