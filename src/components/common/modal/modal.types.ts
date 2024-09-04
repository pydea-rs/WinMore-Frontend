import { ElementProps } from '@/types/elements.types'

export interface ModalProps extends ElementProps {
  isOpen: boolean
  onClose: () => void
}

export interface ModalHook extends ModalProps {}
