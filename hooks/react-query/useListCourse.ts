import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { PAGE_SIZE_LIMIT } from '@/constants/app'
import { QUERY_KEY } from '@/constants/reactQuery'
import ClientApi from '@/services/ClientApi'
import { Query } from '@/types'

const useListCourse = (limit = PAGE_SIZE_LIMIT) => {
  const { data, isLoading, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: [QUERY_KEY.ListCourse],
    queryFn: async ({ pageParam }: Query) => {
      const data = await ClientApi.getListCourses(pageParam, limit)

      return {
        data: data?.data || [],
        page: pageParam,
      }
    },
    getNextPageParam: (lastPage: { data: any; page: number }) => {
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
    fetchNextPage,
    hasNextPage,
    refetch,
  }
}

export default useListCourse
