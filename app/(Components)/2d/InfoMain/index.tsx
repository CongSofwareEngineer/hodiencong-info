import { images } from '@/common/images'
import MyImage from '@/components/MyImage'
import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { ANIMATION, FONT_SUPPORT } from '@/constant/app'
import { useInView } from 'react-intersection-observer'

const FullName = styled.h1`
  color: #f97316;
  text-align: center;
  font-family: var(${FONT_SUPPORT.FontFastHand});
  font-size: 42px;
  line-height: 65px;
`
const InfoMain = () => {
  const { ref, inView } = useInView({
    threshold: 0,
  })

  const renderInfoDetail = () => {
    return (
      <div className="relative w-full justify-center items-center flex flex-col gap-6 p-12">
        <p className="md:text-[38px] text-[30px] font-bold text-center text-black ">
          Hello!
        </p>
        <FullName>Hồ Diên Công</FullName>
        <h1 className="absolute opacity-0 z-[-1] select-none">
          Software Engineer - Full stack
        </h1>
        <h3 className="lg:text-[28px] sm:text-[22px] text-[20px] text-center text-black  text-medium">
          {`I'm a passionate front-end developer with expertise in creating
          visually appealing and user-friendly web applications`}
        </h3>
      </div>
    )
  }
  return (
    <div
      ref={ref}
      className={` w-full flex flex-col justify-center items-center ${
        inView && ANIMATION.TransformYTop
      }`}
    >
      <div className="flex flex-col items-center  w-[80%] max-w-[900px] rounded-3xl bg-gray-200 min-h-[70vh] md:top-[-20vh] top-[-100px] relative">
        <div className="absolute">
          <div
            className={`md:top-[-120px] top-[-60px] aspect-square md:w-[250px] md:h-[250px] w-[150px] h-[150px] rounded-[50%] relative overflow-hidden ${
              inView && ANIMATION.ZoomIn
            }`}
          >
            <MyImage
              className="select-none "
              alt="avatar"
              src={images.logoStore}
            />
          </div>
        </div>
        <div className=" h-[100px]" />
        {renderInfoDetail()}
      </div>
      <div className="w-full max-w-[1000px] md:px-12 px-5 flex gap-5 justify-center items-center relative top-[-10vh]">
        <div className="flex flex-1 line-loading h-1" />
        <Link
          className="hover:scale-110 hover:-rotate-90 transition-all duration-500  rounded-[50%] w-10 bg-white relative overflow-hidden"
          href={'https://www.facebook.com/profile.php?id=100080400793331'}
        >
          <MyImage src={images.home.iconFace} alt="icon-github" />
        </Link>
        <Link
          className="hover:scale-110 hover:rotate-90 transition-all duration-500  rounded-[50%] w-10 bg-white relative overflow-hidden"
          href={'https://www.facebook.com/profile.php?id=100080400793331'}
        >
          <MyImage src={images.home.iconGithub} alt="icon-github" />
        </Link>
        <div className="flex flex-1 line-loading  h-1" />
      </div>
    </div>
  )
}

export default InfoMain
