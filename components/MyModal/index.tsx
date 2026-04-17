import { Modal, ModalBody, ModalContainer, ModalHeader } from '@heroui/react'
import { useEffect } from 'react'

import useModal from '@/hooks/useModal'
import { cn } from '@/utils/tailwind'

const MyModal = () => {
  const { listModals, closeModal } = useModal()

  useEffect(() => {
    if (listModals.length > 0) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.removeProperty('overflow')
    }

    return () => {
      document.body.style.removeProperty('overflow')
    }
  }, [listModals])

  return (
    <>
      {listModals.map((modal, index) => (
        <Modal
          key={`modal-${index}`}
          {...modal}
          onOpenChange={(open) => {
            if (!open) closeModal()
          }}
        >
          <ModalContainer
            className={cn(
              'max-h-[calc(100vh-60px)] rounded-[6px]',
              'bg-white dark:bg-gray-900',
              'border border-gray-200 dark:border-gray-700',
              'shadow-xl',
              modal.classNames?.body
            )}
          >
            {modal?.title && (
              <ModalHeader
                className={cn(
                  'flex flex-col gap-1 px-6 py-4',
                  'text-gray-900 dark:text-white text-lg font-semibold',
                  'border-b border-gray-100 dark:border-gray-800',
                  modal.classNames?.header
                )}
              >
                {modal.title}
              </ModalHeader>
            )}
            <ModalBody
              className={cn(
                'overflow-auto pb-6 px-6 pt-4',
                'text-gray-700 dark:text-gray-200',
                modal.classNames?.body
              )}
            >
              {modal?.children}
            </ModalBody>
          </ModalContainer>
        </Modal>
      ))}
    </>
  )
}

export default MyModal
