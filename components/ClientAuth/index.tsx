'use client'
import React, { Suspense, useLayoutEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

import MyButton from '../MyButton'

import useUser from '@/hooks/useUser'
import UserAPI from '@/services/API/User'
import { cn } from '@/utils/tailwind'
import useClient from '@/hooks/useClient'
const ClientAuth = ({ children }: { children: React.ReactNode }) => {
  const { user, setUser } = useUser()
  const isClient = useClient()
  const router = useRouter()

  const [isLoginLoading, setIsLoginLoading] = useState(false)

  useLayoutEffect(() => {
    if (isClient) {
      const getData = async () => {
        try {
          setIsLoginLoading(true)
          const res = await UserAPI.getInfoMe()

          if (res?.data) {
            setUser(res.data)
          }
          setIsLoginLoading(false)
        } catch (error) {
          setIsLoginLoading(false)
        }
      }

      getData()
    }
  }, [isClient, setUser])

  return (
    <Suspense>
      {user ? (
        children
      ) : (
        <div className='flex flex-col items-center justify-center h-screen'>
          <MyButton
            className={cn(isLoginLoading && 'bg-transparent')}
            onClick={() => {
              if (!isLoginLoading) {
                router.push('/login')
              }
            }}
          >
            {isLoginLoading ? (
              <div className='max-w-sm animate-pulse' role='status'>
                <div className=' bg-blue-600 rounded-full w-28 h-10 flex items-center justify-center'>Loading....</div>
              </div>
            ) : (
              'Login'
            )}
          </MyButton>
        </div>
      )}
    </Suspense>
  )
}

export default ClientAuth
