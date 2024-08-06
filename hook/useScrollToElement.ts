import { OBSERVER_KEY } from '@/constant/observer'
import ObserverService from '@/services/observer'
import { useEffect, useRef } from 'react'

const useScrollToElement = (keyType: OBSERVER_KEY) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth' })
      }
    }

    ObserverService.on(keyType, handleScroll)

    return () => ObserverService.removeListener(keyType)
  }, [keyType])

  return {
    ref,
  }
}

export default useScrollToElement
