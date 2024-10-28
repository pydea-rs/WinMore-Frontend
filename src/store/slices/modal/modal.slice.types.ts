import { Nullable } from '@/types/global.types'

interface IModals {
  login: boolean
  selectCoin: boolean
  deposit: boolean
  withdraw: {
    open: boolean
    data: Nullable<{
      token: string
      chainId: number
      balance: number
    }>
  }
}

export interface StateType {
  modals: IModals
}
export interface ITriggerWithdrawModalPayload {
  trigger: boolean
  data: Nullable<{
    token: string
    chainId: number
    balance: number
  }>
}
export interface ITriggerModalPayload {
  modal: keyof IModals
  trigger: boolean
}
