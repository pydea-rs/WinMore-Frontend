export interface CompleteUserDataProps {
  isOpenModal: boolean
  onCloseModal: () => void
  onComplete?: () => void
}
export interface UserForm {
  name: string
  email: string
  referrerCode: string
  confirm: boolean
  isOpen: boolean
  onClose: () => void
}
