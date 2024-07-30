import { images } from '@/common/images'
import { ParallaxLayer } from '@react-spring/parallax'
import React, { useEffect, useRef } from 'react'

const Skill = () => {
  const square1Ref = useRef<HTMLDivElement>(null)
  const isClickSquare1Ref = useRef<boolean>(false)
  const currentMouseXNow = useRef(0)
  const currentRotateYYNow = useRef(0)

  useEffect(() => {
    const docs = window.document.getElementById('cube')

    window.addEventListener('mouseup', (e) => {
      console.log('mouseup')

      isClickSquare1Ref.current = false

      setTimeout(() => {
        if (docs) {
          const style = window.getComputedStyle(docs)
          const matrix = new WebKitCSSMatrix(style.transform)
          console.log({ matrix, style })

          // Get the angle of rotation around the Y-axis
          const angle = Math.asin(matrix.m13) * (180 / Math.PI)
          console.log({ matrix, angle })
          currentRotateYYNow.current = -angle
        }
      }, 500)
    })

    window.addEventListener('mouseenter', (e) => {
      console.log('mouseenter')
    })

    window.addEventListener('mousedown', (e) => {
      currentMouseXNow.current = e.x
    })

    window.addEventListener('mouseleave', (e) => {
      console.log({ mouseleaveX: e.x })
    })

    window.addEventListener('mousemove', (e) => {
      if (isClickSquare1Ref.current) {
        if (currentMouseXNow.current === 0) {
          currentMouseXNow.current = e.x
        }
        if (docs) {
          const a =
            ((currentMouseXNow.current - e.x) / currentMouseXNow.current) * 100
          console.log({
            a,
            a2: -a * 2.5 + currentRotateYYNow.current,
            currentRotateYYNow: currentRotateYYNow.current,
          })
          let ratio = -a * 2.5

          if (currentRotateYYNow.current !== 0) {
            ratio = a * 0.1 * currentRotateYYNow.current
          }
          let final = ratio + currentRotateYYNow.current

          docs.style.transform = `rotateX(0deg) rotateY(${final}deg)`
        }
      }
    })
    return () => {
      window.removeEventListener('mousedown', () => {})
      window.removeEventListener('mouseleave', () => {})
      window.removeEventListener('mouseout', () => {})
      window.removeEventListener('mouseup', () => {})
      window.removeEventListener('mouseenter', () => {})
    }
  }, [])

  // const listData = [
  //   {
  //     icon: images.home.iconTech.iconHtml,
  //     text: 'Html',
  //   },
  //   {
  //     icon: images.home.iconTech.iconJs,
  //     text: 'Javascript',
  //   },
  //   {
  //     icon: images.home.iconTech.iconReactjs,
  //     text: 'Reactjs',
  //   },
  //   {
  //     icon: images.home.iconTech.iconCss,
  //     text: 'Css',
  //   },
  //   {
  //     icon: images.home.iconTech.iconFirebase,
  //     text: 'Firebase',
  //   },
  //   {
  //     icon: images.home.iconTech.iconReactNative,
  //     text: 'React native',
  //   },
  //   {
  //     icon: images.home.iconTech.iconNodejs,
  //     text: 'Nodejs (basic)',
  //   },
  //   {
  //     icon: images.home.iconTech.iconRestFullApi,
  //     text: 'Rest full api',
  //   },
  //   {
  //     icon: images.home.iconTech.iconScss,
  //     text: 'Scss',
  //   },
  //   {
  //     icon: images.home.iconTech.iconSql,
  //     text: 'Sql',
  //   },
  //   {
  //     icon: images.home.iconTech.iconTailwincss,
  //     text: 'TailWind',
  //   },
  // ]

  const handleMouseDown = () => {
    console.log('handleMouseDown')
    isClickSquare1Ref.current = true
  }

  const handleMouseUp = () => {
    console.log('handleMouseUp')
    isClickSquare1Ref.current = false
  }

  return (
    <ParallaxLayer offset={2}>
      <div className="w-full flex justify-center items-center h-full4">
        <div>Skill</div>

        <div className="relative flex justify-center items-center">
          <div className="w-10 h-10 absolute bg-green-300  top-0 left-0" />
          <div className="w-10 h-10 absolute bg-blue-300 top-0 right-0" />
          <div className="w-10 h-10 absolute bg-red-300 bottom-0 left-0" />
          <div className="w-10 h-10 absolute bg-yellow-300 bottom-0 right-0" />
        </div>
        <div className="cube-container">
          <div
            id="cube"
            className="cube"
            ref={square1Ref}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <div className="face front select-none">1</div>
            <div className="face back select-none">2</div>
            <div className="face left select-none">3</div>
            <div className="face right select-none">4</div>
            <div className="face top select-none">5</div>
            <div className="face bottom select-none">6</div>
          </div>
        </div>
      </div>
    </ParallaxLayer>
  )
}

export default Skill
