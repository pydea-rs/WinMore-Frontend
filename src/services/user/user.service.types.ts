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
