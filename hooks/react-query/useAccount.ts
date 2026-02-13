import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { PAGE_SIZE_LIMIT } from '@/constants/app'
import { QUERY_KEY } from '@/constants/reactQuery'
import { Account } from '@/services/ClientApi/type'
import AccountAPI from '@/services/API/Account'

type Pagination = {
  page: number
  limit: number
  total: number
  totalPages: number
}

const useAccount = (query: any = {}, limit = PAGE_SIZE_LIMIT) => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [QUERY_KEY.Account, query],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await AccountAPI.getByPagination('/all', { ...query, page: pageParam, limit })
      let arrAccounts = response?.data?.data || []

      arrAccounts = arrAccounts.sort((a, b) => {
        if (a.name) {
          return -1
        }
        if (b?.name) {
          return 1
        }

        return 0
      })

      return {
        data: arrAccounts,
        page: pageParam,
        pagination: response?.data?.pagination,
      }
    },
    getNextPageParam: (lastPage: { data: Account[]; page: number; pagination?: Pagination }) => {
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

export default useAccount
