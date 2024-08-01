import useAos from '@/hook/useAos'
import React from 'react'
import styled from 'styled-components'
const MyImage = styled.img`
  width: 100%;
  height: auto;
  user-select: none;
`
type Props = {
  title: string
  icon: string
}
const Item = ({ icon, title }: Props) => {
  useAos()
  return (
    <div
      data-aos="fade-right"
      className={`flex gap-3 px-4 rounded-2xl py-3 items-center border-2 border-gray-400`}
    >
      <div className="aspect-square w-10 h-10 flex justify-center items-center">
        <MyImage alt={`icon-tech-${icon}`} src={icon} />
      </div>
      <div className="text-medium font-bold">{title}</div>
    </div>
  )
}

export default Item
