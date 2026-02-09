import { Finance } from '../ClientApi/type'

import BaseAPI from './BaseAPI'

class FinanceService extends BaseAPI<Finance, any> {
  router = '/finance'
}
const FinanceAPI = new FinanceService()

export default FinanceAPI
