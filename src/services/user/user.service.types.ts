import { IAddress, IAvailableTokens, IPaginationPayload } from '@/types/global.types'
import { IMineGameDetail } from '../games/mine/mine.service.types'

export interface IIsUserPlayingResponse {
  dreamMine: IMineGameDetail | null
}

export interface IIsUserPlayingPayload {}

//withdraw
export interface IWithdrawPayload {
  chain: number
  token: string
  amount: number
}

export interface IWithdrawResponse {
  trxHash: string
}

type TokenBalances = {
  [key in IAvailableTokens]?: number
}
// User Wallet
export interface IUserWalletPayload {}
export interface IUserWalletResponse {
  [chainId: number]: TokenBalances
}

// User Transaction History
export interface ITransaction {
  amount: number
  chain: {
    id: number
    name: string
  }
  createdAt: string
  destination: {
    id: number
    address: IAddress
    owner: {
      id: number
      name: string
    }
  }
  id: string
  remarks: {
    toUser: number
    wallet: IAddress
    fromUser: number
    description: string
  }
  source: {
    id: number
    address: IAddress
    owner: {
      id: number
      name: string
    }
  }
  trx: string
  status: string
  token: IAvailableTokens
  type: string
  updatedAt: string
}

export interface IUserTransactionHistoryPayload extends IPaginationPayload {}
export type IUserTransactionHistoryResponse = ITransaction[]
