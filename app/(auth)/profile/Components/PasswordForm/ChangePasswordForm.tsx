'use client'

import React, { useState } from 'react'

import MyForm from '@/components/MyForm'
import InputForm from '@/components/MyForm/Input'
import MyButton from '@/components/MyButton'
import useLanguage from '@/hooks/useLanguage'
import useCheckForm from '@/hooks/useCheckForm'
import UserAPI from '@/services/API/User'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'

interface ChangePasswordFormProps {
  onSuccess: () => void
}

const ChangePasswordForm = ({ onSuccess }: ChangePasswordFormProps) => {
  const { translate } = useLanguage()
  const { checkPassword } = useCheckForm()
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })
  const [formError, setFormError] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)

  const onChangeForm = (data: any) => {
    const newForm = { ...form, ...data }
    const newError: any = { ...formError }

    if (data.newPassword) {
      newError.newPassword = checkPassword(data.newPassword) || undefined
    }

    if (data.confirmNewPassword || data.newPassword) {
      if (newForm.confirmNewPassword && newForm.newPassword !== newForm.confirmNewPassword) {
        newError.confirmNewPassword = translate('warning.passAgain')
      } else {
        newError.confirmNewPassword = undefined
      }
    }

    setForm(newForm)
    setFormError(newError)
  }

  const handleSubmit = async () => {
    if (!form.oldPassword) {
      setFormError({ ...formError, oldPassword: translate('errors.empty') })

      return
    }

    if (formError.newPassword || formError.confirmNewPassword) return

    try {
      setIsLoading(true)
      const res = await UserAPI.changePassword({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      })

      if (res?.data) {
        showNotificationSuccess(translate('profile.password.updateSuccess'))
        onSuccess()
      } else {
        showNotificationError(translate('warning.inValidPassWordAgain'))
      }
    } catch (error) {
      showNotificationError(translate('errors.somethingWrong'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <MyForm className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <InputForm
        label={translate('profile.password.oldPassword')}
        placeholder='********'
        type='password'
        value={form.oldPassword}
        onChange={(e) => onChangeForm({ oldPassword: e })}
        errorMessage={() => formError.oldPassword}
        isRequired
      />
      <InputForm
        label={translate('profile.password.newPassword')}
        placeholder='********'
        type='password'
        value={form.newPassword}
        onChange={(e) => onChangeForm({ newPassword: e })}
        errorMessage={() => formError.newPassword}
        isRequired
      />
      <InputForm
        label={translate('profile.password.confirmNewPassword')}
        placeholder='********'
        type='password'
        value={form.confirmNewPassword}
        onChange={(e) => onChangeForm({ confirmNewPassword: e })}
        errorMessage={() => formError.confirmNewPassword}
        isRequired
      />
      <MyButton type='submit' color='primary' isLoading={isLoading} className='mt-2 w-full h-12'>
        {translate('profile.password.title')}
      </MyButton>
    </MyForm>
  )
}

export default ChangePasswordForm
