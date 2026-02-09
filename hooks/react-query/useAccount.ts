import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { PAGE_SIZE_LIMIT } from '@/constants/app'
import { QUERY_KEY } from '@/constants/reactQuery'
import { Account } from '@/services/ClientApi/type'
import AccountAPI from '@/services/API/Account'

const useGetAccount = (query: any = {}, limit = PAGE_SIZE_LIMIT) => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [QUERY_KEY.Account, query],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await AccountAPI.get('/all', { ...query, page: pageParam, limit })

      console.log({ response })

      return {
        data: response?.data || [],
        page: pageParam,
      }
    },
    getNextPageParam: (lastPage: { data: Account[]; page: number }) => {
      if (lastPage?.data?.length === limit) {
        return lastPage.page + 1
      }

      return null
    },
  })

  const dataFinal = useMemo(() => {
    return data?.pages?.flatMap((item) => item.data) || []
  }, [data])

  console.log({ dataFinal })

  return {
    data: dataFinal,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    refetch,
  }
}

export default useGetAccount
