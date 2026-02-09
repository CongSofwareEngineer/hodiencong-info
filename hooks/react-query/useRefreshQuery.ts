import { useQueryClient } from '@tanstack/react-query'

import { QUERY_KEY } from '@/constants/reactQuery'

const useRefreshQuery = () => {
  const queryClient = useQueryClient()

  const refreshQuery = async (key: QUERY_KEY) => {
    await queryClient.invalidateQueries({ queryKey: [key] })
  }

  const refreshListQuery = async (listKey: QUERY_KEY[]) => {
    const fun = listKey.map((e: QUERY_KEY) => {
      return refreshQuery(e)
    })

    await Promise.all(fun)
  }

  return { refreshQuery, refreshListQuery }
}

export default useRefreshQuery
