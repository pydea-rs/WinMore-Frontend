import { IMineGameStatus } from '@/store/slices/mine/mine.slice.types'
import { IAvailableTokens, IPaginationPayload } from '@/types/global.types'
import { ExtraCommonGameStatus, IGameDifficultyVariants, IMultipliers } from '../common/games.types'

export interface IMineGameDetail {
  betToken: IAvailableTokens
  createdAt: string
  chainId: number
  currentRow: number
  nulls: number[]
  finishedAt: null
  id: number
  initialBet: number
  mode: IGameDifficultyVariants
  rowsCount: number
  stake: number
  startedAt: null
  status: IMineGameStatus
  success?: boolean // FIXME: Separate /mine response type from DreamMineGame type
  updatedAt: string
  time: number
  multiplier: number
  user: {
    name: string
    id: number
  }

  userId: number
}

export interface IDreamMineRules {
  multipliers: IMultipliers
  maxBetAmount: number | null
  minBetAmount: number
  rows: number
}

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

export interface IGetMineGamesListPayload extends IPaginationPayload {
  status?: IMineGameStatus | ExtraCommonGameStatus
}
