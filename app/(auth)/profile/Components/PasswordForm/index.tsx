'use client'

import React from 'react'

import ChangePasswordForm from './ChangePasswordForm'

import MyButton from '@/components/MyButton'
import useLanguage from '@/hooks/useLanguage'
import useModal from '@/hooks/useModal'

const PasswordForm = () => {
  const { translate } = useLanguage()
  const { openModal, closeModal } = useModal()

  const handleOpenModal = () => {
    openModal({
      title: translate('profile.password.title'),
      children: <ChangePasswordForm onSuccess={closeModal} />,
    })
  }

  return (
    <div className='w-full p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700/50'>
      <h3 className='text-lg font-bold mb-4 flex items-center gap-2'>
        <div className='w-1 h-6 bg-blue-600 rounded-full' />
        {translate('profile.password.title')}
      </h3>
      <div className='flex flex-col gap-4'>
        <p className='text-sm text-gray-500 dark:text-gray-400'>
          {translate('profile.password.description') || 'Regularly changing your password helps keep your account secure.'}
        </p>
        <MyButton onClick={handleOpenModal} className='w-full'>
          {translate('profile.password.title')}
        </MyButton>
      </div>
    </div>
  )
}

export default PasswordForm
