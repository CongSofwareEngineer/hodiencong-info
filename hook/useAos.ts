import { useEffect } from 'react'
const useAos = (time = 1000) => {
  useEffect(() => {

    // eslint-disable-next-line @typescript-eslint/no-var-requires
   setTimeout(() => { 
    const Aos = require('aos')
    Aos.init({
      duration: time,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    })
    }, 500)
  }, [time])

}

export default useAos