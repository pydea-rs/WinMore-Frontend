export interface AccountForm {
  name: string
  email: string
  confirm: boolean
}

export interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
}
