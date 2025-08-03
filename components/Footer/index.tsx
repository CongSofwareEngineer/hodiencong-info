'use client'
import Link from 'next/link'
import { AiOutlineCopy } from 'react-icons/ai'
import { CgMail } from 'react-icons/cg'

import MyImage from '../MyImage'

import { images } from '@/config/images'
import { LINK_CONTACT } from '@/constants/app'
import { copyToClipboard } from '@/utils/notification'

const Item = ({ icon, value, link }: any) => {
  return (
    <div className='flex gap-2 items-center'>
      {typeof icon === 'string' ? (
        <MyImage fill alt={`icon-footer-${value}`} className='!relative md:!w-[25px] !w-[20px] md:!h-[25px] !h-[20px]' src={icon} />
      ) : (
        <div className='md:text-[25px] text-[20px]'>{icon}</div>
      )}

      <Link className='hover:underline cursor-pointer' href={link} target='_blank'>
        {value}
      </Link>
      <AiOutlineCopy onClick={() => copyToClipboard(value)} />
    </div>
  )
}
const Footer = () => {
  return (
    <footer className='no footer-web w-full bg-white flex justify-center md:mt-5 mt-3'>
      <div className='flex flex-col w-full items-center justify-center'>
        <div className=' w-full max-w-[1550px] md:px-[50px] px-[20px] py-5 '>
          <p className='text-title font-bold mb-2'>Thông tin về chúng tôi</p>
          <div className='flex md:flex-row flex-col w-full justify-between md:gap-0 gap-4'>
            <div className='flex flex-col md:gap-3 gap-2 md:w-[48%] w-full'>
              {/* 
              <Item icon={images.icons.iconNumberPhone} link={LINK_CONTACT.SDT} value={'Hồ Diên Công'} /> */}

              <Item icon={<CgMail className='text-red-900' />} link={LINK_CONTACT.Mail} value={'hodiencong2000@gmail.com'} />
              <Item icon={images.icons.iconZalo} link={LINK_CONTACT.Zalo} type={'zalo'} value={'+84392225405'} />
              <Item icon={images.icons.iconFacebook} link={LINK_CONTACT.FaceBook} value={'Facebook'} />
              {/* <Item icon={images.icons.icon} link={LINK_CONTACT.Github} value={'CongSofwareEngineer'} /> */}
              {/* <Item icon={images.footer.iconAddress} link={LINK_CONTACT.GGMap} value={'83/41, Phạm Văn Bạch, P.15, Tân Bình, TP.HCM'} /> */}
            </div>
            <div className='w-full md:w-[48%] min-h-[200px]'>
              <div style={{ height: '100%', width: '100%', minHeight: 200 }}>
                <iframe className='w-full h-full' loading='lazy' src={LINK_CONTACT.GGMap} title='TC Store' />
              </div>
            </div>
          </div>
        </div>
        <div className='flex gap-2 justify-center mb-2'>
          <span>Copyright © 2024</span>
          <Link href={LINK_CONTACT.HoDieCong} target='_blank'>
            <span className='hover:underline hover:scale-105 text-green-500'>CÔNG</span>
          </Link>
          <span>All Rights Reserved</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
