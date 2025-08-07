'use client'
import Link from 'next/link'
import { AiOutlineCopy } from 'react-icons/ai'
import { CgMail } from 'react-icons/cg'

import MyImage from '../MyImage'

import { images } from '@/config/images'
import { LINK_CONTACT } from '@/constants/app'
import { copyToClipboard } from '@/utils/notification'
import { cn } from '@/utils/tailwind'
import useTheme from '@/zustand/theme'

const Item = ({ icon, value, link }: any) => {
  return (
    <div className='flex gap-2 items-center'>
      {typeof icon === 'string' ? (
        <MyImage fill alt={`icon-footer-${value}`} className='!relative  !w-8  !h-8 ' src={icon} />
      ) : (
        <div className=' text-[32px]  '>{icon}</div>
      )}

      <Link className='hover:underline cursor-pointer md:text-xl text-base' href={link} target='_blank'>
        {value}
      </Link>
      <AiOutlineCopy onClick={() => copyToClipboard(value)} />
    </div>
  )
}
const Footer = () => {
  const { isDarkMode } = useTheme()

  return (
    <footer
      className={cn(
        isDarkMode ? 'dark' : 'bg-white light',
        'no bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white footer-web w-full  flex justify-center md:mt-5 mt-3'
      )}
    >
      <div className='text-gray-900 dark:text-white flex flex-col w-full items-center justify-center'>
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
      </div>
    </footer>
  )
}

export default Footer
