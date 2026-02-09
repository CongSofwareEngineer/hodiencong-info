import { Modal, modal as modalZustand } from '@/zustand/modal'

const useModal = () => {
  const modal = modalZustand((state) => state)

  const openModal = (config: Modal) => {
    modal.openModal({
      ...config,
      isOpen: true,
    })
  }

  return { ...modal, openModal }
}

export default useModal
