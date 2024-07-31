'use client'
import React from 'react'
import Banner2D from './(Components)/2d/Banner'
import InfoMain from './(Components)/2d/InfoMain'
import Skill from './(Components)/2d/Skill'
import SocialMediaShare from './(Components)/2d/SocialMediaShare'
import Experience from './(Components)/2d/Experience'
import styled from 'styled-components'
const Container = styled.div`
  background: linear-gradient(
    to right bottom,
    #444f66,
    #605365,
    #6f5b62,
    #756664,
    #77726d
  );
`
const HomeScreen = () => {
  return (
    <>
      <SocialMediaShare />
      <Container className="flex w-screen h-max min-h-[100vh] flex-col ">
        <Banner2D />
        <InfoMain />
        <Skill />
        <Experience />
      </Container>
    </>
  )
}

export default HomeScreen
