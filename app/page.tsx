'use client'
import React from 'react'
import Banner2D from './(Components)/2d/Banner'
import InfoMain from './(Components)/2d/InfoMain'
import Skill from './(Components)/2d/Skill'
import SocialMediaShare from './(Components)/2d/SocialMediaShare'
import Experience from './(Components)/2d/Experience'

const HomeScreen = () => {
  return (
    <>
      <SocialMediaShare />
      <div className="flex w-screen h-max min-h-[100vh] flex-col ">
        <Banner2D />
        <InfoMain />
        <Skill />
        <Experience />
      </div>
    </>
  )
}

export default HomeScreen
