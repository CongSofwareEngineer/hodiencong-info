'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

import MyButton from '@/components/MyButton'
import useLanguage from '@/hooks/useLanguage'
import useUser from '@/hooks/useUser'
import { showNotificationError } from '@/utils/notification'
import UserAPI from '@/services/API/User'
import InputForm from '@/components/MyForm/Input'
import MyForm from '@/components/MyForm'
import useCheckForm from '@/hooks/useCheckForm'

type Form = {
  phone?: string
  password?: string
}

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState<Form>({})
  const [formError, setFormError] = useState<Form>({})

  const { checkIsNumber } = useCheckForm()
  const router = useRouter()
  const { translate } = useLanguage()
  const { setUser, user } = useUser()

  useEffect(() => {
    if (user) {
      router.push('/finances')
    }
  }, [user, router])

  const onChangeForm = (data: Form) => {
    if (typeof data.phone !== 'undefined') {
      const errorPhone = checkIsNumber(data.phone)

      setFormError({ ...formError, phone: errorPhone })
    }

    setForm({ ...form, ...data })
  }

  const handleLogin = async () => {
    try {
      setIsLoading(true)
      const user = await UserAPI.login({ phone: form.phone!, password: form.password! })

      if (user) {
        setUser(user)
        router.push('/')
      } else {
        showNotificationError(translate('login.loginError'))
      }
    } catch (error) {
      showNotificationError(translate('errors.somethingWrong'))
    } finally {
      setIsLoading(false)
    }
  }

  console.log({ form })

  return (
    <div className='flex flex-col items-center justify-center md:min-h-screen  p-5'>
      <MyForm className='w-full flex flex-col gap-3 max-w-md p-8  bg-white rounded-lg shadow-md dark:bg-[#2d3748]' onSubmit={handleLogin}>
        <h1 className='text-title  text-center dark:text-white'>{translate('login.login')}</h1>
        <InputForm
          errorMessage={checkIsNumber}
          validate={checkIsNumber}
          isRequired
          label={translate('register.phone')}
          placeholder={translate('placeholder.enterNumberPhone')}
          onChange={(e) => onChangeForm({ phone: e })}
        />
        <InputForm
          isRequired
          label={translate('login.password')}
          placeholder={translate('placeholder.enterPassWord')}
          type='password'
          onChange={(e) => onChangeForm({ password: e })}
        />
        <MyButton className='w-full mt-2' color='primary' isPending={isLoading} type='submit'>
          {translate('login.login')}
        </MyButton>
        <div className='flex items-center justify-center gap-2 mt-4 text-sm'>
          <span className='text-gray-500 dark:text-gray-400'>{translate('login.noAccount') || "Don't have an account?"}</span>
          <Link
            href='/register'
            className='font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors underline-offset-4 hover:underline'
          >
            {translate('common.register')}
          </Link>
        </div>
      </MyForm>
      <div className='h-48' />
    </div>
  )
}

export default LoginPage
