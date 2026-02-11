import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { PAGE_SIZE_LIMIT } from '@/constants/app'
import { QUERY_KEY } from '@/constants/reactQuery'
import { AccountCloud } from '@/services/ClientApi/type'
import AccountCloudAPI from '@/services/API/AccountCloud'

const normalizeAccountCloudList = (response: any): AccountCloud[] => {
  if (Array.isArray(response)) return response
  if (Array.isArray(response?.data)) return response.data
  if (Array.isArray(response?.data?.data)) return response.data.data

  return []
}

const useGetAccountCloud = (query: any = {}, limit = PAGE_SIZE_LIMIT) => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [QUERY_KEY.AccountCloud, query],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await AccountCloudAPI.get('/all', { ...query, page: pageParam, limit })

      return {
        data: normalizeAccountCloudList(response),
        page: pageParam,
      }
    },
    getNextPageParam: (lastPage: { data: AccountCloud[]; page: number }) => {
      if (lastPage?.data?.length === limit) {
        return lastPage.page + 1
      }

      return null
    },
  })

  const dataFinal = useMemo(() => {
    return data?.pages?.flatMap((item) => item.data) || []
  }, [data])

  return {
    data: dataFinal,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    refetch,
  }
}

export default useGetAccountCloud

