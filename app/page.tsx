'use client'
import React from 'react'
import { Parallax } from '@react-spring/parallax'
import Banner2D from './(Components)/2d/Banner'
import MyImage from '@/components/MyImage'
import { images } from '@/common/images'
import InfoMain from './(Components)/2d/InfoMain'
import Skill from './(Components)/2d/Skill'
import SocialMediaShare from './(Components)/2d/SocialMediaShare'

const HomeScreen = () => {
  return (
    <>
      <SocialMediaShare />
      <Parallax pages={3} className=" relative block top-0 left-0 z-10">
        <Banner2D />
        <InfoMain />
        <Skill />
      </Parallax>
    </>
  )
}

export default HomeScreen
