'use client'
import { Mail, MapPin, Phone } from 'lucide-react'
import { AiOutlineCopy } from 'react-icons/ai'

import MyImage from '../MyImage'

import BackLink from '@/app/(Components)/BackLink'
import { images } from '@/config/images'
import { LINK_CONTACT } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'
import { copyToClipboard } from '@/utils/notification'

const Item = ({ icon, value, link }: any) => {
  return (
    <div className='flex gap-2 items-center'>
      {typeof icon === 'string' ? (
        <MyImage fill alt={`icon-footer-${value}`} className='!relative  !w-8  !h-8 ' src={icon} />
      ) : (
        <div className=' text-[32px] min-w-8 flex justify-center '>{icon}</div>
      )}

      <BackLink className='hover:underline cursor-pointer  text-base' href={link} target='_blank'>
        {value}
      </BackLink>
      <AiOutlineCopy className='cursor-pointer ' scale={1.1} size={16} onClick={() => copyToClipboard(value)} />
    </div>
  )
}
const Footer = () => {
  const { translate } = useLanguage()

  return (
    <footer className={'relative shadow-2xl shadow-purple-400  '}>
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-gradient-to-br  from-gray-900  via-purple-900  o-blue-900' />
      </div>
      <div className='text-white relative gap-5 pb-4   flex flex-col w-full items-center justify-center'>
        <div className=' w-full container md:px-[50px] px-[20px] py-6 '>
          <p className='text-title font-bold mb-2'>{translate('footer.aboutUs')}</p>
          <div className='flex md:flex-row flex-col w-full justify-between md:gap-0 gap-10'>
            <div className='flex flex-col   gap-3 md:w-[48%] w-full'>
              <Item icon={<Phone className='text-green-400 hover:text-red-400' size={24} />} link={LINK_CONTACT.SDT} value={'Hồ Diên Công'} />

              <Item
                icon={<Mail className='text-red-400 hover:text-red-400' size={26} />}
                link={LINK_CONTACT.Mail}
                value={'hodiencong2000@gmail.com'}
              />
              <Item icon={images.icons.iconZalo} link={LINK_CONTACT.Zalo} type={'zalo'} value={'+84392225405'} />
              <Item icon={images.icons.iconFacebook} link={LINK_CONTACT.FaceBook} value={'Facebook'} />
              {/* <Item icon={images.icons.icon} link={LINK_CONTACT.Github} value={'CongSofwareEngineer'} /> */}
              <Item
                icon={<MapPin className='text-red-400 hover:text-red-400' size={32} />}
                link={LINK_CONTACT.GGMap}
                value={'83/41, Phạm Văn Bạch, P.15, Tân Bình, TP.HCM'}
              />
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
