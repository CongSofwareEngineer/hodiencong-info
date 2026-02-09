import { User } from '../ClientApi/type'

import BaseAPI from './BaseAPI'

class UserService extends BaseAPI<User, any> {
  router = '/user'

  async login(body: { phone: string; password: string }) {
    return this.post('login', body)
  }

  async getInfoMe() {
    return this.post('/info-me')
  }
}

const UserAPI = new UserService()

export default UserAPI
