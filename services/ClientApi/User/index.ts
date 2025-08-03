import { fetchData } from '@/config/fetchConfig';
import { REQUEST_TYPE } from '@/constants/app';
import { User } from '@/types';

const UserApi = {
  login: async (body: { sdt: string; password: string }): Promise<User> => {
    const data = await fetchData({
      url: `/login `,
      method: REQUEST_TYPE.POST,
      body,
    })

    return data?.data
  },
  updateUser: async (id: string, body: Partial<User>): Promise<User> => {
    const data = await fetchData({
      url: `/update-user/${id}`,
      method: REQUEST_TYPE.POST,
      body,
    })

    return data?.data
  },
  deleteUser: async (id: string): Promise<boolean> => {
    const data = await fetchData({
      url: `/delete-user/${id}`,
      method: REQUEST_TYPE.DELETE,
    })

    return !!data?.data
  },
}

export default UserApi
