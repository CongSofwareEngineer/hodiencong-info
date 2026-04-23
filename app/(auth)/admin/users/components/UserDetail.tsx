'use client'

import React from 'react'

import { User } from '@/types'
import useLanguage from '@/hooks/useLanguage'

interface UserDetailProps {
  user: User
}

const UserDetail: React.FC<UserDetailProps> = ({ user }) => {
  const { translate } = useLanguage()

  return (
    <div className='space-y-6 py-4'>
      <div className='flex items-center gap-4 border-b border-gray-100 dark:border-gray-700 pb-6'>
        <div className='w-20 h-20 rounded-full bg-linear-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-blue-500/20'>
          {user.name?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div>
          <h3 className='text-2xl font-bold text-gray-900 dark:text-white'>{user.name || translate('secureData.table.noData')}</h3>
          <p className='text-blue-600 dark:text-blue-400 font-medium'>{user.sdt || translate('secureData.table.noData')}</p>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='space-y-1'>
          <p className='text-xs uppercase tracking-widest text-gray-400 font-bold'>{translate('profile.email')}</p>
          <p className='text-gray-700 dark:text-gray-200 font-semibold'>{user.email || '---'}</p>
        </div>
        <div className='space-y-1'>
          <p className='text-xs uppercase tracking-widest text-gray-400 font-bold'>{translate('profile.address')}</p>
          <p className='text-gray-700 dark:text-gray-200 font-semibold'>{user.address || '---'}</p>
        </div>
        <div className='space-y-1'>
          <p className='text-xs uppercase tracking-widest text-gray-400 font-bold'>Zalo</p>
          <p className='text-gray-700 dark:text-gray-200 font-semibold'>{user.info?.zalo || '---'}</p>
        </div>
        <div className='space-y-1'>
          <p className='text-xs uppercase tracking-widest text-gray-400 font-bold'>Facebook</p>
          <p className='text-gray-700 dark:text-gray-200 font-semibold whitespace-nowrap overflow-hidden text-ellipsis'>{user.info?.face || '---'}</p>
        </div>
      </div>

      {user.linkAddress && (
        <div className='space-y-1 pt-2'>
          <p className='text-xs uppercase tracking-widest text-gray-400 font-bold'>{translate('profile.linkAddress')}</p>
          <a
            href={user.linkAddress}
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-600 hover:underline break-all block py-2 px-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800'
          >
            {user.linkAddress}
          </a>
        </div>
      )}
    </div>
  )
}

export default UserDetail
