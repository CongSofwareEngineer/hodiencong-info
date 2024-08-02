import useAos from '@/hook/useAos'
import React from 'react'
import { LIST_DATA } from './listData'
import ItemService from './Item'

const Service = ({ listMyService }: { listMyService: any[] }) => {
  useAos(2000)

  return (
    <div className="container-base">
      <div className="container-content">
        <p
          data-aos="fade-right"
          className="mb-5 font-fast-hand md:text-[45px] text-[35px]"
        >
          My Services
        </p>
        <div className="flex w-full gap-5 justify-center overflow-scroll pb-4">
          {listMyService.map((e, index) => {
            return (
              <ItemService
                des={e.des}
                icon={e.icon}
                title={e.title}
                index={index}
                key={`ItemService-${index}`}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Service
