import { images } from '@/common/images'
import MyImage from '@/components/MyImage'
import { ParallaxLayer } from '@react-spring/parallax'
import React from 'react'
import Link from 'next/link'

const InfoMain = () => {
  const renderInfoDetail = () => {
    return (
      <div className="w-full justify-center items-center flex-col p-12">
        <p className="md:text-[38px] text-[30px] font-bold text-center text-black ">
          Hello!
        </p>
        <h1 className="my-3 text-orange-500 md:text-[32px] text-[26px] text-center font-bold">
          Hồ Diên Công
        </h1>
        <h3 className="lg:text-[28px] sm:text-[22px] text-[20px] text-center text-black  text-medium">
          {` I'm a passionate front-end developer with expertise in creating
          visually appealing and user-friendly web applications`}
        </h3>
      </div>
    )
  }
  return (
    <ParallaxLayer offset={1}>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="flex flex-col items-center  w-[80%] max-w-[900px] rounded-3xl bg-gray-200 min-h-[70vh] top-[-20vh] relative">
          <div className="absolute">
            <div className="md:top-[-120px] top-[-60px] aspect-square md:w-[250px] md:h-[250px] w-[150px] h-[150px] rounded-[50%] relative overflow-hidden">
              <MyImage
                className="select-none"
                alt="avatar"
                src={images.logoStore}
              />
            </div>
          </div>
          <div className=" h-[100px]" />
          {renderInfoDetail()}
        </div>
        <div className="w-full max-w-[600px] md:px-12 px-5 flex gap-5 justify-center items-center">
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
    </ParallaxLayer>
  )
}

export default InfoMain
