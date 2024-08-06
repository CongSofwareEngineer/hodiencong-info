import { images } from '@/common/images'
import useAos from '@/hook/useAos'
import React, { useRef } from 'react'
import styled from 'styled-components'
import { useEffect } from 'react'

const MyImage = styled.img`
  width: 100%;
  height: auto;
  user-select: none;
`
const ContainerCube = styled.div`
  position: relative;
  width: 200px;

  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  transition: all 0.1s;
  transform: rotateX(-10deg) rotateY(45deg);
  .front {
    transform: translateZ(100px);
  }

  .back {
    transform: rotateY(180.00000001deg) translateZ(100px);
  }

  .left {
    transform: rotateY(-90.00000001deg) translateZ(100px);
  }

  .right {
    transform: rotateY(90.00000001deg) translateZ(100px);
  }

  .top {
    transform: rotateX(90.00000001deg) translateZ(100px);
  }

  .bottom {
    transform: rotateX(-90.00000001deg) translateZ(100px);
  }
`

const ContainerCubeItem = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  text-align: center;
  font-size: 48px;
  color: #fff;
  line-height: 200px;
  background-color: rgba(52, 152, 219, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  top: -100px;
`

const CubeSkill = () => {
  useAos()

  const square1Ref = useRef<HTMLDivElement>(null)
  const isClickSquare1Ref = useRef<boolean>(false)
  const currentMouseXNow = useRef(0)
  const currentRotateXNow = useRef(0)
  const currentingCubeXNow = useRef(0)

  const currentMouseYNow = useRef(0)
  const currentRotateYNow = useRef(0)
  const currentingCubeYNow = useRef(0)

  // const square1Ref2 = useRef<HTMLDivElement>(null)
  // const isClickSquare1Ref2 = useRef<boolean>(false)
  // const currentMouseXNow2 = useRef(0)
  // const currentRotateXNow2 = useRef(0)
  // const currentingCubeXNow2 = useRef(0)

  useEffect(() => {
    const docs = window.document.getElementById('cube')
    // const docs2 = window.document.getElementById('cube2')

    window.addEventListener('mouseup', () => {
      if (docs && isClickSquare1Ref.current) {
        currentRotateXNow.current = currentingCubeXNow.current
        currentRotateYNow.current = currentingCubeYNow.current
        docs.style.transform = `rotateX(${currentingCubeYNow.current.toFixed(
          2
        )}deg) rotateY(${currentingCubeXNow.current.toFixed(2)}deg)`
      }
      isClickSquare1Ref.current = false
    })

    window.addEventListener('mousedown', (e) => {
      currentMouseXNow.current = e.x
      currentMouseYNow.current = e.y
    })

    window.addEventListener('mousemove', (e: any) => {
      if (isClickSquare1Ref.current) {
        if (currentMouseXNow.current === 0) {
          currentMouseXNow.current = e.x
        }

        if (currentMouseYNow.current === 0) {
          currentMouseYNow.current = e.y
        }
        if (docs) {
          const ratioX =
            ((currentMouseXNow.current - e.x) / currentMouseXNow.current) * 100

          const ratioY =
            ((currentMouseYNow.current - e.y) / currentMouseYNow.current) * 100

          const ratioXFormat = ratioX * 3.5
          const ratioYFormat = -ratioY * 3.5

          const finalX = -ratioXFormat + currentRotateXNow.current
          currentingCubeXNow.current = Number(finalX.toFixed(2))

          const finalY = -ratioYFormat + currentRotateYNow.current
          currentingCubeYNow.current = Number(finalY.toFixed(2))

          docs.style.transform = `rotateX(${finalY}deg)  rotateY(${finalX}deg)  `
        }
      }
    })

    return () => {
      window.removeEventListener('mousedown', () => {})
      window.removeEventListener('mouseup', () => {})
      window.removeEventListener('mousemove', () => {})
    }
  }, [])

  const handleMouseDown = () => {
    isClickSquare1Ref.current = true
  }
  // const handleMouseDown2 = () => {
  //   isClickSquare1Ref2.current = true
  // }

  return (
    <div className={`flex-1 gap-[5vh] flex flex-col  items-center h-full`}>
      {/* <div className={`relative `} data-aos="fade-up">
        <MyImageNext
          alt="bg-h1-skill"
          src={images.home.bgTitle}
          widthImage="600px"
          style={{ maxWidth: 'none' }}
        />
        <p className="absolute-center font-fast-hand text-[35px]">Skill</p>
      </div> */}

      <div className="md:mt-[200px] flex w-full  justify-center items-center ">
        <div className={`cube-container select-none`} data-aos="fade-left">
          <ContainerCube
            id="cube"
            ref={square1Ref}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            <ContainerCubeItem className="front select-none">
              <div className="aspect-square rounded-[50%] w-[50%] relative overflow-hidden m-auto">
                <MyImage alt="icon-css" src={images.home.iconTech.iconCss} />
                <div className="absolute z-10 inset-0 w-full h-full" />
              </div>
            </ContainerCubeItem>
            <ContainerCubeItem className="back select-none">
              <div className="aspect-square w-[50%] relative overflow-hidden m-auto">
                <MyImage alt="icon-html" src={images.home.iconTech.iconHtml} />
                <div className="absolute z-10 inset-0 w-full h-full" />
              </div>
            </ContainerCubeItem>
            <ContainerCubeItem className="left select-none">
              <div className="aspect-square w-[50%] relative overflow-hidden m-auto">
                <MyImage alt="icon-iconJs" src={images.home.iconTech.iconJs} />
                <div className="absolute z-10 inset-0 w-full h-full" />
              </div>
            </ContainerCubeItem>
            <ContainerCubeItem className="right select-none">
              <div className="aspect-square rounded-[50%] w-[50%] relative overflow-hidden m-auto">
                <MyImage
                  alt="icon-iconTailwincss"
                  src={images.home.iconTech.iconTailwincss}
                />
                <div className="absolute z-10 inset-0 w-full h-full" />
              </div>
            </ContainerCubeItem>
            <ContainerCubeItem className="top select-none">
              <div className="aspect-square rounded-[50%] flex justify-center items-center   w-[50%] h-[50%] relative overflow-hidden m-auto">
                <MyImage
                  alt="icon-iconReactjs"
                  src={images.home.iconTech.iconReactjs}
                />
                <div className="absolute z-10 inset-0 w-full h-full" />
              </div>
            </ContainerCubeItem>
            <ContainerCubeItem className="bottom select-none">
              <div className="aspect-square rounded-[50%] flex justify-center items-center   w-[50%] h-[50%] relative overflow-hidden m-auto">
                <MyImage
                  alt="icon-iconSql"
                  src={images.home.iconTech.iconSql}
                />
                <div className="absolute z-10 inset-0 w-full h-full" />
              </div>
            </ContainerCubeItem>
          </ContainerCube>
        </div>

        {/* <div className={`cube-container`} data-aos="fade-left">
          <ContainerCube
            id="cube2"
            ref={square1Ref2}
            onMouseDown={handleMouseDown2}
            onTouchStart={handleMouseDown2}
          >
            <ContainerCubeItem className="front select-none">
              <div className="aspect-square  flex justify-center items-center w-[50%] relative overflow-hidden m-auto">
                <MyImage
                  alt="icon-iconReactNative"
                  src={images.home.iconTech.iconReactNative}
                />
                <div className="absolute z-10 inset-0 w-full h-full" />
              </div>
            </ContainerCubeItem>
            <ContainerCubeItem className="back select-none">
              <div className="aspect-square   w-[50%] h-[50%] relative overflow-hidden m-auto">
                <MyImage
                  alt="icon-iconReactjs"
                  src={images.home.iconTech.iconReactjs}
                />
                <div className="absolute z-10 inset-0 w-full h-full" />
              </div>
            </ContainerCubeItem>
            <ContainerCubeItem className="left select-none">
              <div className="aspect-square   w-[50%] relative overflow-hidden m-auto">
                <MyImage
                  alt="icon-iconRestFullApi"
                  src={images.home.iconTech.iconRestFullApi}
                />
                <div className="absolute z-10 inset-0 w-full h-full" />
              </div>
            </ContainerCubeItem>
            <ContainerCubeItem className="right select-none">
              <div className="aspect-square   w-[50%] h-[50%] relative overflow-hidden m-auto">
                <MyImage
                  alt="icon-iconSql"
                  src={images.home.iconTech.iconSql}
                />
                <div className="absolute z-10 inset-0 w-full h-full" />
              </div>
            </ContainerCubeItem>
            <ContainerCubeItem className="top select-none" />
            <ContainerCubeItem className="bottom select-none" />
          </ContainerCube>
        </div> */}
      </div>
    </div>
  )
}

export default CubeSkill
