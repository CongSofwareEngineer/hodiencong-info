import dynamic from 'next/dynamic'
import { PropsWithChildren } from 'react'
import { Toast } from '@heroui/react'

import LoadingFirstLoad from '../LoadingFirstLoad'

import { cn } from '@/utils/tailwind'

const Footer = dynamic(() => import('../Footer'))
const Header = dynamic(() => import('../Header'))
const MyModal = dynamic(() => import('../MyModal'))
const MyDrawer = dynamic(() => import('../MyDrawer'))
const BackToTop = dynamic(() => import('../BackToTop'), { ssr: false })

const ClientRender = ({ children }: PropsWithChildren) => {
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
