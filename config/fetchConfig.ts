import { COOKIE_KEY, REQUEST_TYPE } from '@/constants/app'
import { getCookie } from '@/services/Cookies'

export type ServerAPIReqType = {
  url?: string
  body?: any
  tokenRefresh?: string
  method?: REQUEST_TYPE
  timeOut?: number
  isAuth?: boolean
  baseURL?: string
  noRefreshToken?: boolean
}

export type ClientAPITypeParam = ServerAPIReqType

export type ResponseType<T> = {
  data: T
  error?: any
  status?: number
}

export const fetchData = async (param: ClientAPITypeParam): Promise<ResponseType<any>> => {
  const config: ClientAPITypeParam = {
    isAuth: true,
    method: REQUEST_TYPE.GET,
    ...param,
  }

  return fetchConfig({ ...config })
}

const fetchConfig = async ({
  url = '',
  body = null,
  tokenRefresh = '',
  method = REQUEST_TYPE.GET,
  timeOut = 70000,
  baseURL,
}: ServerAPIReqType): Promise<ResponseType<any>> => {
  const base = baseURL || process.env.NEXT_PUBLIC_API_APP || ''
  let fullUrl = `${base}${url}`

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (tokenRefresh) {
    headers.Authorization = tokenRefresh
  } else {
    const tokenAccess = await getCookie<string>(COOKIE_KEY.TokenAccess)

    if (tokenAccess) {
      headers.Authorization = tokenAccess
    }
  }

  const options: RequestInit = {
    method,
    headers,
    signal: AbortSignal.timeout(timeOut),
  }

  if (body) {
    if (method === REQUEST_TYPE.GET) {
      const searchParams = new URLSearchParams()

      Object.keys(body).forEach((key) => {
        if (body[key] !== undefined && body[key] !== null) {
          searchParams.append(key, String(body[key]))
        }
      })
      const queryString = searchParams.toString()

      if (queryString) {
        fullUrl += (fullUrl.includes('?') ? '&' : '?') + queryString
      }
    } else {
      options.body = JSON.stringify(body)
    }
  }
  fullUrl = fullUrl.replace('//', '/')

  const response = await fetch(fullUrl, options)

  if (response.status === 200) {
    const result = await response.json()

    return {
      data: result?.data,
      status: response.status,
    }
  }

  return {
    data: null,
    status: response.status,
    error: 'fail',
  }

  // try {

  // } catch (error) {
  //   return {
  //     data: null,
  //     messages: 'fail',
  //     error,
  //   }
  // }
}

export default fetchConfig
