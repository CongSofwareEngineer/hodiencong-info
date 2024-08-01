import { images } from '@/common/images'
import useAos from '@/hook/useAos'
import MyImageNext from '@/components/MyImage'
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
  width: 14vw;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  transition: all 0.2s;
  transform: rotateX(-10deg) rotateY(45deg);
  .front {
    transform: translateZ(7vw);
  }

  .back {
    transform: rotateY(180.00000001deg) translateZ(7vw);
  }

  .left {
    transform: rotateY(-90.00000001deg) translateZ(7vw);
  }

  .right {
    transform: rotateY(90.00000001deg) translateZ(7vw);
  }

  .top {
    transform: rotateX(90.00000001deg) translateZ(7vw);
  }

  .bottom {
    transform: rotateX(-90.00000001deg) translateZ(7vw);
  }
`

const ContainerCubeItem = styled.div`
  position: absolute;
  width: 14vw;
  height: 14vw;
  border: 1px solid #ccc;
  box-sizing: border-box;
  text-align: center;
  font-size: 48px;
  color: #fff;
  line-height: 14vw;
  background-color: rgba(52, 152, 219, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`

const CubeSkill = () => {
  useAos()
  const square1Ref = useRef<HTMLDivElement>(null)
  const isClickSquare1Ref = useRef<boolean>(false)
  const currentMouseXNow = useRef(0)
  const currentRotateXNow = useRef(0)
  const currentingCubeXNow = useRef(0)

  const square1Ref2 = useRef<HTMLDivElement>(null)
  const isClickSquare1Ref2 = useRef<boolean>(false)
  const currentMouseXNow2 = useRef(0)
  const currentRotateXNow2 = useRef(0)
  const currentingCubeXNow2 = useRef(0)

  useEffect(() => {
    const docs = window.document.getElementById('cube')
    const docs2 = window.document.getElementById('cube2')

    window.addEventListener('mouseup', () => {
      if (docs && isClickSquare1Ref.current) {
        currentRotateXNow.current = currentingCubeXNow.current
        docs.style.transform = `rotateX(-10deg) rotateY(${currentingCubeXNow.current.toFixed(
          2
        )}deg)`
      }
      if (docs2 && isClickSquare1Ref2.current) {
        currentRotateXNow2.current = currentingCubeXNow2.current
        docs2.style.transform = `rotateX(-10deg) rotateY(${currentingCubeXNow2.current.toFixed(
          2
        )}deg)`
      }
      isClickSquare1Ref2.current = false
      isClickSquare1Ref.current = false
    })

    window.addEventListener('mousedown', (e) => {
      currentMouseXNow.current = e.x
      currentMouseXNow2.current = e.x
    })

    window.addEventListener('mousemove', (e: any) => {
      if (isClickSquare1Ref.current) {
        if (currentMouseXNow.current === 0) {
          currentMouseXNow.current = e.x
        }
        if (docs) {
          const a =
            ((currentMouseXNow.current - e.x) / currentMouseXNow.current) * 100

          let ratio = -a * 3.5

          ratio = a * 3.5
          const final = -ratio + currentRotateXNow.current
          currentingCubeXNow.current = final

          docs.style.transform = `rotateX(-10deg) rotateY(${final.toFixed(
            2
          )}deg)`
        }
      }

      if (isClickSquare1Ref2.current) {
        if (currentMouseXNow2.current === 0) {
          currentMouseXNow2.current = e.x
        }

        if (docs2) {
          const a =
            ((currentMouseXNow2.current - e.x) / currentMouseXNow2.current) *
            100

          let ratio = -a * 3.5

          ratio = a * 3.5
          const final = -ratio + currentRotateXNow2.current
          currentingCubeXNow2.current = final

          docs2.style.transform = `rotateX(-10deg) rotateY(${final.toFixed(
            2
          )}deg)`
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
  const handleMouseDown2 = () => {
    isClickSquare1Ref2.current = true
  }

  return (
    <div className={`w-full gap-[5vh] flex flex-col  items-center h-full`}>
      <div className={'relative'} data-aos="fade-up">
        <MyImageNext
          alt="bg-h1-skill"
          src={images.home.bgTitle}
          widthImage="600px"
          style={{ maxWidth: 'none' }}
        />
        <p className="absolute-center font-fast-hand text-[35px]">Skill</p>
      </div>

      <div className="md:mt-[10vh] flex w-full gap-[25vw] justify-center items-center ">
        <div className={`cube-container`} data-aos="fade-right">
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
              {/* <div className="aspect-square rounded-[50%] w-[50%] relative overflow-hidden m-auto">
            <MyImage
              alt="icon-iconSql"
              src={images.home.iconTech.iconSql}
            />
            <div className="absolute z-10 inset-0 w-full h-full" />
          </div> */}
            </ContainerCubeItem>
            <ContainerCubeItem className="bottom select-none" />
          </ContainerCube>
        </div>
        <div className={`cube-container`} data-aos="fade-left">
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
              <div className="aspect-square rounded-[50%] w-[50%] h-[50%] relative overflow-hidden m-auto">
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
        </div>
      </div>
    </div>
  )
}

export default CubeSkill
