import { useEffect } from 'react'
const useAos = (time = 1000) => {
  useEffect(() => {
    const init = async () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      setTimeout(async () => {
        // const Aos = require('aos')
        const Aos = await import('aos')
        Aos.init({
          // disable: true,
          duration: time,
          // easing: 'ease-out-cubic',
          // offset: 50,
        })
      }, 500)
    }
    init()
  }, [time])
}

export default useAos
