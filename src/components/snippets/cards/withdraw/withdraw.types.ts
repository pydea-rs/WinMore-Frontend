export interface WithdrawCardProps {
  isOpenModal: boolean
  onCloseModal: () => void
  onComplete?: () => void
}

export interface WithdrawForm {
  // coin: string
  chain: number
  amount: string
  // gas_level: string
}
