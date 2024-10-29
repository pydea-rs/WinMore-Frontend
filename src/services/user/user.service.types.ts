import { IAvailableTokens, IPaginationPayload } from '@/types/global.types'
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
export interface IUserTransactionHistoryPayload extends IPaginationPayload {}
export interface IUserTransactionHistoryResponse {}
