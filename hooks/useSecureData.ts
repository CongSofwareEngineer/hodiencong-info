import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import SecureDataApi from '@/services/SecureDataApi'
import { SecureDataType, CreateSecureDataInput, UpdateSecureDataInput } from '@/types/secure'
import { showNotificationError, showNotificationSuccess } from '@/utils/notification'

export const useGetSecureData = (type?: SecureDataType) => {
  return useQuery({
    queryKey: ['secureData', type],
    queryFn: () => SecureDataApi.getAll(type),
  })
}

export const useGetSecureDataById = (id: string) => {
  return useQuery({
    queryKey: ['secureData', id],
    queryFn: () => SecureDataApi.getById(id),
    enabled: !!id,
  })
}

export const useCreateSecureData = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateSecureDataInput) => SecureDataApi.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['secureData'] })
      showNotificationSuccess('Created secure data successfully')
    },
    onError: (error: any) => {
      showNotificationError('Failed to create secure data')
      console.error(error)
    },
  })
}

export const useUpdateSecureData = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateSecureDataInput }) => SecureDataApi.update(id, input),
    onSuccess: (response) => {
      if (response.messages === 'success') {
        queryClient.invalidateQueries({ queryKey: ['secureData'] })
        showNotificationSuccess('Updated secure data successfully')
      } else {
        showNotificationError('Failed to update secure data')
      }
    },
    onError: (error: any) => {
      showNotificationError('Failed to update secure data')
      console.error(error)
    },
  })
}

export const useDeleteSecureData = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => SecureDataApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['secureData'] })
      showNotificationSuccess('Deleted secure data successfully')
    },
    onError: (error: any) => {
      showNotificationError('Failed to delete secure data')
      console.error(error)
    },
  })
}
