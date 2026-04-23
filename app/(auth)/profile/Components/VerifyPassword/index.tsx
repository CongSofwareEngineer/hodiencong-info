'use client'
import React, { useState } from 'react'

import MyForm from '@/components/MyForm'
import InputForm from '@/components/MyForm/Input'
import MyButton from '@/components/MyButton'
import useLanguage from '@/hooks/useLanguage'
import UserAPI from '@/services/API/User'
import { showNotificationError } from '@/utils/notification'

interface VerifyPasswordProps {
  onVerified: () => void
}

const VerifyPassword = ({ onVerified }: VerifyPasswordProps) => {
  const { translate } = useLanguage()
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const handleVerify = async () => {
    if (!password) {
      setError(translate('errors.empty'))

      return
    }

    try {
      setIsLoading(true)
      const res = await UserAPI.verifyPassword(password)

      if (res?.data) {
        onVerified()
      } else {
        setError(translate('warning.inValidPassWordAgain'))
      }
    } catch (err) {
      showNotificationError(translate('errors.somethingWrong'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='w-full space-y-4'>
      <div className='text-center space-y-2 mb-6'>
        <p className='text-gray-600 dark:text-gray-400'>{translate('profile.verifyText') || 'Please enter your password to continue.'}</p>
      </div>
      <MyForm onSubmit={handleVerify} className='space-y-6'>
        <InputForm
          label={translate('login.password')}
          placeholder={translate('placeholder.enterPassWord')}
          type='password'
          value={password}
          onChange={setPassword}
          errorMessage={() => error}
          isRequired
          autoFocus
        />
        <MyButton type='submit' color='primary' className='w-full h-12' isLoading={isLoading}>
          {translate('common.confirm') || 'Confirm'}
        </MyButton>
      </MyForm>
    </div>
  )
}

export default VerifyPassword
