'use client'
import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
import dynamic from 'next/dynamic'
import Header from '@/app/(Components)/2d/Header'

const LoadingFirstPage = dynamic(() => import('../LoadingFirstPage'), {
  ssr: true,
})

const ToastNoti = dynamic(() => import('../ToastNoti'), {
  ssr: true,
})

const ClientRender = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="w-full flex flex-col justify-center min-h-screen  ">
        <Header />
        {children}
      </main>
      <LoadingFirstPage />
      <ToastNoti />
      <footer></footer>
    </>
  )
}

export default ClientRender
