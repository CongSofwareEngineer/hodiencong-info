import axios from 'axios'

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

export const fetchData = async (
  param: ClientAPITypeParam
): Promise<{
  data: any
  error?: any
  messages: any
}> => {
  try {
    const config: ClientAPITypeParam = {
      isAuth: true,
      method: REQUEST_TYPE.GET,
      ...param,
    }

    return fetchConfig({ ...config })
  } catch {
    return {
      data: null,
      messages: 'fail',
      error: 'server_error',
    }
  }
}

const fetchConfig = async ({
  url = '',
  body = null,
  tokenRefresh = '',
  method = REQUEST_TYPE.GET,
  timeOut = 70000,
  baseURL,
}: ServerAPIReqType): Promise<{ data: any; error?: any; messages: any }> => {
  const config: any = {
    baseURL: baseURL || process.env.NEXT_PUBLIC_API_APP,
    url,
    // cache: isCache ? 'force-cache' : 'no-store',
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    signal: AbortSignal.timeout(timeOut),
    // withCredentials: true,
  }

  if (body) {
    if (method !== REQUEST_TYPE.GET) {
      // config.data = {
      //   ...body,
      //   dataEncode: encodeDataMaxLength(body),
      // }
      config.data = body
    } else {
      config.params = body
    }
  }
  if (tokenRefresh) {
    config.headers.Authorization = tokenRefresh
  } else {
    const tokenAccess = await getCookie(COOKIE_KEY.TokenAccess)

    config.headers.Authorization = tokenAccess
  }

  return await axios
    .request(config)
    .then(async (response) => {
      if (response.status === 200) {
        return {
          data: response?.data?.data?.data || response?.data?.data,
          messages: 'success',
        }
      }

      return {
        data: null,
        messages: 'fail',
      }
    })
    .catch((error) => {
      return {
        data: null,
        messages: 'fail',
        error,
      }
    })
}

export default fetchConfig
