'use client'

import React, { useEffect, useState } from 'react'

import MyForm from '@/components/MyForm'
import InputForm from '@/components/MyForm/Input'
import MyButton from '@/components/MyButton'
import useLanguage from '@/hooks/useLanguage'
import useCheckForm from '@/hooks/useCheckForm'
import useUser from '@/hooks/useUser'
import UserAPI from '@/services/API/User'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import { User } from '@/services/ClientApi/type'
import MyImage from '@/components/MyImage'
import { UserCircleIcon } from '@/components/Icons/UserCircle'

const ProfileForm = () => {
  const { translate } = useLanguage()
  const { checkIsNumber, checkNameUser } = useCheckForm()
  const { user, setUser } = useUser()
  const [form, setForm] = useState<Partial<User>>({})
  const [formError, setFormError] = useState<Partial<Record<keyof User, string>>>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        phone: user.phone,
        avatar: user.avatar,
      })
    }
  }, [user])

  const onChangeForm = (data: Partial<User>) => {
    const newForm = { ...form, ...data }
    const newError = { ...formError }

    if (data.phone) {
      newError.phone = checkIsNumber(data.phone) || undefined
    }
    if (data.name) {
      newError.name = checkNameUser(data.name) || undefined
    }

    setForm(newForm)
    setFormError(newError)
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      const res = await UserAPI.updateProfile(form)
      if (res?.data) {
        setUser({ ...user, ...form })
        showNotificationSuccess(translate('profile.updateSuccess'))
      } else {
        showNotificationError(translate('errors.update'))
      }
    } catch (error) {
      showNotificationError(translate('errors.somethingWrong'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='w-full'>
      <MyForm className='flex flex-col gap-6' onSubmit={handleSubmit}>
        <div className='flex flex-col items-center mb-6'>
          <div className='relative group'>
            <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center'>
              {form.avatar ? (
                <MyImage 
                  src={form.avatar} 
                  alt='Avatar' 
                  className='w-full h-full object-cover' 
                />
              ) : (
                <div className='text-4xl text-gray-400 font-bold'>
                  {form.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
            </div>
            <label className='absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white shadow-lg cursor-pointer hover:bg-blue-700 transition-colors'>
              <UserCircleIcon className='w-5 h-5' />
              <input 
                type='text' 
                className='hidden' 
                onChange={(e) => onChangeForm({ avatar: e.target.value })} 
                placeholder='Avatar URL'
              />
            </label>
          </div>
          <p className='mt-4 text-sm text-gray-500 dark:text-gray-400'>
             {translate('profile.avatar')}
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <InputForm
            label={translate('profile.name')}
            value={form.name}
            onChange={(e) => onChangeForm({ name: e })}
            errorMessage={() => formError.name}
            isRequired
          />
          <InputForm
            label={translate('profile.phone')}
            value={form.phone}
            onChange={(e) => onChangeForm({ phone: e })}
            errorMessage={() => formError.phone}
            isRequired
          />
        </div>

        <div className='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex justify-between items-center border border-blue-100 dark:border-blue-800/30'>
          <span className='font-semibold text-blue-700 dark:text-blue-300'>
            {translate('profile.points')}
          </span>
          <span className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
            {user?.points || 0}
          </span>
        </div>

        <MyButton 
          type='submit' 
          color='primary' 
          isLoading={isLoading}
          className='w-full md:w-max px-12 h-12 text-lg self-end'
        >
          {translate('common.save')}
        </MyButton>
      </MyForm>
    </div>
  )
}

export default ProfileForm
