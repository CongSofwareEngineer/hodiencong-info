import useMedia from './useMedia'

import { Modal, modal as modalZustand } from '@/zustand/modal'
import { Drawer, drawer as drawerZustand } from '@/zustand/drawer'

const useModal = () => {
  const { isMobile } = useMedia()
  const { closeModal: closeModalModal, openModal: openModalModal, listModals } = modalZustand((state) => state)
  const { closeDrawer: closeModalDrawer, openDrawer: openModalDrawer } = drawerZustand((state) => state)

  const openModal = (config: Modal | Drawer) => {
    if (isMobile) {
      openModalDrawer({
        placement: 'bottom',
        ...(config as any),
        isOpen: true,
      })
    } else {
      openModalModal({
        ...(config as any),
        isOpen: true,
      })
    }
  }

  const closeModal = () => {
    if (isMobile) {
      closeModalDrawer()
    } else {
      closeModalModal()
    }
  }

  return { listModals, openModal, closeModal }
}

export default useModal
