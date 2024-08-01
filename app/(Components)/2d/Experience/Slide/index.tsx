import { images } from '@/common/images'
import MyImage from '@/components/MyImage'
import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import styled, { css } from 'styled-components'

const ContainerSlideImage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow-x: scroll;
  overflow-y: hidden;
  min-height: fit-content;
  gap: 15px;
  -moz-user-select: none !important;
  -webkit-touch-callout: none !important;
  -webkit-user-select: none !important;
  -khtml-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
  max-width: 100%;
  @media screen and (max-width: 768px) {
    justify-content: unset;
    gap: 16px;
  }
  ::-webkit-scrollbar {
    background-color: transparent !important;
  }

  ::-webkit-scrollbar-track {
    background: transparent !important;
  }

  ::-webkit-scrollbar-thumb {
    background: transparent !important;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: transparent !important;
  }

  ::-webkit-resizer {
    background: transparent !important;
  }

  ::-webkit-scrollbar-corner {
    background: transparent !important;
  }
`

const ContainerSlideImageItem = styled.div<{
  $isSelected?: any
  $noIsMobile?: any
}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  padding: 20px 0px;
  ${(props) =>
    props.$noIsMobile &&
    css`
      &:hover {
        cursor: pointer;
        padding: 0px 16px;
        transform: scale(1.1);
        opacity: 1;
        z-index: 100;
      }
    `}

  ${(props) =>
    props.$isSelected &&
    css`
      opacity: 1;
      transform: scale(1.1);
      padding: 0px 20px;
    `};

  transition: height 0.3s, transform 0.3s, opacity 0.3s, padding 0.8s;
  @media screen and (max-width: 768px) {
    min-width: fit-content;
  }
`

const Slide = () => {
  const list = [
    {
      icon: images.home.experiences.bkind,
      title: 'React Native',
    },
    {
      icon: images.home.experiences.keyRingPro,
      title: 'Reactjs',
    },
    {
      icon: images.home.experiences.methusScan,
      title: 'CSS',
    },
    {
      icon: images.home.experiences.nftViewer,
      title: 'Firebase',
    },
    {
      icon: images.home.experiences.tcStore,
      title: 'TS Store',
    },
  ]

  const [selectedIndex, setSelectedIndex] = useState(2)

  const onHandlerSelect = (item: any, index: number) => {
    setSelectedIndex(index)
  }

  useEffect(() => {
    const scrollFast = 1
    if (!isMobile) {
      const slider: any = document.querySelector('#containerSlideImage')
      let isDown = false
      let startX: number
      let scrollLeft: number
      if (slider) {
        slider.addEventListener('mousedown', (e: any) => {
          isDown = true
          slider.classList.add('active')
          startX = e.pageX - slider.offsetLeft
          scrollLeft = slider.scrollLeft
        })
        slider.addEventListener('mouseleave', () => {
          isDown = false
          slider.classList.remove('active')
        })
        slider.addEventListener('mouseup', () => {
          isDown = false
          slider.classList.remove('active')
        })
        slider.addEventListener('mousemove', (e: any) => {
          if (!isDown) return
          e.preventDefault()
          const x = e.pageX - slider.offsetLeft
          const walk = (x - startX) * scrollFast // scroll-fast
          slider.scrollLeft = scrollLeft - walk
          console.log(walk)
        })
      }
    }
  }, [])

  return (
    <ContainerSlideImage id="containerSlideImage">
      {list?.map((item, index) => {
        return (
          <ContainerSlideImageItem
            $noIsMobile={!isMobile}
            onClick={() => onHandlerSelect(item, index)}
            key={'slider' + index}
            $isSelected={selectedIndex === index}
          >
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
            </div>
            {/* <div className="container-item-experience absolute rounded-r-2xl bg-white rounded-l-2xl inset-0 w-full h-full overflow-hidden">
              <div className="relative ml-[10%] w-[80%] *: h-[80%]">
                <MyImage
                  className="select-none"
                  alt={`icon-experience${index}`}
                  src={item.icon}
                />
                <div className="absolute inset-0 z-10 w-full h-full" />
              </div>
            </div> */}
          </ContainerSlideImageItem>
        )
      })}
    </ContainerSlideImage>
  )
}

export default Slide
