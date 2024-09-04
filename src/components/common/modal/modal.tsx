import { BaseProps } from '@/types/global.types'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { useModalHook } from './modal.hook'
import { ModalProps } from './modal.types'

const Modal: BaseProps<ModalProps> = (props) => {
  const { children, isOpen, onClose } = props
  const baseClass = 'modal'
  const mergedAttrs = useModalHook(baseClass, props)

  return (
    <Dialog {...mergedAttrs} open={isOpen} as="div" onClose={onClose}>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <DialogBackdrop className="fixed inset-0 bg-dark bg-opacity-60 filter-backdrop" />
        <div className="flex flex-col items-center justify-end xl:justify-center min-h-full w-full p-4">
          <DialogPanel transition className="duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default Modal
