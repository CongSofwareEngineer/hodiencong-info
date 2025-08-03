import { modal2 as modal2Zustand } from '../zustand/modal2'

const useModal2 = () => {
  const modal2 = modal2Zustand((state) => state)

  return modal2
}

export default useModal2
