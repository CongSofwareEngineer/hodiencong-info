'use client'
import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
import dynamic from 'next/dynamic'
import useAos from '@/hook/useAos'

const LoadingFirstPage = dynamic(() => import('../LoadingFirstPage'), {
  ssr: true,
})
const ClientRender = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="w-full flex justify-center min-h-screen">
        {children}
      </main>
      <LoadingFirstPage />
    </>
  )
}

export default ClientRender
