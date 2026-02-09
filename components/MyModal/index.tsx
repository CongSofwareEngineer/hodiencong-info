import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/modal'
import { useEffect } from 'react'

import useModal from '@/hooks/useModal'
import { cn } from '@/utils/tailwind'

const MyModal = () => {
  const { listModals, closeModal } = useModal()

  useEffect(() => {
    if (listModals.length > 0) {
      document.documentElement.style.scrollbarGutter = ''
      document.documentElement.style.removeProperty('scrollbar-gutter')
    }
  }, [listModals])

  return (
    <>
      {listModals.map((modal, index) => (
        <Modal
          key={`modal-${index}`}
          backdrop='blur'
          {...modal}
          onOpenChange={(open) => {
            if (open === false) {
              closeModal()
              document.body.style.removeProperty('overflow')
            } else {
              document.body.style.overflow = 'hidden'
            }
          }}
        >
          <ModalContent className='max-h-[calc(100vh-60px)]'>
            {modal?.title && <ModalHeader className={cn('flex flex-col gap-1 text-white', modal.classNames?.header)}>{modal?.title}</ModalHeader>}
            <ModalBody className={cn('overflow-auto pb-5', modal.classNames?.body)}>{modal?.children}</ModalBody>
          </ModalContent>
        </Modal>
      ))}
    </>
  )
}

export default MyModal
