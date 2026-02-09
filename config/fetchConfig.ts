import axios from 'axios'

import { REQUEST_TYPE } from '@/constants/app'

export type ServerAPIReqType = {
  url?: string
  body?: any
  auth?: string
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
  auth = '',
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
    withCredentials: true,
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

  if (auth) {
    config.headers.Authorization = auth
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
