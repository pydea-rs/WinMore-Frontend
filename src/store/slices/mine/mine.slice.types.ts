import { IGameDifficultyVariants, IGameMode, IMultipliers } from '@/services/games/common/games.types'
import { IAvailableTokens, Nullable } from '@/types/global.types'

export type IMineGameStatus = 'NOT_STARTED' | 'ONGOING' | 'LOST' | 'WITHDRAWN' | 'WON'

export interface IBlock {
  index: number
  row: number
  status: 'GOLD' | 'NULL'
}
interface IMineGame {
  mode: IGameMode
  rows: number
  betAmount: string
  isStarted: boolean
  isGameOver: boolean
  multipliers: IMultipliers
  selectedBlocks: IBlock[]
  activeRow: number
  currentGameId: Nullable<number>
  stake: Nullable<number>
  currentGameStatus: Nullable<IMineGameStatus>
}

export interface ICurrentMineGame {
  betToken: IAvailableTokens
  createdAt: string
  currentRow: number
  finishedAt: string
  id: number
  initialBet: number
  mode: IGameDifficultyVariants
  rowsCount: number
  stake: number
  startedAt: string
  status: IMineGameStatus
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
