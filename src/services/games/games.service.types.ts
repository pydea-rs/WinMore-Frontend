import { IMineGameStatus } from '@/store/slices/mine/mine.slice.types'
import { IAvailableTokens, IPaginationPayload } from '@/types/global.types'
import { IGameDifficultyVariants } from './common/games.types'

export interface IGetGamesListPayload extends IPaginationPayload {
  status?: IMineGameStatus
}

export interface IGameDetail {
  id: number
  userId: number
  createdAt: string
  updatedAt: string
  initialBet: number
  token: IAvailableTokens
  chainId: number
  mode: IGameDifficultyVariants
  rowsCount: number
  currentRow: number
  stake: number
  nulls: number[]
  lastChoice: number
  status: IMineGameStatus
  finishedAt: string
  user: {
    name: null
    id: number
  }
  multiplier: number
  time: number
  name: string
}

export type IGetGamesListResponse = IGameDetail[]
