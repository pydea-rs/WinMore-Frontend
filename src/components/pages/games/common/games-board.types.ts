import { BaseResponse } from '@/services/base/request-interface'
import { IGameDifficultyVariants, IGamesListResponse } from '@/services/games/common/games.types'
import { expandPlinkoGameData, IFinishedPlinkoGame } from '@/services/games/plinko/plinko.service.types'
import { IMineGameStatus } from '@/store/slices/mine/mine.slice.types'

import { IPlinkoStatus } from '@/store/slices/plinko/plinko.slice.types'
import { IAvailableTokens } from '@/types/global.types'

export interface IGameBoardRow {
  id: number
  name?: string | null
  multiplier: number | null
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

export const combineGames = (
  { plinkos, dreamMines }: IGamesListResponse,
  { sort = 'date', isDescending = true, take = 10 }: { sort?: 'date' | 'lucky'; isDescending?: boolean; take?: number } = {},
) => {
  let sign = isDescending ? 1 : -1
  return [...(expandPlinkoGameData(plinkos as IFinishedPlinkoGame[]) as IGameBoardRow[]), ...dreamMines.map((x) => ({ ...x, name: 'Dream Mine' }) as IGameBoardRow)]
    .sort(
      sort === 'lucky'
        ? (g1, g2) => sign * ((g2.multiplier ?? 0) - (g1.multiplier ?? 0))
        : (g1, g2) => sign * (new Date(g2.createdAt).getTime() - new Date(g1.createdAt).getTime()),
    )
    .slice(0, take)
}
