import MyImage from '@/components/MyImage'
import useAos from '@/hook/useAos'
import React from 'react'
type Props = {
  icon?: string
  title?: string
  des?: string
  index?: number
}
const ItemService = ({ des = '', icon = '', title = '', index = 0 }: Props) => {
  useAos(2000)
  return (
    <div
      data-aos="fade-up"
      data-aos-duration={`${index + 1}000`}
      className="md:pr-[250px] md:b-[300px] r-[200px] pb-[300px] relative overflow-hidden rounded-xl border-2 border-gray-400"
    >
      <div className="absolute w-full h-full p-5 flex flex-col gap-3 ">
        <MyImage alt={`icon-service-${title}`} src={icon} widthImage="20%" />
        <p className="text-title my-1">{title}</p>
        <span
          dangerouslySetInnerHTML={{
            __html: des,
          }}
        />
      </div>
    </div>
  )
}

export default ItemService
