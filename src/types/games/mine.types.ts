import { ICoefficients, IMineGameStatuses, IMineModeVariants } from '@/store/slices/mine/mine.slice.types'
import { IAvailableTokens } from '../global.types'

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
}

export interface IMineBlockPayload {
  id: string
}

export interface IMineBlockResponse {
  betToken: IAvailableTokens
  createdAt: string
  currentRow: number
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

export interface IBackoffMineResponse {}
export interface IBackoffMinePayload {
  id: string
}
