import { ICoefficients, IMineGameStatuses, IMineModeVariants } from '@/store/slices/mine/mine.slice.types'
import { IAvailableTokens, IPaginationPayload } from '@/types/global.types'

export interface IMineGameDetail {
  betToken: IAvailableTokens
  createdAt: string
  chainId: number
  currentRow: number
  nulls: number[]
  finishedAt: null
  id: number
  initialBet: number
  mode: IMineModeVariants
  rowsCount: number
  stake: number
  startedAt: null
  status: IMineGameStatuses
  success: false
  updatedAt: string
  time: number
  multiplier: number
  user: {
    name: string
    id: number
  }

  userId: number
}

export interface IGetMineRulesPayload {}
export interface IRowsBasedCoefficients {
  coefficients: ICoefficients
  maxBetAmount: number | null
  minBetAmount: number
  rows: number
}

export type IGetMineRulesResponse = IRowsBasedCoefficients[]
export interface IPlaceMineBetPayload {
  betAmount: number
  mode: string
  rows: number
  token: string
  chainId: number
}

export interface IMineBlockPayload {
  id: number
  choice: number
}

export interface IMineBlockResponse extends IMineGameDetail {}

export interface IBackoffMineResponse {}
export interface IBackoffMinePayload {
  id: number
}

// Mine Games List

export type IGetMineGamesListResponse = IMineGameDetail[]
export interface IGetMineGamesListPayload extends IPaginationPayload {
  status?: IMineGameStatuses
}
