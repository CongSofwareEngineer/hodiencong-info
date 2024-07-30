import React, { useRef } from 'react'
import styled from 'styled-components'
import { Canvas } from '@react-three/fiber'
import { Center, Float, Text3D, Text } from '@react-three/drei'
import useWindowSize from '@/hook/useWindowSize'
import useMedia from '@/hook/useMedia'
import { ParallaxLayer } from '@react-spring/parallax'

const CanvasCustom = styled(Canvas)<{ $width?: number; $height?: number }>`
  width: auto !important;
  height: auto !important;
  > div {
    width: ${(props) => props.$width}px !important;
    height: ${(props) => props.$height}px !important;
  }
  canvas {
    width: ${(props) => props.$width}px !important;
    height: ${(props) => props.$height}px !important;
  }
`
const TextBanner = () => {
  const { isClient } = useMedia()
  const text3dRef = useRef(null)
  const { heightScree, widthScree, isHorizontal } = useWindowSize()

  return (
    <ParallaxLayer
      offset={0}
      style={{
        background:
          'linear-gradient(to top, #aab7c4, #a7cad5, #aadeda, #bdefd3, #e4fbc8)',
      }}
    >
      <div className="w-full min-h-screen h-screen  flex justify-center items-center  ">
        {isClient && (
          <CanvasCustom $width={widthScree} $height={heightScree}>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              decay={0}
              intensity={Math.PI}
            />
            <pointLight
              position={[-10, -10, -10]}
              decay={0}
              intensity={Math.PI}
            />
            <mesh>
              <Float floatIntensity={5} rotationIntensity={1} speed={3}>
                <Center position={[0, 0, 0]}>
                  <Text3D
                    material={[]}
                    size={0.7}
                    ref={text3dRef}
                    curveSegments={32}
                    bevelEnabled
                    bevelSize={0.04}
                    bevelThickness={0.1}
                    height={0.5}
                    lineHeight={0.5}
                    letterSpacing={-0.06}
                    font={'/assets/fonts/basic.json'}
                  >
                    Hồ Diên Công
                    <meshNormalMaterial />
                  </Text3D>
                </Center>
              </Float>
            </mesh>
          </CanvasCustom>
        )}
        <div className="absolute bottom-[10%] w-full flex gap-3 justify-center">
          <div className="flex gap-1">
            <span>Email :</span>
            <span>hodiencong2000@gmail.com</span>
          </div>
        </div>
      </div>
    </ParallaxLayer>
  )
}

export default TextBanner
