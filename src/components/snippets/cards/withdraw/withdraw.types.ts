export interface WithdrawCardProps {
  isOpenModal: boolean
  onCloseModal: () => void
  onComplete?: () => void
}

export interface WithdrawForm {
  coin: string
  chain: string
  wallet: string
  gas_level: string
}
