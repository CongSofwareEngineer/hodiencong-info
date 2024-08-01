import { images } from '@/common/images'
import MyImage from '@/components/MyImage'
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
          Experience
        </div>
        <Slide />
      </>
    )
  }

  const renderDesktop = () => {
    return (
      <>
        <div className={`relative mb-10 `} data-aos="fade-up">
          <MyImage
            alt="bg-h1-skill"
            src={images.home.bgTitle}
            widthImage="600px"
            style={{ maxWidth: 'none' }}
          />
          <p className="absolute-center font-fast-hand text-[35px]">
            Experience
          </p>
        </div>
        <Slide />
      </>
    )
  }

  return (
    <div className="w-full md:mt-[30vw] md:px-[50px] px-5 flex flex-col items-center py-6">
      {isMobile ? renderMobile() : renderDesktop()}
    </div>
  )
}

export default Experience
