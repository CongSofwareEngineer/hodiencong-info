import { useEffect } from 'react'

const useAos = (time = 800) => {
  useEffect(() => {
    const Aos = require('aos')

    setTimeout(() => {
      Aos.init({
        duration: time,
      })
    }, 500)
  }, [time])
}

export default useAos
