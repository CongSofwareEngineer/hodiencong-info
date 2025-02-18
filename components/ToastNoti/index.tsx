import useMedia from '@/hook/useMedia'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import { ErrorBoundary } from 'react-error-boundary'
const Index = () => {
  const { isMobile } = useMedia()

  return isMobile ? (
    <ToastContainer className={'mb-3'} style={{ marginTop: 65 }} />
  ) : (
    <ToastContainer className={'mb-3'} style={{ marginTop: 0 }} />
  )
}

const ToastNoti = () => {
  return (
    <ErrorBoundary
      fallback={<ToastContainer className={'mb-3'} style={{ marginTop: 0 }} />}
    >
      <Index />
    </ErrorBoundary>
  )
}
export default ToastNoti
