import { images } from '@/common/images'
import MyImage from '@/components/MyImage'
import useAos from '@/hook/useAos'
import useMedia from '@/hook/useMedia'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
const ContainerItem = styled.div`
  background: linear-gradient(
    to right,
    #3bc081,
    #2db469,
    #21a750,
    #179b35,
    #108e13
  );
`
const Banner2D = () => {
  useAos()
  const { isMobile } = useMedia()

  const renderItem = (
    icon: string,
    text: string,
    url: string,
    isEx = false
  ) => {
    return (
      <ContainerItem
        data-aos="fade-up"
        data-aos-duration="1000"
        className="md:h-[25vh] h-[100px]  flex p-5  rounded-3xl justify-center items-center   gap-3"
      >
        <div className="flex flex-wrap relative gap-3 flex-col justify-center items-center">
          <div className="animation__rotate md:w-[50px] w-[30px] md:h-[50px] h-[30px]">
            <MyImage
              alt={`icon-info-${url}`}
              src={icon}
              widthImage={isMobile ? '30px' : '50px'}
              style={{ maxWidth: 'none' }}
            />
          </div>
          <Link
            href={url}
            className="flex text-wrap md:text-xl text-medium cursor-pointer hover:underline md:hover:text-[22px] hover:text-white hover:font-bold text-white transition-all duration-200"
          >
            <span
              className={`text-center whitespace-pre-wrap ${
                isEx && 'break-all'
              }`}
            >
              {text}
            </span>
          </Link>
        </div>
      </ContainerItem>
    )
  }
  return (
    <div className="w-full h-[80vh] overflow-hidden  relative ">
      <div className="absolute overflow-hidden w-full h-full">
        <MyImage
          alt="bg-banner"
          src={images.home.banner.bgBanner}
          widthImage="auto"
          heightImage={'auto'}
          style={{ minWidth: '100%', minHeight: '100%' }}
          className="blur-[2px]"
        />
      </div>
      <div className="container-content m-auto relative grid md:grid-cols-3 grid-cols-1 gap-[5%] md:mb-[25vh] mb-[35vh]">
        {renderItem(
          images.home.banner.iconTelePhone,
          '0392225405',
          'tel:0392225405'
        )}
        {renderItem(
          images.home.banner.iconAddress,
          '83/41 Phạm Văn Bạch, Tân Bình, Hồ Chí minh',
          'https://www.google.com/maps/place/83%2F41+Ph%E1%BA%A1m+V%C4%83n+B%E1%BA%A1ch,+Ph%C6%B0%E1%BB%9Dng+15,+T%C3%A2n+B%C3%ACnh,+H%E1%BB%93+Ch%C3%AD+Minh,+Vietnam/@10.8169953,106.6286017,17z/data=!3m1!4b1!4m6!3m5!1s0x317529d60f102fe1:0x48a05f8f5cd877f6!8m2!3d10.8169953!4d106.6334726!16s%2Fg%2F11l5hwgmt7?entry=ttu'
        )}
        {renderItem(
          images.home.banner.iconMessage,
          'hodiencong@gmail.com',
          'mailto:hodiencong2000.@gmail.com',
          true
        )}
      </div>
    </div>
  )
}

export default Banner2D
