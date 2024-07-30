import useMedia from '@/hook/useMedia'
import { ParallaxLayer } from '@react-spring/parallax'
import React from 'react'

const Info = () => {
  const { isMobile } = useMedia()

  const renderMobile = () => {
    return <></>
  }

  const renderDesktop = () => {
    return (
      <ParallaxLayer offset={2} speed={0.25}>
        <div className="h-screen w-screen bg-blue-400" />
      </ParallaxLayer>
    )
  }

  return isMobile ? renderMobile() : renderDesktop()
}

export default Info
