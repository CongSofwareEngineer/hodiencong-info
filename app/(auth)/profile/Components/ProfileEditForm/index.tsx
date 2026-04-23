'use client'

import React, { useRef, useState } from 'react'

import MyForm from '@/components/MyForm'
import InputForm from '@/components/MyForm/Input'
import MyButton from '@/components/MyButton'
import useLanguage from '@/hooks/useLanguage'
import useCheckForm from '@/hooks/useCheckForm'
import useUser from '@/hooks/useUser'
import UserAPI from '@/services/API/User'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import MyImage from '@/components/MyImage'
import { UserCircleIcon } from '@/components/Icons/UserCircle'
import { User } from '@/types'
import { CameraIcon } from '@/components/Icons/Camera'

interface ProfileEditFormProps {
  onSuccess: () => void
}

const ProfileEditForm = ({ onSuccess }: ProfileEditFormProps) => {
  const { translate } = useLanguage()
  const { checkIsNumber, checkNameUser } = useCheckForm()
  const { user, setUser } = useUser()
  const [form, setForm] = useState<Partial<User>>({
    name: user?.name,
    phone: user?.phone,
    avatar: user?.avatar,
  })
  const [formError, setFormError] = useState<Partial<Record<keyof User, string>>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    try {
      setIsUploading(true)
      const res = await UserAPI.uploadAvatar(file)

      if (res?.data?.url) {
        setForm((prev) => ({ ...prev, avatar: res.data.url }))
        showNotificationSuccess(translate('profile.uploadSuccess') || 'Avatar uploaded successfully')
      } else {
        showNotificationError(translate('errors.upload') || 'Failed to upload avatar')
      }
    } catch (error) {
      showNotificationError(translate('errors.somethingWrong'))
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async () => {
    if (formError.name || formError.phone) return

    try {
      setIsLoading(true)
      const res = await UserAPI.updateProfile(form)

      if (res?.data) {
        setUser({ ...user, ...form } as any)
        showNotificationSuccess(translate('profile.updateSuccess'))
        onSuccess()
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
          <div className='relative group cursor-pointer' onClick={() => fileInputRef.current?.click()}>
            <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center'>
              {form.avatar ? (
                <MyImage src={form.avatar} alt='Avatar' className='w-full h-full object-cover' />
              ) : (
                <div className='text-4xl text-gray-400 font-bold'>{form.name?.charAt(0).toUpperCase() || 'U'}</div>
              )}
              {isUploading && (
                <div className='absolute inset-0 bg-black/40 flex items-center justify-center'>
                  <div className='w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin' />
                </div>
              )}
            </div>
            <div className='absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white shadow-lg group-hover:bg-blue-700 transition-colors'>
              <CameraIcon className='w-5 h-5' />
            </div>
            <input type='file' ref={fileInputRef} className='hidden' accept='image/*' onChange={handleFileChange} />
          </div>
          <p className='mt-4 text-sm text-gray-500 dark:text-gray-400'>{translate('profile.avatar')}</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <InputForm
            label={translate('profile.name')}
            placeholder={translate('placeholder.enterName')}
            value={form.name}
            onChange={(e) => onChangeForm({ name: e })}
            errorMessage={() => formError.name}
            isRequired
          />
          <InputForm
            label={translate('profile.phone')}
            placeholder={translate('placeholder.enterNumberPhone')}
            value={form.phone}
            onChange={(e) => onChangeForm({ phone: e })}
            errorMessage={() => formError.phone}
            isRequired
          />
        </div>

        <MyButton type='submit' color='primary' isLoading={isLoading} isDisabled={isUploading} className='w-full h-12 text-lg mt-4'>
          {translate('common.save')}
        </MyButton>
      </MyForm>
    </div>
  )
}

export default ProfileEditForm
