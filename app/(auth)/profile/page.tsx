'use client'

import React from 'react'

import ProfileForm from './Components/ProfileForm'
import PasswordForm from './Components/PasswordForm'
import AddressList from './Components/AddressList'

import useLanguage from '@/hooks/useLanguage'

const ProfilePage = () => {
  const { translate } = useLanguage()

  return (
    <div className='max-w-[1000px] mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-500'>
      <div className='space-y-2'>
        <h1 className='text-3xl font-extrabold text-gray-900 dark:text-gray-100'>{translate('profile.title')}</h1>
        <p className='text-gray-500 dark:text-gray-400'>Manage your account settings and preferences.</p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2 space-y-8'>
          {/* Main Info Section */}
          <section className='bg-white dark:bg-gray-900 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800'>
            <ProfileForm />
          </section>

          {/* Addresses Section */}
          <section className='bg-white dark:bg-gray-900 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800'>
            <AddressList />
          </section>
        </div>

        <div className='lg:col-span-1'>
          {/* Password Section */}
          <section className='bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 sticky top-24'>
            <PasswordForm />
          </section>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
