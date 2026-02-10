import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { PAGE_SIZE_LIMIT } from '@/constants/app'
import { QUERY_KEY } from '@/constants/reactQuery'
import { Finance } from '@/services/ClientApi/type'
import FinanceAPI from '@/services/API/Finance'

const useGetFinance = (query: any = {}, limit = PAGE_SIZE_LIMIT) => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [QUERY_KEY.Finance, query],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await FinanceAPI.getByPagination('/all', { ...query, page: pageParam, limit })

      return {
        data: response?.data?.data || [],
        page: pageParam,
        pagination: response?.data?.pagination,
      }
    },
    getNextPageParam: (lastPage: { data: Finance[]; page: number }) => {
      if (lastPage?.data?.length === limit) {
        return lastPage.page + 1
      }

      return null
    },
  })

  console.log({ data })

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

export default useGetFinance
