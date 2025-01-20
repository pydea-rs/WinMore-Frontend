import { IMineGameStatuses, IMineModeVariants } from '@/store/slices/mine/mine.slice.types'
import { IAvailableTokens, IPaginationPayload } from '@/types/global.types'

export interface IGetGamesListPayload extends IPaginationPayload {
  status?: IMineGameStatuses
}

export interface IGameDetail {
  id: number
  userId: number
  createdAt: string
  updatedAt: string
  initialBet: number
  token: IAvailableTokens
  chainId: number
  mode: IMineModeVariants
  rowsCount: number
  currentRow: number
  stake: number
  nulls: number[]
  lastChoice: number
  status: IMineGameStatuses
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
