'use server'

import { cookies } from 'next/headers'

import { COOKIE_KEY } from '@/constants/app'

export async function hasCookie(key: COOKIE_KEY) {
  try {
    const cookieStore = await cookies()

    return cookieStore.has(key)
  } catch {
    return false
  }
}

export async function getCookie<T>(key: COOKIE_KEY): Promise<T | null> {
  try {
    const cookieStore = await cookies()

    const data = cookieStore.get(key)?.value

    return data as T
  } catch {
    return null
  }
}

export async function setCookie(key: COOKIE_KEY, value: any, expired?: number) {
  try {
    const cookieStore = await cookies()

    cookieStore.set(key, value, {
      maxAge: expired,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      path: '/',
    })

    return true
  } catch (error) {
    console.log({ error })

    return false
  }
}

export async function deleteCookie(key: COOKIE_KEY | COOKIE_KEY[]) {
  try {
    const cookieStore = await cookies()

    if (typeof key === 'string') {
      cookieStore.delete(key)
    } else {
      key.forEach((k) => {
        cookieStore.delete(k)
      })
    }

    return true
  } catch {
    return false
  }
}

export async function getAllCookies() {
  try {
    const cookieStore = await cookies()

    return cookieStore.getAll()
  } catch {
    return null
  }
}
