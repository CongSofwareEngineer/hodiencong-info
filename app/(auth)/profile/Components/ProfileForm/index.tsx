'use client'

import React, { useState } from 'react'

import ProfileEditForm from '../ProfileEditForm'
import VerifyPassword from '../VerifyPassword'

import MyButton from '@/components/MyButton'
import useLanguage from '@/hooks/useLanguage'
import useUser from '@/hooks/useUser'
import MyImage from '@/components/MyImage'
import useModal from '@/hooks/useModal'

const ProfileForm = () => {
  const { translate } = useLanguage()
  const { user } = useUser()
  const { openModal, closeModal } = useModal()

  const handleEdit = () => {
    openModal({
      title: translate('profile.verifyTitle') || 'Security Verification',
      children: (
        <VerifyPassword
          onVerified={() => {
            openModal({
              title: translate('profile.editTitle') || 'Edit Profile',
              children: <ProfileEditForm onSuccess={closeModal} />,
            })
          }}
        />
      ),
    })
  }

  return (
    <div className='w-full space-y-8'>
      <div className='flex flex-col md:flex-row items-center gap-8'>
        <div className='relative'>
          <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center'>
            {user?.avatar ? (
              <MyImage src={user.avatar} alt='Avatar' className='w-full h-full object-cover' />
            ) : (
              <div className='text-4xl text-gray-400 font-bold'>{user?.name?.charAt(0).toUpperCase() || 'U'}</div>
            )}
          </div>
        </div>

        <div className='flex-1 space-y-4 text-center md:text-left'>
          <div>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>{user?.name}</h2>
            <p className='text-gray-500 dark:text-gray-400'>{user?.phone}</p>
          </div>
          <div className='flex flex-wrap gap-3 justify-center md:justify-start'>
            <div className='px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-100 dark:border-blue-800/30 flex items-center gap-2'>
              <span className='font-semibold text-blue-700 dark:text-blue-300'>{translate('profile.points')}:</span>
              <span className='font-bold text-blue-600 dark:text-blue-400'>{user?.points || 0}</span>
            </div>
          </div>
        </div>

        <MyButton color='primary' onClick={handleEdit} className='px-8'>
          {translate('common.edit')}
        </MyButton>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 pt-4'>
        <div className='p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700/50'>
          <p className='text-sm text-gray-500 dark:text-gray-400 mb-1'>{translate('profile.name')}</p>
          <p className='font-semibold'>{user?.name}</p>
        </div>
        <div className='p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700/50'>
          <p className='text-sm text-gray-500 dark:text-gray-400 mb-1'>{translate('profile.phone')}</p>
          <p className='font-semibold'>{user?.phone}</p>
        </div>
      </div>
    </div>
  )
}

export default ProfileForm
