import { images } from '@/common/images'
import MyImage from '@/components/MyImage'
import SlideItemEx from '@/components/SlideItemEx'
import React from 'react'

const Slide = () => {
  const list = [
    {
      icon: images.home.experiences.bkind,
      title: 'Web3 NFT Bountykind',
    },
    {
      icon: images.home.experiences.keyRingPro,
      title: 'App Keyring Pro',
    },
    {
      icon: images.home.experiences.methusScan,
      title: 'Website Methus scan',
    },
    {
      icon: images.home.experiences.nftViewer,
      title: 'NFT Viewer',
    },
    {
      icon: images.home.experiences.tcStore,
      title: 'TS Store',
    },
  ]

  return (
    <SlideItemEx
      listData={list}
      renderItem={(item, index) => {
        return (
          <div
            data-aos="fade-up"
            data-aos-duration={`${index + 1}000`}
            className="bg-white relative md:w-[240px] w-[200px] h-[350px] rounded-xl overflow-hidden"
          >
            <MyImage
              className="select-none"
              alt={`icon-experience${index}`}
              src={item.icon}
            />
            <div className="absolute inset-0 z-10 w-full h-full" />
            <div className="text-title relative z-20 text-green-300 p-2">
              {item.title}
            </div>
          </div>
        )
      }}
    />
  )
}

export default Slide
