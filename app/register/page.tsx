'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

import MyButton from '@/components/MyButton'
import useLanguage from '@/hooks/useLanguage'
import useUser from '@/hooks/useUser'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'
import UserAPI from '@/services/API/User'
import InputForm from '@/components/MyForm/Input'
import MyForm from '@/components/MyForm'
import useCheckForm from '@/hooks/useCheckForm'
import MyCheckbox from '@/components/MyCheckbox'

type Form = {
  phone?: string
  password?: string
  confirmPassword?: string
  rememberMe?: boolean
}

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState<Form>({ rememberMe: true })
  const [formError, setFormError] = useState<Form>({})

  const { checkIsNumber, checkPassword } = useCheckForm()
  const router = useRouter()
  const { translate } = useLanguage()
  const { setUser, user } = useUser()

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])

  const onChangeForm = (data: Form) => {
    const newFormError = { ...formError }

    if (typeof data.phone !== 'undefined') {
      newFormError.phone = checkIsNumber(data.phone) || undefined
    }

    if (typeof data.password !== 'undefined') {
      newFormError.password = checkPassword(data.password) || undefined
      if (form.confirmPassword && data.password !== form.confirmPassword) {
        newFormError.confirmPassword = translate('warning.passAgain')
      } else {
        newFormError.confirmPassword = undefined
      }
    }

    if (typeof data.confirmPassword !== 'undefined') {
      if (data.confirmPassword !== form.password) {
        newFormError.confirmPassword = translate('warning.passAgain')
      } else {
        newFormError.confirmPassword = undefined
      }
    }

    setFormError(newFormError)
    setForm({ ...form, ...data })
  }

  const handleRegister = async () => {
    // Final validation
    const errorPhone = checkIsNumber(form.phone)
    const errorPass = checkPassword(form.password)
    const errorConfirm = form.confirmPassword !== form.password ? translate('warning.passAgain') : null

    if (errorPhone || errorPass || errorConfirm) {
      setFormError({
        phone: errorPhone || undefined,
        password: errorPass || undefined,
        confirmPassword: errorConfirm || undefined,
      })

      return
    }

    try {
      setIsLoading(true)
      const user = await UserAPI.register({
        phone: form.phone!,
        password: form.password!,
      })

      if (user) {
        showNotificationSuccess(translate('common.registerSuccess') || 'Registration successful')
        setUser(user)
        router.push('/')
      } else {
        showNotificationError(translate('errors.somethingWrong'))
      }
    } catch (error) {
      showNotificationError(translate('errors.somethingWrong'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-5 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-[#1a202c] dark:to-[#2d3748]'>
      <div className='w-full max-w-md animate-in fade-in zoom-in duration-500'>
        <MyForm
          className='w-full flex flex-col gap-5 p-10 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 dark:bg-[#2d3748]/80 dark:border-gray-700/30'
          onSubmit={handleRegister}
        >
          <div className='flex flex-col gap-2 mb-4'>
            <h1 className='text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400'>
              {translate('auth.register.title')}
            </h1>
            <p className='text-center text-gray-500 dark:text-gray-400 text-sm'>
              {translate('auth.register.subtitle') || 'Enter your details to create an account'}
            </p>
          </div>

          <div className='flex flex-col gap-4'>
            <InputForm
              errorMessage={() => formError.phone}
              isRequired
              label={translate('register.phone')}
              placeholder={translate('placeholder.enterNumberPhone')}
              onChange={(e) => onChangeForm({ phone: e })}
              className='transition-all duration-300 focus-within:scale-[1.02]'
            />

            <InputForm
              errorMessage={() => formError.password}
              isRequired
              label={translate('login.password')}
              placeholder={translate('placeholder.enterPassWord')}
              type='password'
              onChange={(e) => onChangeForm({ password: e })}
              className='transition-all duration-300 focus-within:scale-[1.02]'
            />

            <InputForm
              errorMessage={() => formError.confirmPassword}
              isRequired
              label={translate('auth.register.confirmPassword')}
              placeholder={translate('placeholder.enterPassWord')}
              type='password'
              onChange={(e) => onChangeForm({ confirmPassword: e })}
              className='transition-all duration-300 focus-within:scale-[1.02]'
            />

            <div className='flex items-center justify-between mt-1'>
              <MyCheckbox isSelected={form.rememberMe} onChange={(val) => onChangeForm({ rememberMe: val })} className='text-sm'>
                {translate('auth.register.rememberMe')}
              </MyCheckbox>
            </div>
          </div>

          <MyButton
            className='w-full mt-4 h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 transition-all duration-300 active:scale-95'
            color='primary'
            isPending={isLoading}
            type='submit'
          >
            {translate('auth.register.submit')}
          </MyButton>

          <div className='flex items-center justify-center gap-2 mt-4 text-sm'>
            <span className='text-gray-500 dark:text-gray-400'>{translate('auth.register.alreadyHaveAccount')}</span>
            <Link
              href='/login'
              className='font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors underline-offset-4 hover:underline'
            >
              {translate('auth.register.loginLink')}
            </Link>
          </div>
        </MyForm>
      </div>

      {/* Decorative elements */}
      <div className='fixed top-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 -z-10' />
      <div className='fixed bottom-0 right-0 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 -z-10' />
    </div>
  )
}

export default RegisterPage
