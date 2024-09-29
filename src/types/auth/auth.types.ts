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
export interface IGetUserInfoPayload {}

export interface IGetUserInfoResponse {
  admin: boolean
  createdAt: string
  email: string | null
  id: number
  lastLoginAt: string
  name: string | null
  updatedAt: string
  profile: {
    avatar: string | null
    createdAt: string
    id: number
    updatedAt: string
    userId: number
  }
  wallet: { address: IAddress; createdAt: string; id: number; ownerId: number; updatedAt: string }
}

// Login
export interface ILoginPayload {
  message: string
  signature: IAddress
}
export interface ILoginResponse {
  status: number
  token: string
}
