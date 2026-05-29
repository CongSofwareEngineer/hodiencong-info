'use client'
import React, { useState } from 'react'

import { fetchData } from '@/config/fetchConfig'
import { REQUEST_TYPE } from '@/constants/app'

export default function Argon2Page() {
  const [isLoading, setIsLoading] = useState(false)
  const handle = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`http://localhost:3000/api/argon2/encrypt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: 'diencong',
          password: 'Diencong12@5',
        }),
      })
      const data = await response.json()

      console.log('====================================')
      console.log({ data })
      console.log('====================================')
    } catch (error) {
      console.log('====================================')
      console.log({ error })
      console.log('====================================')
    } finally {
      setIsLoading(false)
    }
  }

  return <div onClick={handle}>Argon2Page {isLoading ? 'Loading...' : ''}</div>
}
