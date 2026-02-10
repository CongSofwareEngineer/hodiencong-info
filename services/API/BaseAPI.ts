import { getCookie, setCookie } from '../Cookies'

import { REQUEST_TYPE, OBSERVER_KEY, COOKIE_KEY, COOKIE_KEY_EXPIRED } from '@/constants/app'
import fetchConfig, { fetchData, ClientAPITypeParam } from '@/config/fetchConfig'
import ObserverService from '@/services/observer'

class BaseAPI<T, F> {
  baseUrl: string = process.env.NEXT_PUBLIC_API_APP || ''
  router: string = ''

  static refreshPromise: Promise<any> | null = null

  static async updateCookie() {
    const tokenRefresh: any = await getCookie(COOKIE_KEY.TokenRefresh)

    const res = await fetchConfig({
      url: '/auth/refresh',
      method: REQUEST_TYPE.POST,
      baseURL: process.env.NEXT_PUBLIC_API_APP || '',
      tokenRefresh: tokenRefresh,
    })

    if (res?.data?.tokenAccess) {
      BaseAPI.refreshPromise = null
      await setCookie(COOKIE_KEY.TokenAccess, res.data.tokenAccess, COOKIE_KEY_EXPIRED.TokenAccess)

      return res
    } else {
      ObserverService.emit(OBSERVER_KEY.LogOut, false)

      return null
    }
  }

  async request<R = any, B = any>(
    method: REQUEST_TYPE,
    urlOriginal: string,
    body?: B,
    config?: Partial<ClientAPITypeParam>
  ): Promise<{ data: R; error?: any; messages: any }> {
    let url = urlOriginal

    if (this.router && !url.startsWith('/auth')) {
      url = this.router + '/' + url
      url = url.replace('//', '/')
    }

    const response = await fetchData({
      ...config,
      url,
      body,
      method,
      baseURL: this.baseUrl,
    })

    if (!config?.noRefreshToken) {
      if ((response?.error?.response?.status === 401 || response?.messages === 'unauthorized') && urlOriginal !== '/auth/refresh') {
        if (!BaseAPI.refreshPromise) {
          BaseAPI.refreshPromise = BaseAPI.updateCookie()
        }

        const refreshRes = await BaseAPI.refreshPromise

        if (refreshRes?.data?.status) {
          return await this.request<R, B>(method, urlOriginal, body, config)
        } else {
          ObserverService.emit(OBSERVER_KEY.LogOut, false)
        }
      }
    }

    return response
  }

  get<R = T[], B = F>(url: string, query?: B, config?: Partial<ClientAPITypeParam>) {
    if (query) {
      const queryObj = new URLSearchParams(query as any)
      const queryString = queryObj.toString()

      url = url + `?${queryString}`
    }
    if (!url.startsWith('/')) {
      url = '/' + url
    }

    return this.request<R, B>(REQUEST_TYPE.GET, url, undefined, config)
  }

  post<R = T, B = Partial<T>>(url: string, body?: B, config?: Partial<ClientAPITypeParam>) {
    return this.request<R, B>(REQUEST_TYPE.POST, url, body, config)
  }

  put<R = T, B = Partial<T>>(url: string, body?: B, config?: Partial<ClientAPITypeParam>) {
    return this.request<R, B>(REQUEST_TYPE.PUT, url, body, config)
  }

  patch<R = T, B = Partial<T>>(url: string, body?: B, config?: Partial<ClientAPITypeParam>) {
    return this.request<R, B>(REQUEST_TYPE.PATCH, url, body, config)
  }

  delete<R = T, B = any>(url: string, body?: B, config?: Partial<ClientAPITypeParam>) {
    return this.request<R, B>(REQUEST_TYPE.DELETE, url, body, config)
  }

  create(body: Partial<T>) {
    return this.post<T>('', body)
  }

  update(id: string, body: Partial<T>) {
    return this.patch<T>(`/${id}`, body)
  }
}

export default BaseAPI
