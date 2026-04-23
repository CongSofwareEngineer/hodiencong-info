import { setCookie } from '../Cookies'

import BaseAPI from './BaseAPI'

import { cloneData } from '@/utils/functions'
import { COOKIE_KEY, COOKIE_KEY_EXPIRED } from '@/constants/app'
import { User } from '@/types'

class UserService extends BaseAPI<User, any> {
  router = '/user'

  async login(body: { phone: string; password: string }) {
    const res = await this.post('login', body)
    const data: any = res?.data

    if (data) {
      await Promise.all([
        setCookie(COOKIE_KEY.TokenAccess, data.tokenAccess, COOKIE_KEY_EXPIRED.TokenAccess),
        setCookie(COOKIE_KEY.TokenRefresh, data.tokenRefresh, COOKIE_KEY_EXPIRED.TokenRefresh),
      ])
      const dataClone = cloneData(data)

      delete dataClone.tokenAccess
      delete dataClone.tokenRefresh

      return dataClone
    }

    return null
  }

  async register(body: { phone: string; password: string }) {
    const res = await this.post('register', body)
    const data: any = res?.data

    if (data) {
      await Promise.all([
        setCookie(COOKIE_KEY.TokenAccess, data.tokenAccess, COOKIE_KEY_EXPIRED.TokenAccess),
        setCookie(COOKIE_KEY.TokenRefresh, data.tokenRefresh, COOKIE_KEY_EXPIRED.TokenRefresh),
      ])
      const dataClone = cloneData(data)

      delete dataClone.tokenAccess
      delete dataClone.tokenRefresh

      return dataClone
    }

    return null
  }

  async getInfoMe() {
    // try {
    //   const res = await fetchConfig({
    //     baseURL: window.location.origin,
    //     url: '/api/cookies',
    //     method: REQUEST_TYPE.POST,
    //   })

    //   console.log({ getInfoMe: res })

    //   return res
    // } catch (error) {
    //   return null
    // }
    return this.post('/info-me')
  }

  async updateProfile(body: Partial<User>) {
    return this.post('/update-profile', body)
  }

  async changePassword(body: { oldPassword: string; newPassword: string }) {
    return this.post('/change-password', body)
  }

  async addAddress(body: { address: string; isDefault?: boolean; label?: string }) {
    return this.post('/address/add', body)
  }

  async updateAddress(id: string, body: { address: string; isDefault?: boolean; label?: string }) {
    return this.post(`/address/update/${id}`, body)
  }

  async deleteAddress(id: string) {
    return this.delete(`/address/delete/${id}`)
  }
}

const UserAPI = new UserService()

export default UserAPI
