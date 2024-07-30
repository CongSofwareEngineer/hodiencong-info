import useMedia from '@/hook/useMedia'
import React from 'react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import styled from 'styled-components'
import MyImage from '@/components/MyImage'
import { images } from '@/common/images'

const Banner = () => {
  const { isMobile } = useMedia()

  const renderImg = (src = '') => {
    return (
      // <div className="h-[1000px]" style={{ backgroundImage: `url(${src})` }} />
      <div className="w-screen h-screen absolute blur-0 flex items-end justify-end">
        <MyImage
          alt={`img-banner-${src}`}
          src={src}
          widthImage="auto"
          heightImage={'100vh'}
          style={{ maxWidth: 'unset' }}
        />
      </div>
    )
  }

  const renderDesktop = () => {
    return (
      <>
        {/* <ParallaxLayer offset={0} speed={0.25}>
          {renderImg(images.home.banner.background)}
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.3}>
          {renderImg(images.home.banner.jungle1)}
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.35}>
          {renderImg(images.home.banner.jungle2)}
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.5}>
          {renderImg(images.home.banner.jungle3)}
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.45}>
          {renderImg(images.home.banner.jungle4)}
        </ParallaxLayer> */}
        {/* <ParallaxLayer offset={0}>
          {renderImg(images.home.banner.jungle5)}
        </ParallaxLayer> */}
        <ParallaxLayer offset={1}>
          <div className="h-screen w-screen bg-[#aab7c4]" />
        </ParallaxLayer>
        <ParallaxLayer offset={1}>
          {renderImg(images.home.banner.jungle5)}
          {/* <div className="h-screen w-screen bg-green-400" /> */}
        </ParallaxLayer>
      </>
    )
  }
  const renderMobile = () => {
    return (
      <>
        {/* <ParallaxLayer offset={0} speed={0.25}>
        {renderImg(images.home.banner.background)}
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.3}>
        {renderImg(images.home.banner.jungle1)}
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.35}>
        {renderImg(images.home.banner.jungle2)}
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.5}>
        {renderImg(images.home.banner.jungle3)}
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.45}>
        {renderImg(images.home.banner.jungle4)}
      </ParallaxLayer> */}
        {/* <ParallaxLayer offset={0}>
        {renderImg(images.home.banner.jungle5)}
      </ParallaxLayer> */}
        <ParallaxLayer offset={1}>
          <div className="h-screen w-screen bg-blue-400" />
        </ParallaxLayer>
        <ParallaxLayer offset={1}>
          {renderImg(images.home.banner.jungle5)}
          {/* <div className="h-screen w-screen bg-green-400" /> */}
        </ParallaxLayer>
      </>
    )
  }
  return isMobile ? renderMobile() : renderDesktop()
}

export default Banner
