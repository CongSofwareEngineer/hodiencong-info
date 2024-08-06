import useMedia from '@/hook/useMedia'
import React from 'react'
import Slide from './Slide'
import useAos from '@/hook/useAos'
import useScrollToElement from '@/hook/useScrollToElement'
import { OBSERVER_KEY } from '@/constant/observer'

const Experience = () => {
  useAos()
  const { isMobile } = useMedia()
  const { ref } = useScrollToElement(OBSERVER_KEY.ScrollToExperience)

  const renderMobile = () => {
    return (
      <>
        <div
          data-aos="fade-right"
          className="font-fast-hand uppercase text-[35px] w-full"
        >
          My Experience
        </div>
        <Slide />
      </>
    )
  }

  const renderDesktop = () => {
    return (
      <>
        <p
          data-aos="fade-right"
          className="w-full  font-fast-hand md:text-[45px] text-[35px]"
        >
          My Experience
        </p>
        <div className="flex justify-center items-center w-full">
          <Slide />
        </div>
      </>
    )
  }

  return (
    <div className="container-base ">
      <div ref={ref} className="container-content flex flex-col md:mt-[20vw]">
        {isMobile ? renderMobile() : renderDesktop()}
      </div>
    </div>
  )
}

export default Experience
