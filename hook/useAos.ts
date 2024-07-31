import { useEffect } from 'react'
const useAos = (time = 100) => {
  useEffect(() => {

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Aos = require('aos')
    Aos.init({
      duration: time,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    })
  }, [time])

}

export default useAos