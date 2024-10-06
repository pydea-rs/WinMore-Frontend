interface IModals {
  login: boolean
  selectCoin: boolean
  deposit: boolean
  withdraw: boolean
}

export interface StateType {
  modals: IModals
}
export interface ITriggerModalPayload {
  modal: keyof IModals
  trigger: boolean
}
