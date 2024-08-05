import { images } from '@/common/images'
import MyImage from '@/components/MyImage'
import SlideItemEx from '@/components/SlideItemEx'
import Link from 'next/link'
import React from 'react'
import { isAndroid, isIOS, isMacOs } from 'react-device-detect'

const Slide = () => {
  const list = [
    {
      icon: images.home.experiences.bkind,
      title: 'Web3 NFT Bountykind',
      url: 'https://bountykinds.com/',
    },
    {
      icon: images.home.experiences.keyRingPro,
      title: 'App Keyring Pro',
      url: isIOS
        ? 'https://apps.apple.com/us/app/keyring-pro-btc-eth-sol/id1546824976'
        : isAndroid
        ? 'https://play.google.com/store/apps/details?id=co.bacoor.keyring'
        : isMacOs
        ? 'https://apps.apple.com/us/app/keyring-pro-btc-eth-sol/id1546824976'
        : 'https://keyring.app/',
    },
    {
      icon: images.home.experiences.methusScan,
      title: 'Website Methus scan',
      url: 'https://scan.metheus.network',
    },
    {
      icon: images.home.experiences.nftViewer,
      title: 'NFT Viewer',
      url: 'https://nft.keyring.app/',
    },
    {
      icon: images.home.experiences.tcStore,
      title: 'TS Store',
      url: 'https://tcstore.vercel.app/',
    },
  ]

  return (
    <SlideItemEx
      idContainer="slideExperience"
      listData={list}
      renderItem={(item, index) => {
        return (
          <div
            data-aos="fade-up"
            data-aos-duration={`${(index + 1) * 500}`}
            className="bg-white relative md:w-[240px] w-[200px] h-[350px] rounded-xl overflow-hidden"
          >
            <MyImage
              className="select-none"
              alt={`icon-experience${index}`}
              src={item.icon}
            />
            <div className="absolute inset-0 z-10 w-full h-full" />
            <Link href={item.url} target="_blank">
              <div className="text-[20px] font-bold relative z-20 text-green-300 p-2 hover:underline ">
                {item.title}
              </div>
            </Link>
          </div>
        )
      }}
    />
  )
}

export default Slide
