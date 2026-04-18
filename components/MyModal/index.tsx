// import { Modal, ModalBody, ModalContainer, ModalHeader } from '@heroui/react'

import { CloseIcon } from '../Icons/Functions/Close'
import MyButton from '../MyButton'

import useModal from '@/hooks/useModal'
import { cn } from '@/utils/tailwind'
import { Modal } from '@/zustand/modal'

const MyModal = () => {
  const { listModals, closeModal } = useModal()

  const onClick = (event: any, modal: Modal) => {
    if (event.target === event.currentTarget) {
      if (modal.overClickClose) {
        closeModal()
      }
    }
  }

  const getPosition = (modal: Modal) => {
    switch (modal.placement || 'center') {
      case 'center':
        return {
          alignItems: 'center',
          justifyContent: 'center',
        }

      case 'top-left':
        return {}

      case 'top-right':
        return { alignItems: 'end' }

      case 'bottom-left':
        return { justifyContent: 'end' }

      default:
        return { alignItems: 'end', justifyContent: 'end' }
    }
  }

  const getPositionBody = (modal: Modal) => {
    switch (modal.placement || 'center') {
      case 'center':
        return {}

      case 'top-left':
        return {
          top: 20,
          left: 20,
        }

      case 'top-right':
        return {
          top: 20,
          right: 20,
        }

      case 'bottom-left':
        return {
          bottom: 20,
          left: 20,
        }

      default:
        return { bottom: 20, right: 20 }
    }
  }

  return (
    <>
      {listModals.map((modal, index) => (
        <div
          key={`modal-${index}`}
          className={cn(
            'fixed z-9999 flex justify-center items-center flex-col inset-0 w-[100dvw] h-[100dvh] bg-black/20 ',
            modal?.classNames?.backdrop
          )}
          style={{
            backdropFilter: 'blur(5px)',
            ...getPosition(modal),
          }}
          onClick={(e) => onClick(e, modal)}
        >
          <div
            className={cn(
              'md:w-[500px] border border-gray-200 dark:border-gray-600 max-h-[calc(100dvh-100px)] w-[90dvw] animate-zoom  transition-all duration-500 relative flex flex-col justify-center items-center bg-white dark:bg-gray-900 rounded-2xl p-5',
              modal.classNames?.container
            )}
            style={getPositionBody(modal)}
          >
            {modal.showBtnClose && (
              <div className='absolute z-10 text-xl right-4 top-4 flex justify-end'>
                <MyButton
                  onClick={() => {
                    closeModal()
                    if (modal?.callBackAfter) {
                      modal?.callBackAfter()
                    }
                  }}
                  className={'p-0 min-h-auto h-6 hover:bg-transparent aspect-square rounded-full border-0'}
                  variant='outline'
                >
                  <CloseIcon className='cursor-pointer size-6 text-black dark:text-white' />
                </MyButton>
              </div>
            )}
            {modal.title && <div className='text-medium mb-2 dark:text-white font-bold w-full'>{modal.title}</div>}
            <div className='flex flex-1 w-full overflow-auto'>{modal.children}</div>
          </div>
        </div>
        // <Modal
        //   key={`modal-${index}`}
        //   {...modal}
        //   isOpen
        //   onOpenChange={(open) => {
        //     if (!open) closeModal()
        //   }}
        // >
        //   <Modal.Backdrop>
        //     <ModalContainer
        //       className={cn(
        //         'max-h-[calc(100vh-60px)] rounded-[6px]',
        //         'bg-white dark:bg-gray-900',
        //         'border border-gray-200 dark:border-gray-700',
        //         'shadow-xl',
        //         modal.classNames?.body
        //       )}
        //     >
        //       {modal?.title && (
        //         <ModalHeader
        //           className={cn(
        //             'flex flex-col gap-1 px-6 py-4',
        //             'text-gray-900 dark:text-white text-lg font-semibold',
        //             'border-b border-gray-100 dark:border-gray-800',
        //             modal.classNames?.header
        //           )}
        //         >
        //           {modal.title}
        //         </ModalHeader>
        //       )}
        //       <ModalBody className={cn('overflow-auto pb-6 px-6 pt-4', 'text-gray-700 dark:text-gray-200', modal.classNames?.body)}>
        //         {modal?.children}
        //       </ModalBody>
        //     </ModalContainer>
        //   </Modal.Backdrop>
        // </Modal>
      ))}
    </>
  )
}

export default MyModal
