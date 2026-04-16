import { NextRequest } from 'next/server'

import { lowercase } from '@/utils/functions'
import { decryptData } from '@/utils/crypto'

const ALLOWED_ORIGINS = ['http://localhost:3000', 'https://hdcong.vercel.app']

const rateLimitMap = new Map<
  string,
  {
    secondly: { count: number; timestamp: number }
    daily: { count: number; date: string }
  }
>()

function checkRateLimit(ip: string) {
  const now = Date.now()
  const today = new Date().toISOString().split('T')[0]
  const second = Math.floor(now / 1000)

  let limit = rateLimitMap.get(ip)

  if (!limit) {
    limit = {
      secondly: { count: 0, timestamp: second },
      daily: { count: 0, date: today },
    }
  }

  // Secondly reset
  if (limit.secondly.timestamp !== second) {
    limit.secondly.count = 0
    limit.secondly.timestamp = second
  }

  // Daily reset
  if (limit.daily.date !== today) {
    limit.daily.count = 0
    limit.daily.date = today
  }

  if (limit.secondly.count >= 3) {
    return { allowed: false, error: 'Too many requests (limit 3/sec)' }
  }

  if (limit.daily.count >= 20) {
    return { allowed: false, error: 'Daily limit exceeded (limit 20/day)' }
  }

  limit.secondly.count++
  limit.daily.count++
  rateLimitMap.set(ip, limit)

  return { allowed: true }
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || '127.0.0.1'

    const limitStatus = checkRateLimit(ip)

    if (!limitStatus.allowed) {
      return new Response(
        JSON.stringify({
          error: limitStatus.error,
        }),
        {
          status: 429,
        }
      )
    }

    // Check origin/referer
    const origin = req.headers.get('origin') || req.headers.get('referer')
    const isAllowed = ALLOWED_ORIGINS.some((allowedOrigin) => {
      if (origin) {
        return origin.startsWith(allowedOrigin) || origin.includes('localhost')
      }

      return false
    })

    if (!isAllowed) {
      return new Response(
        JSON.stringify({
          error: 'Forbidden: Domain not allowed',
        }),
        {
          status: 403,
        }
      )
    }

    const body = await req.json()
    let password = body.password

    const passwordDefault = process.env.DEFAULT_CRYPTO_PASSWORD || ''

    if (!password) {
      password = passwordDefault
    } else {
      if (password !== passwordDefault) {
        if (password.includes(passwordDefault)) {
          password = lowercase(password)
          password = password.replace(lowercase(passwordDefault), passwordDefault)
        } else {
          password = lowercase(password)
        }
      }
    }
    let data = decryptData(body.data, password)

    if (data?.length > 10) {
      const startText = data.slice(0, 4)
      const middleText = data.slice(4, 8)
      const endText = data.slice(8)

      data = `${startText}...${middleText}...${endText}`
    } else {
      if (data?.length > 4) {
        const startText = data.slice(0, 4)
        const endText = data.slice(4)

        data = `${startText}...${endText}`
      }
    }

    return new Response(
      JSON.stringify({
        data,
      }),
      {
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        error,
      }),
      {
        status: 500,
      }
    )
  }
}
