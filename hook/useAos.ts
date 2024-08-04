import { useEffect } from 'react'
const useAos = (time = 1000) => {
  useEffect(() => {
    // const init = async (timeDelay = 500) => {
    //   // eslint-disable-next-line @typescript-eslint/no-var-requires
    //   const Aos = require('aos')
    //   setTimeout(async () => {
    //     Aos.init({
    //       // disable: true,
    //       duration: time,
    //       // easing: 'ease-out-cubic',
    //       offset: 50,
    //     })
    //   }, timeDelay)
    // }
    // init()
  }, [time])
}

export default useAos
