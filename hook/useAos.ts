import { useEffect } from 'react'
const useAos = (time = 1000) => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    setTimeout(() => {
      const Aos = require('aos')
      Aos.init({
        // disable: true,
        duration: time,
        // easing: 'ease-out-cubic',
        // offset: 50,
      })
    }, 300)
  }, [time])
}

export default useAos
