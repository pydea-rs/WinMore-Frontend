import { IAddress } from '../global.types'

export interface IGetMessagePayload {
  address: IAddress
}

export interface ISIWEMessage {
  address: IAddress
  nonce: string
  version: string
  statement: string
}

export interface IGetMessageResponse extends ISIWEMessage {}

// Login
export interface ILoginPayload {
  message: string
  signature: IAddress
}
export interface ILoginResponse {
  status: number
  token: string
}
