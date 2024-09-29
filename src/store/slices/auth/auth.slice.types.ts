import { IAddress } from '@/types/global.types'

export interface IUser {
  id: number
  name: string | null
  avatar: string | null
  email: string | null
  wallet: IAddress
}

export interface AuthStateType {
  token: string | null
  user: IUser | null
}
