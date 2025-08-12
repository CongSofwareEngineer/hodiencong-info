import React from 'react'
import { Spinner } from '@heroui/spinner'

import useClient from '@/hooks/useClient'

const LoadingFirstLoad = () => {
  const isClient = useClient()

  if (isClient) {
    return <></>
  }

  return (
    <section className='fixed z-[9999] top-0 left-0 w-screen h-screen flex items-center justify-center bg-black'>
      <Spinner />
    </section>
  )
}

export default LoadingFirstLoad
