'use client'
import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const LoadingFirstPage = dynamic(() => import('../LoadingFirstPage'), {
  ssr: true,
})

const ToastNoti = dynamic(() => import('../ToastNoti'), {
  ssr: true,
})

const ClientRender = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="absolute inset-0 z-[-1] select-none flex flex-col flex-wrap">
        <Link
          className="h-0 w-0 opacity-0 z-[-1]"
          href={'https://tcstore.vercel.app/'}
        >
          TC Store
        </Link>
        <Link
          className="h-0 w-0 opacity-0 z-[-1]"
          href={'mailto:hodiencong2000@gmail.com'}
        >
          hodiencong2000@gmail.com
        </Link>
        <Link className="h-0 w-0 opacity-0 z-[-1]" href={'tel:0392225405'}>
          0392225405
        </Link>
        <Link
          className="h-0 w-0 opacity-0 z-[-1]"
          href={'https://github.com/CongSofwareEngineer'}
        >
          CongSofwareEngineer
        </Link>
      </header>
      <main className="w-full flex justify-center min-h-screen">
        {children}
      </main>
      <LoadingFirstPage />
      <ToastNoti />
    </>
  )
}

export default ClientRender
