import { IAvailableTokens, Nullable } from '@/types/global.types'

export type IMineGameStatuses = 'ONGOING' | 'LOST'

export type IMineModeVariants = 'EASY' | 'MEDIUM' | 'HARD'

export interface IMineMode {
  label: IMineModeVariants
  value: number
  coefficient: number[]
}
interface IMineGame {
  mode: IMineMode
  rows: number
  betAmount: string
  isStarted: boolean
  isGameOver: boolean
  coefficients: number[]
  selectedBlocks: {
    index: number
    row: number
  }[]
  activeRow: number
  currentGameId: Nullable<string>
  stake: Nullable<number>
  currentGameStatus: Nullable<IMineGameStatuses>
}

export interface ICoefficients {
  easy: number[]
  hard: number[]
  medium: number[]
}
export interface ICurrentMineGame {
  betToken: IAvailableTokens
  createdAt: string
  currentRow: number
  finishedAt: string
  id: string
  initialBet: number
  mode: IMineModeVariants
  rowsCount: number
  stake: number
  startedAt: string
  status: IMineGameStatuses
  updatedAt: string
  userId: number
}
export interface StateType {
  mineConfig: IMineGame
}
export interface IUpdateMineConfig extends Partial<IMineGame> {}
export interface IStartMineGamePayload {}
export interface IClickOnBlockPayload {
  blockIndex: number
}
