import { ICoefficients, IMineGameStatuses, IMineModeVariants } from '@/store/slices/mine/mine.slice.types'
import { IAvailableTokens } from '@/types/global.types'

export interface IMineGameDetail {
  betToken: IAvailableTokens
  createdAt: string
  currentRow: number
  golds: number[]
  finishedAt: null
  id: string
  initialBet: number
  mode: IMineModeVariants
  rowsCount: number
  stake: number
  startedAt: null
  status: IMineGameStatuses
  success: false
  updatedAt: string
  userId: number
}

export interface IGetMineRulesPayload {}
export interface IGetMineRulesResponse {
  coefficients: ICoefficients
  maxBetAmount: number | null
  maxRows: number
  minBetAmount: number
  minRows: number
}

export interface IPlaceMineBetPayload {
  betAmount: number
  mode: string
  rows: number
  token: string
  chainId: number
}

export interface IMineBlockPayload {
  id: string
  choice: number
}

export interface IMineBlockResponse extends IMineGameDetail {}

export interface IBackoffMineResponse {}
export interface IBackoffMinePayload {
  id: string
}

// is playing

export interface IIsPlayingMinePayload {}

// Mine Games List

export type IGetMineGamesListResponse = IMineGameDetail[]
export interface IGetMineGamesListPayload {
  status: IMineGameStatuses
}
