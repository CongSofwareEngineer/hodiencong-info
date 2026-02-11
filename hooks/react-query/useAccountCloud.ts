import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { PAGE_SIZE_LIMIT } from '@/constants/app'
import { QUERY_KEY } from '@/constants/reactQuery'
import { AccountCloud } from '@/services/ClientApi/type'
import AccountCloudAPI from '@/services/API/AccountCloud'

type Pagination = {
  page: number
  limit: number
  total: number
  totalPages: number
}

const useAccountCloud = (query: any = {}, limit = PAGE_SIZE_LIMIT) => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [QUERY_KEY.AccountCloud, query],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await AccountCloudAPI.getByPagination('/all', { ...query, page: pageParam, limit })

      return {
        data: response?.data?.data || [],
        page: pageParam,
        pagination: response?.data?.pagination,
      }
    },
    getNextPageParam: (lastPage: { data: AccountCloud[]; page: number; pagination?: Pagination }) => {
      if (lastPage?.pagination && lastPage.pagination.page < lastPage.pagination.totalPages) {
        return lastPage.pagination.page + 1
      }
      if (lastPage?.data?.length === limit) {
        return lastPage.page + 1
      }

      return null
    },
  })

  const dataFinal = useMemo(() => {
    return data?.pages?.flatMap((item) => item.data) || []
  }, [data])

  const pagination = useMemo(() => {
    const pages = data?.pages || []

    return (pages[pages.length - 1]?.pagination || null) as Pagination | null
  }, [data])

  return {
    data: dataFinal,
    pagination,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  }
}

export default useAccountCloud
