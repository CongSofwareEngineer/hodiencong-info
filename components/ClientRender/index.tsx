'use client'
import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
import dynamic from 'next/dynamic'

const LoadingFirstPage = dynamic(() => import('../LoadingFirstPage'), {
  ssr: true,
})
const ClientRender = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="main-content w-full flex justify-center min-h-[calc(100vh-56px)]">
        <section
          id="id-section-content"
          className="section-content  w-full max-w-[1350px]  md:px-12 px-[20px]  md:pt-5 pt-2"
        >
          {children}
        </section>
      </main>
      <LoadingFirstPage />
    </>
  )
}

export default ClientRender
