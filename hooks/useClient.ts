import { useState, useLayoutEffect } from 'react'

const useClient = () => {
  const [isClient, setIsClient] = useState(false)

  useLayoutEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}

export default useClient
