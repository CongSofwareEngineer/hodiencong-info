import { userZustand } from '@/zustand/user'

const useLogin = () => {
  const { setUser } = userZustand((state) => state)

  const login = async (sdt: string, password: string) => {
    // const data = await ClientApi.login({ sdt, password })
    // setUser(data)
    // return data
  }

  const logOut = () => {
    setUser(null)
  }

  return {
    login,
    logOut,
  }
}

export default useLogin
