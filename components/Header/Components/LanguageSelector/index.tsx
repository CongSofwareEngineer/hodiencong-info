'use client'

import React from 'react'

import GlobeIcon from '@/components/Icons/Globe'
import MyDropDown from '@/components/MyDropDown'
import useLanguage from '@/hooks/useLanguage'
import { LANGUAGE_SUPPORT } from '@/zustand/language'
import { cn } from '@/utils/tailwind'
import MyButton from '@/components/MyButton'
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

  const options = languages.map((item) => ({
    id: item.key,
    label: (
      <div className='flex flex-col'>
        <span className='font-semibold'>{item.label}</span>
        <span className='text-[10px] text-gray-400 uppercase'>{item.code}</span>
      </div>
    ),
    icon: <MyImage sizes='100px' noAnimation className='w-auto! h-7!' src={item.icon} />,
    // icon: <span className='text-xl'>{item.flag}</span>,
    className: cn('rounded-lg transition-all duration-200 py-2', lang === item.key ? ' text-blue-600 dark:text-blue-400' : ''),
  }))

  return (
    <MyDropDown
      // placement='bottom-end'
      className='min-w-[150px] bg-transparent'
      options={options}
      menuConfig={{
        'aria-label': 'Language Selection',
        // variant: 'flat',
        disallowEmptySelection: true,
        selectionMode: 'single',
        selectedKeys: [lang],
        onSelectionChange: (keys: any) => {
          const selected = Array.from(keys)[0] as LANGUAGE_SUPPORT

          setLanguage(selected)
        },
      }}
    >
      <MyButton
        // variant='light'

        className={cn(
          'relative md:h-10  bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 h-10 px-3 border-none text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 rounded-xl group flex items-center gap-2'
        )}
      >
        <div className='flex items-center gap-2'>
          <span className='text-lg group-hover:scale-110 transition-transform duration-300'>
            {/* {currentLang.flag} */}
            <MyImage sizes='100px' noAnimation className='w-auto! h-7!' src={currentLang.icon} />
          </span>
          {/* <span className='text-sm font-medium uppercase md:block hidden'>{currentLang.code}</span> */}
        </div>
        <GlobeIcon className='w-4 h-4 text-gray-400 group-hover:rotate-12 transition-transform duration-300 ml-1' />
      </MyButton>
    </MyDropDown>
  )
}

export default LanguageSelector
