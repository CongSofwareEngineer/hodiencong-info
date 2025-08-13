import { ExternalLink, Facebook, Globe, Instagram, Linkedin, Twitter } from 'lucide-react'
import { AiFillGithub } from 'react-icons/ai'

import BackLink from '../BackLink'

import { LINK_CONTACT } from '@/constants/app'
import useLanguage from '@/hooks/useLanguage'

const SocialMedia = () => {
  const { translate } = useLanguage()

  const renderSocial = () => {
    const arr = [
      {
        icon: AiFillGithub,
        title: 'Github',
        value: '@CongSofwareEngineer',
        action: LINK_CONTACT.Github,
      },
      {
        icon: Linkedin,
        title: 'Linkedin',
        value: 'Hồ Diên Công',
        action: LINK_CONTACT.Github,
      },
      {
        icon: Facebook,
        title: 'Facebook',
        value: 'Hồ Diên Công',
        action: LINK_CONTACT.FaceBook,
      },
      {
        icon: Twitter,
        title: 'X (Twitter)',
        value: 'Hồ Diên Công',
        action: LINK_CONTACT.X,
      },
      {
        icon: Instagram,
        title: 'Instagram',
        value: 'Hồ Diên Công',
        action: LINK_CONTACT.Instagram,
      },
    ]

    return (
      <div className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-8 gap-4  w-full'>
        {arr.map((contact, index) => (
          <BackLink
            key={`social-media-${index}`}
            className='hover:translate-y-[-8px] bg-white/70 dark:bg-gray-700/50 backdrop-blur-sm  border border-white/50 dark:border-gray-600/30 shadow-md hover:shadow-lg max-w-full hover:scale-105 group block md:p-6 p-4  rounded-2xl  transition-all duration-300  '
            href={contact.action}
            target={'_blank'}
          >
            <div className='flex w-full items-center space-x-6'>
              <div
                className={`md:min-w-16  md:w-16 md:h-16 min-w-14  w-14 h-14    rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
              >
                <contact.icon className='w-8 h-8 dark:text-white text-black' />
              </div>
              <div className='flex-1'>
                <h4 className='text-xl text-gray-900 dark:text-white mb-1 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300'>
                  {contact.title}
                </h4>
                <p className='text-sm text-gray-500 dark:text-gray-400'>{contact.value}</p>
              </div>
              <ExternalLink className='min-w-5 w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300' />
            </div>
          </BackLink>
        ))}
      </div>
    )
  }

  return (
    <div className='pt-20  flex w-full mb-20 ' id='social-media'>
      <div className='md:p-8 p-4 w-full flex flex-col gap-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200/50 dark:border-purple-700/30 shadow-xl rounded-3xl'>
        <div className='inline-flex justify-center items-center px-6 py-3 '>
          <Globe className='w-7 h-7 mr-3 text-purple-600 dark:text-purple-400' />
          <span className='bg-gradient-to-r  md:text-2xl text-xl from-purple-700 to-blue-700 dark:from-purple-300 dark:to-blue-300 bg-clip-text text-transparent'>
            {translate('home.socialMedia.connectSocialMedia')}
          </span>
        </div>

        {renderSocial()}
      </div>
    </div>
  )
}

export default SocialMedia
