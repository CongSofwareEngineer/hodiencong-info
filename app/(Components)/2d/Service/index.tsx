import useAos from '@/hook/useAos'
import React from 'react'
import ItemService from './Item'
import SlideItemEx from '@/components/SlideItemEx'

const Service = ({ listMyService }: { listMyService: any[] }) => {
  useAos(2000)
  console.log('====================================')
  console.log({ listMyService })
  console.log('====================================')
  return (
    <div className="container-base">
      <div className="container-content pt-0">
        <p
          data-aos="fade-right"
          className=" font-fast-hand md:text-[45px] text-[35px] md:mt-4 mt-0"
        >
          My Services
        </p>
        <div className="flex w-full justify-center items-center">
          <SlideItemEx
            idContainer="myServices"
            listData={listMyService}
            renderItem={(item, index) => {
              return (
                <ItemService
                  des={item.des}
                  icon={item.icon}
                  title={item.title}
                  index={index}
                  key={`ItemService-${index}`}
                />
              )
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Service
