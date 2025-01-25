import { IAddress } from '../global.types'

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
// Register User

export interface IRegisterUserPayload {
  name: string
  email: string
}
export interface IRegisterUserResponse {}
export interface IEditUserProfilePayload {
  name?: string
  email?: string
}
export interface IEditUserProfileResponse {
  admin: boolean
  createdAt: string
  email: string | null
  id: number
  lastLoginAt: string
  name: string | null
  updatedAt: string
}

// Get User Current Balance
export type IGetUserBalanceResponse = number
export interface IGetUserCurrentBalancePayload {
  token: string
  chain: number
}
