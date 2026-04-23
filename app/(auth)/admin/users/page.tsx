'use client'

import React from 'react'

import UserTable from './components/UserTable'

import useLanguage from '@/hooks/useLanguage'

const AdminUsersPage = () => {
  const { translate } = useLanguage()

  return (
    <div className='min-h-screen pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto'>
      <div className='mb-10 text-center md:text-left'>
        <h1 className='text-4xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight'>
          {translate('header.home')} / <span className='text-blue-600'>{translate('header.user')}</span>
        </h1>
        <p className='text-gray-500 dark:text-gray-400 text-lg'>
          {translate('common.total')} {translate('header.user')}
        </p>
      </div>

      <div className='animate-in fade-in slide-in-from-bottom-5 duration-700'>
        <UserTable />
      </div>

      <div className='h-24' />
    </div>
  )
}

export default AdminUsersPage
