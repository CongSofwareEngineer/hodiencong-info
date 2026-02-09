import { User } from '../ClientApi/type'

import BaseAPI from './BaseAPI'

import fetchConfig from '@/config/fetchConfig'
import { REQUEST_TYPE } from '@/constants/app'

class UserService extends BaseAPI<User, any> {
  router = '/user'

  async login(body: { phone: string; password: string }) {
    return this.post('login', body)
  }

  async getInfoMe() {
    try {
      const res = await fetchConfig({
        baseURL: window.location.origin,
        url: '/api/cookies',
        method: REQUEST_TYPE.POST,
      })

      console.log({ getInfoMe: res })

      return res
    } catch (error) {
      return null
    }
    // return this.post('/info-me')
  }
}

const UserAPI = new UserService()

export default UserAPI
