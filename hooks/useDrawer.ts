import { drawer as drawerZustand } from '@/zustand/drawer'

const useDrawer = () => {
  const drawer = drawerZustand((state) => state)

  return drawer
}

export default useDrawer
