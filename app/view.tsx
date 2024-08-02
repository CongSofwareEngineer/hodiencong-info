'use client'
import React, { useEffect, useState } from 'react'
import Banner2D from './(Components)/2d/Banner'
import InfoMain from './(Components)/2d/InfoMain'
import Skill from './(Components)/2d/Skill'
import SocialMediaShare from './(Components)/2d/SocialMediaShare'
import Experience from './(Components)/2d/Experience'
import styled from 'styled-components'
import Contact from './(Components)/2d/Contact'
import Service from './(Components)/2d/Service'
import MyImage from '@/components/MyImage'
import { images } from '@/common/images'
import { BackTop } from 'antd'
const Container = styled.div`
  background: linear-gradient(
    to right bottom,
    #444f66,
    #605365,
    #6f5b62,
    #756664,
    #77726d
  );
  width: 100%;
  overflow-x: hidden;
`
const HomeScreenClient = ({ listMyService }: { listMyService: any[] }) => {
  const [showScrollTop, setShowScrollTop] = useState(false)
  useEffect(() => {
    let isShow = false
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Aos = require('aos')
    Aos.refresh()
    document.addEventListener('scroll', () => {
      const ratio = window.screen.height * 0.5
      if (ratio <= window.scrollY) {
        if (!isShow) {
          setShowScrollTop(true)
          isShow = true
        }
      } else {
        if (isShow) {
          setShowScrollTop(false)
          isShow = false
        }
      }
    })
    return () => {
      // Aos.refresh()
      document.removeEventListener('scroll', () => {})
    }
  }, [])

  return (
    <>
      <SocialMediaShare />
      <Container className="flex w-full h-max min-h-[100vh] flex-col ">
        <Banner2D />
        <InfoMain />
        <Skill />
        <Experience />
        <Service listMyService={listMyService} />
        <Contact />
        <div className="w-full py-3 mt-2  flex flex-col justify-center items-center gap-1">
          <span className="flex gap-2">
            Copyright © 2024 <span className="font-bold">CÔNG</span> All Rights
            Reserved.
          </span>
        </div>
      </Container>
      {showScrollTop && (
        <BackTop className="">
          <MyImage
            alt="icon-scroll-top"
            src={images.iconScrollTop}
            widthImage="50px"
          />
        </BackTop>
      )}
    </>
  )
}

export default HomeScreenClient
