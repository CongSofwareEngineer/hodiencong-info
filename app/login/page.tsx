'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import MyInput from '@/components/MyInput'
import MyButton from '@/components/MyButton'
import useLanguage from '@/hooks/useLanguage'
import useUser from '@/hooks/useUser'
import { showNotificationError } from '@/utils/notification'
import UserAPI from '@/services/API/User'

const LoginPage = () => {
  const [sdt, setSdt] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { translate } = useLanguage()
  const { setUser, user } = useUser()

  useEffect(() => {
    if (user) {
      router.push('/finances')
    }
  }, [user, router])

  const handleLogin = async (e: React.FormEvent) => {
    try {
      setIsLoading(true)
      e.preventDefault()
      if (!sdt || !password) {
        showNotificationError(translate('errors.empty'))

        return
      }
      const user = await UserAPI.login({ phone: sdt, password })

      if (user) {
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
    <div className='flex flex-col items-center justify-center md:min-h-screen bg-gray-50 dark:bg-[#1a202c] p-5'>
      <form className='w-full flex flex-col gap-4 max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-[#2d3748]' onSubmit={handleLogin}>
        <h1 className='text-2xl font-bold text-center dark:text-white'>{translate('login.login')}</h1>
        <MyInput
          label={translate('register.phone')}
          placeholder={translate('placeholder.enterNumberPhone')}
          value={sdt}
          onChange={(e) => setSdt(e.target.value)}
        />
        <MyInput
          label={translate('login.password')}
          placeholder={translate('placeholder.enterPassWord')}
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <MyButton className='w-full' color='primary' isLoading={isLoading} type='submit'>
          {translate('login.login')}
        </MyButton>
      </form>
    </div>
  )
}

export default LoginPage
