import { ICoefficients } from '@/store/slices/mine/mine.slice.types'

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
