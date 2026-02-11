import { AccountCloud } from '../ClientApi/type'

import BaseAPI from './BaseAPI'

class AccountCloudService extends BaseAPI<AccountCloud, any> {
  router = '/account-cloud'
}
const AccountCloudAPI = new AccountCloudService()

export default AccountCloudAPI
