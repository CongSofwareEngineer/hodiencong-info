import { fetchData } from '@/config/fetchConfig'
import { PATH_IMG, REQUEST_TYPE } from '@/constants/app'

const ClientApi = {
  uploadImg: async (file: any, path: PATH_IMG) => {
    return fetchData({
      url: `/upload-image/upload`,
      method: REQUEST_TYPE.POST,
      body: {
        file,
        path,
      },
    })
  },
}

export default ClientApi
