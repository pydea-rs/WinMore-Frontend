import { IAvailableTokens, Nullable } from '@/types/global.types'

export type IPlinkoStatus = 'NOT_DROPPED_YET' | 'DROPPING' | 'FINISHED'
export type IPlinkoModeVariants = 'EASY' | 'MEDIUM' | 'HARD'

export interface IPlinkoMode {
  label: IPlinkoModeVariants
  value: number
  multipliers: number[]
} // FIXME: Some interfaces dont need redeclaring for each game such as this mode, IMultipliers(ICoefficients), etc
interface IPlinko {
  mode: IPlinkoMode
  numberOfBets: number
  rows: number
  betAmount: string
  multipliers: IMultipliers
  currentGameId: Nullable<string>
  prize: Nullable<number>
  currentGameStatus: Nullable<IPlinkoStatus>
}

export interface IMultipliers {
  easy: number[]
  hard: number[]
  medium: number[]
}
export interface ICurrentPlinkoGame {
  betToken: IAvailableTokens
  createdAt: string
  finishedAt: string
  id: string
  initialBet: number
  mode: IPlinkoModeVariants
  rowsCount: number
  stake: number
  startedAt: string
  status: IPlinkoStatus
  updatedAt: string
  userId: number
}
export interface StateType {
  plinkoConfig: IPlinko
}
export interface IUpdatePlinkoConfig extends Partial<IPlinko> {}
export interface IStartPlinkoGamePayload {}
