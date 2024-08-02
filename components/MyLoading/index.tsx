import React from 'react'
import MyLottie from '../MyLottie'
type Props = {
  className?: string
  width?: number
  height?: number
}
const MyLoading = ({ className = '', height = 400, width = 400 }: Props) => {
  return (
    <div className={`w-full flex justify-center items-center ${className}`}>
      <MyLottie height={height} width={width} />
    </div>
  )
}

export default MyLoading
