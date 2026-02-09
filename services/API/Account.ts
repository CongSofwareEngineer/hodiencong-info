import { Account } from '../ClientApi/type'

import BaseAPI from './BaseAPI'

class AccountService extends BaseAPI<Account, any> {
  router = '/account'
}
const AccountAPI = new AccountService()

export default AccountAPI
