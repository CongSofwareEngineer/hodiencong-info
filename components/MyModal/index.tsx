import { CloseIcon } from '../Icons/Functions/Close'

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
            'fixed z-9999 flex justify-center items-center flex-col inset-0 w-[100dvw] h-[100dvh] bg-black/50',
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
              'modal-box md:w-[500px] max-w-none border border-base-content/10 max-h-[calc(100dvh-100px)] w-[90dvw] animate-zoom relative flex flex-col justify-center items-center p-5',
              modal.classNames?.container
            )}
            style={getPositionBody(modal)}
          >
            {modal.showBtnClose && (
              <div className='absolute z-10 text-xl right-4 top-4 flex justify-end'>
                <button
                  onClick={() => {
                    closeModal()
                    if (modal?.callBackAfter) {
                      modal?.callBackAfter()
                    }
                  }}
                  className={cn('btn btn-outline', 'p-0 min-h-auto h-6 hover:bg-transparent aspect-square rounded-full border-0')}
                  type='button'
                >
                  <CloseIcon className='cursor-pointer size-5' />
                </button>
              </div>
            )}
            {modal.title && <div className='text-medium mb-2 font-bold w-full'>{modal.title}</div>}
            <div className='flex flex-1 w-full overflow-auto'>{modal.children}</div>
          </div>
        </div>
      ))}
    </>
  )
}

export default MyModal
