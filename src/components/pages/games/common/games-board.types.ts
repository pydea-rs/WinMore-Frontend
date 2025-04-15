import { BaseResponse } from '@/services/base/request-interface'
import { IGameDifficultyVariants } from '@/services/games/common/games.types'
import { IMineGameStatus } from '@/store/slices/mine/mine.slice.types'
import { IPlinkoStatus } from '@/store/slices/plinko/plinko.slice.types'
import { IAvailableTokens } from '@/types/global.types'

export interface IGameBoardRow {
  id: number
  multiplier: number | string
  userId: number
  user: {
    name: string
    id: number
  }
  betToken: IAvailableTokens
  createdAt: Date
  updatedAt: Date
  chainId: number
  finishedAt?: Date
  initialBet: number
  mode: IGameDifficultyVariants
  rowsCount: number
  status: IMineGameStatus | IPlinkoStatus
}
export interface IGamesBoardProps {
  data: BaseResponse<IGameBoardRow[]> | undefined
}
