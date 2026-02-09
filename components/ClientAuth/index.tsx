'use client'
import React, { useLayoutEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import MyButton from '../MyButton'

import useUser from '@/hooks/useUser'
import UserAPI from '@/services/API/User'
import { cn } from '@/utils/tailwind'

const ClientAuth = ({ children }: { children: React.ReactNode }) => {
  const { user, setUser } = useUser()
  const router = useRouter()

  const [isLogin, setIsLogin] = useState(false)

  useLayoutEffect(() => {
    const getData = async () => {
      try {
        setIsLogin(true)
        const res = await UserAPI.getInfoMe()

        if (res?.data) {
          setUser(res.data)
        }
        setIsLogin(false)
      } catch (error) {
        setIsLogin(false)
      }
    }

    getData()
  }, [setUser])

  return user ? (
    children
  ) : (
    <div className='flex flex-col items-center justify-center h-screen'>
      <MyButton
        className={cn(isLogin && 'bg-transparent')}
        onClick={() => {
          if (!isLogin) {
            router.push('/login')
          }
        }}
      >
        {isLogin ? (
          <div className='max-w-sm animate-pulse' role='status'>
            <div className=' bg-blue-600 rounded-full w-28 h-10 flex items-center justify-center'>Loading....</div>
          </div>
        ) : (
          'Login'
        )}
      </MyButton>
    </div>
  )
}

export default ClientAuth
