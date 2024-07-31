import { images } from '@/common/images'
import MyImage from '@/components/MyImage'
import { ANIMATION } from '@/constant/app'
import useMedia from '@/hook/useMedia'
import React from 'react'
import { useInView } from 'react-intersection-observer'

const Experience = () => {
  const { isMobile } = useMedia()
  const { ref, inView } = useInView({
    threshold: 0,
  })

  const renderMobile = () => {
    return (
      <>
        <div ref={ref} className="font-fast-hand uppercase text-[35px] w-full">
          Experience
        </div>
      </>
    )
  }

  const renderDesktop = () => {
    return (
      <>
        <div className={`relative ${inView && ANIMATION.Flicker}`}>
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
      </>
    )
  }

  return (
    <div className="w-full md:mt-[30vh] md:px-[50px] px-5 flex flex-col items-center py-6">
      {isMobile ? renderMobile() : renderDesktop()}
    </div>
  )
}

export default Experience
