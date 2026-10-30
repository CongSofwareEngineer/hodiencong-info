'use client'

import React from 'react'

import GlobeIcon from '@/components/Icons/Globe'
import useLanguage from '@/hooks/useLanguage'
import { LANGUAGE_SUPPORT } from '@/zustand/language'
import { cn } from '@/utils/tailwind'
import { images } from '@/config/images'
import MyImage from '@/components/MyImage'

const LanguageSelector = () => {
  const { lang, setLanguage } = useLanguage()

  const languages = [
    {
      key: LANGUAGE_SUPPORT.VN,
      label: 'Tiếng Việt',
      flag: '🇻🇳',
      code: 'VN',
      icon: images.language.iconVietnamese,
    },
    {
      key: LANGUAGE_SUPPORT.EN,
      label: 'English',
      flag: '🇺🇸',
      code: 'EN',
      icon: images.language.iconEnglish,
    },
  ]

  const currentLang = languages.find((l) => l.key === lang) || languages[1]

  return (
    <div className='dropdown dropdown-end'>
      <div
        className='relative h-10 px-3 border border-white/15 bg-white/5 text-white hover:border-amber-300/60 hover:bg-white/10 transition-all duration-300 rounded-full group flex items-center gap-2 cursor-pointer'
        role='button'
        tabIndex={0}
      >
        <span className='relative flex items-center group-hover:scale-110 transition-transform duration-300'>
          <MyImage noAnimation className='w-auto! h-7!' sizes='100px' src={currentLang.icon} />
        </span>
        <GlobeIcon className='w-4 h-4 text-white/60 group-hover:text-amber-300 group-hover:rotate-12 transition-transform duration-300' />
      </div>
      <ul
        aria-label='Language Selection'
        className='menu dropdown-content z-50 mt-3 w-48 rounded-box border border-base-content/10 bg-base-200 p-2 shadow-2xl'
      >
        {languages.map((item) => (
          <li key={item.key}>
            <button
              className={cn('flex items-center gap-3', lang === item.key && 'menu-active')}
              type='button'
              onClick={() => {
                setLanguage(item.key)
                ;(document.activeElement as HTMLElement | null)?.blur()
              }}
            >
              <span className='relative flex'>
                <MyImage noAnimation className='w-auto! h-6!' sizes='100px' src={item.icon} />
              </span>
              <span className='flex flex-col'>
                <span className='font-semibold'>{item.label}</span>
                <span className='text-[10px] uppercase opacity-50'>{item.code}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LanguageSelector
