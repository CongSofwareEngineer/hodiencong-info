import { images } from '@/common/images'
import MyImage from '@/components/MyImage'
import useAos from '@/hook/useAos'
import { ParallaxLayer } from '@react-spring/parallax'
import React from 'react'
import styled from 'styled-components'
const ContainerContent = styled.div`
  box-shadow: #bf9a9a59 0px 5px 15px;
`
const Banner2D = () => {
  useAos()
  return (
    <ParallaxLayer offset={0}>
      <div className="flex md:flex-row flex-col justify-center w-full h-screen ">
        <div className="max-w-[1350px] md:p-12 p-5 h-full w-full flex justify-between items-center">
          <div
            className="h-full flex flex-1 justify-center items-center"
            data-aos="fade-right"
          >
            <MyImage
              alt="avatar"
              src={images.home.banner.avatar}
              heightImage="100%"
              widthImage={'auto'}
            />
          </div>
          <ContainerContent
            className="flex flex-1 flex-col gap-2 border-2 p-[40px] rounded-2xl"
            data-aos="fade-left"
          >
            <ContainerContent className="absolute w-full h-full inset-0 bg-[#0000006b] rounded-2xl" />
            <div className="relative flex flex-col gap-2 items-center">
              <h1 className="text-[36px] font-bold">Hồ Diên Công</h1>
              <h2 className="text-[27px] font-bold">Software Engineer</h2>
              <div className="flex gap-2">
                <span>Email :</span>
                <a href="mailto:hodiencong2000@gmail.com">
                  hodiencong2000@gmail.com
                </a>
              </div>
              <div className="flex gap-2">
                <span>SĐT :</span>
                <a href="tel:+84392225405">0392225405</a>
              </div>
            </div>
          </ContainerContent>
        </div>
      </div>
    </ParallaxLayer>
  )
}

export default Banner2D
