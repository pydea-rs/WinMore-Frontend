import { IAvailableTokens, Nullable } from '@/types/global.types'

export type IPlinkoStatus = 'NOT_STARTED' | 'LOST' | 'WON' | 'ONGOING'
export type IPlinkoModeVariants = 'EASY' | 'MEDIUM' | 'HARD'

export interface IPlinkoMode {
  label: IPlinkoModeVariants
  value: number
  multipliers: number[]
}

export interface IBlock {
  index: number
  row: number
  status: 'GOLD' | 'NULL'
}
interface IPlinko {
  mode: IPlinkoMode
  numberOfBets: number
  rows: number
  betAmount: string
  isStarted: boolean
  multipliers: ICoefficients
  currentGameId: Nullable<string>
  stake: Nullable<number>
  currentGameStatus: Nullable<IPlinkoStatus>
  ballPath: number[]
}

export interface ICoefficients {
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
