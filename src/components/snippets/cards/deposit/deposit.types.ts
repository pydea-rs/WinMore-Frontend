export interface DepositCardProps {
  isOpenModal: boolean
  onCloseModal: () => void
  onComplete?: () => void
}

export interface DepositForm {
  amount: string
}
