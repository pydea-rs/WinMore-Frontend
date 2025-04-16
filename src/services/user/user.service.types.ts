import { IAddress, IAvailableTokens, Nullable } from '@/types/global.types'
import { IPaginationPayload } from '../base/common.types'
import { IMineGameDetail } from '../games/mine/mine.service.types'
import { IMePlayingPlinkoGame } from '../games/plinko/plinko.service.types'

export interface IIsUserPlayingResponse {
  dreamMine: IMineGameDetail | null
  plinko: IMePlayingPlinkoGame | null
}

export interface IIsUserPlayingPayload {}

//withdraw
export interface IWithdrawPayload {
  chain: number
  token: string
  amount: number
}

export interface IWithdrawResponse {
  ok: boolean
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
  log: Nullable<{
    block: {
      hash: string
      number: string
      status: string
    }
    from: string
    successful: boolean
    to: string
    trxHash: string
    trxIndex: string
  }>
  source: {
    id: number
    address: IAddress
    owner: {
      id: number
      name: string
    }
  }
  status: 'PENDING' | 'FAILED' | 'REVERTED' | 'SUCCESSFUL'
  token: IAvailableTokens
  type: 'INGAME' | 'WITHDRAWAL' | 'DEPOSIT'
  updatedAt: string
}

export interface IUserTransactionHistoryPayload extends IPaginationPayload {}
export type IUserTransactionHistoryResponse = ITransaction[]
