'use client'
import React from 'react'
import { Parallax } from '@react-spring/parallax'
import Banner2D from './(Components)/2d/Banner'
import MyImage from '@/components/MyImage'
import { images } from '@/common/images'

const HomeScreen = () => {
  return (
    <>
      <div className="fixed indent-0 w-screen h-screen">
        <MyImage
          src={images.home.bgHomeScreen}
          heightImage="auto"
          widthImage="auto"
          alt="bg-home"
          style={{ maxWidth: 'unset', minWidth: '100%', minHeight: '100%' }}
        />
      </div>
      <Parallax pages={3} className=" relative block top-0 left-0 z-10">
        <Banner2D />
      </Parallax>
    </>
  )
}

export default HomeScreen
