import { IProfile } from '@/types/auth/user.types'
import { IAddress } from '@/types/global.types'

export interface IUser {
  id: number
  name: string | null
  profile: IProfile
  email: string | null
  wallet: IAddress
}

export interface AuthStateType {
  token: string | null
  user: IUser | null
}
