import { images } from '@/common/images'
import MyImage from '@/components/MyImage'
import useAos from '@/hook/useAos'
import { ParallaxLayer } from '@react-spring/parallax'
import Link from 'next/link'
import React from 'react'

const Banner2D = () => {
  useAos()

  const renderItem = (icon: string, text: string, url: string) => {
    return (
      <div className="md:h-[25vh] h-[15vh] relative flex p-5  rounded-3xl justify-center items-center bg-orange-400 gap-3">
        <div>
          <MyImage alt={`icon-info-${url}`} src={icon} widthImage="50px" />
        </div>
        <Link
          href={url}
          className="flex  text-wrap text-xl cursor-pointer hover:underline hover:text-[22px] hover:text-white hover:font-bold text-white transition-all duration-200"
        >
          <span className="text-wrap whitespace-pre-wrap">{text}</span>
        </Link>
      </div>
    )
  }
  return (
    <ParallaxLayer offset={0}>
      <div className="overflow-hidden relative w-full h-full flex justify-center items-center">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-[5%] w-full max-w-[1350px] md:p-12 p-5 md:mb-[25vh] mb-[35vh]">
          <MyImage
            alt="bg-banner"
            src={images.home.banner.bgBanner}
            widthImage="auto"
            heightImage={'auto'}
            positionImg="absolute"
            style={{ minWidth: '100%', minHeight: '100%' }}
          />
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
            'mailto:hodiencong2000.@gmail.com'
          )}
        </div>
      </div>
    </ParallaxLayer>
  )
}

export default Banner2D
