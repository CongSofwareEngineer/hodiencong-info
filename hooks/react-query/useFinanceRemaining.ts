import { useQuery } from '@tanstack/react-query'

import { QUERY_KEY } from '@/constants/reactQuery'
import FinanceAPI from '@/services/API/Finance'

export type FinanceRemainingData = {
  usdRemaining: number
  totalDeposit: number
  totalWithdraw: number
}

const normalizeFinanceRemaining = (response: any): FinanceRemainingData => {
  const data = response?.data ?? response

  return {
    usdRemaining: data?.usdRemaining ?? 0,
    totalDeposit: data?.totalDeposit ?? 0,
    totalWithdraw: data?.totalWithdraw ?? 0,
  }
}

const useGetFinanceRemaining = () => {
  return useQuery<FinanceRemainingData>({
    queryKey: [QUERY_KEY.FinanceRemaining],
    queryFn: async () => {
      const response = await FinanceAPI.get('/usd-remaining')

      return normalizeFinanceRemaining(response)
    },
  })
}

export default useGetFinanceRemaining
