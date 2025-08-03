import { userZustand } from '@/zustand/user'

const useUser = () => {
  const { setUser, user } = userZustand((state) => state)

  return { setUser, user }
}

export default useUser
