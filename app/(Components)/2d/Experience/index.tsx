import useMedia from '@/hook/useMedia'
import React from 'react'
import Slide from './Slide'
import useAos from '@/hook/useAos'

const Experience = () => {
  const { isMobile } = useMedia()

  useAos()

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
    <div className="w-full md:mt-[20vw] md:px-[50px] px-5 flex flex-col items-center ">
      {isMobile ? renderMobile() : renderDesktop()}
    </div>
  )
}

export default Experience
