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
    scroll-snap-type: x mandatory;
  }

  scrollbar-width: 0px !important; /* For Firefox */
  scrollbar-color: transparent !important;

  &::-webkit-scrollbar {
    background-color: transparent !important;
    background: transparent !important;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent !important;
    background: transparent !important;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent !important;
    background: transparent !important;
    width: 0px !important;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: transparent !important;
    background: transparent !important;
  }

  &::-webkit-resizer {
    background-color: transparent !important;
    background: transparent !important;
  }

  &::-webkit-scrollbar-corner {
    background-color: transparent !important;
    background: transparent !important;
  }
`

const ContainerSlideImageItem = styled.div<{
  $isSelected?: any
  $noIsMobile?: any
}>`
  scroll-snap-align: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  padding: 20px 0px;
  &:nth-child(1) {
    padding-left: 0px !important;
  }
  ${(props) =>
    props.$noIsMobile &&
    css`
      &:hover {
        cursor: pointer;
        padding: 0px 10px;
        transform: scale(1.05);
        opacity: 1;
        z-index: 100;
        &:nth-child(1) {
          padding-left: 10px !important;
        }
      }
    `}

  ${(props) =>
    props.$isSelected &&
    css`
      opacity: 1;
      transform: scale(1.05);
      padding: 0px 10px;
      &:nth-child(1) {
        padding-left: 10px !important;
      }
    `};

  transition: height 0.3s, transform 0.3s, opacity 0.3s, padding 0.8s;
  @media screen and (max-width: 768px) {
    min-width: fit-content;
  }
`
type Props = {
  listData: any[]
  renderItem: (params: any, index: number) => React.ReactNode
}

const SlideItemEx = ({ listData, renderItem }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onHandlerSelect = (index: number) => {
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
      {listData?.map((item: any, index) => {
        return (
          <ContainerSlideImageItem
            $noIsMobile={!isMobile}
            onClick={() => onHandlerSelect(index)}
            key={'slider' + index}
            $isSelected={selectedIndex === index}
          >
            {renderItem(item, index)}
          </ContainerSlideImageItem>
        )
      })}
    </ContainerSlideImage>
  )
}

export default SlideItemEx
