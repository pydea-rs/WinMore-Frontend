import { IPlinkoStatus } from '@/store/slices/plinko/plinko.slice.types'
import { IAvailableTokens, IPaginationPayload } from '@/types/global.types'
import { ExtraCommonGameStatus, IGameDifficultyVariants, IMultipliers } from '../common/games.types'
import { BucketsDataType, PegsDataType, PlinkoBallType } from './physx.types'

export interface IPlinkoBall {
  id: number
  createdAt: Date
  updatedAt: Date
  userId: number
  user?: {
    name: string
    id: number
  }
  gameId: number
  dropSpecs: PlinkoBallType
}

export interface IPlinkoGame {
  id: number
  createdAt: Date
  updatedAt: Date
  userId: number
  user: {
    name: string
    id: number
  }

  initialBet: number
  token: IAvailableTokens
  chainId: number
  mode: IGameDifficultyVariants
  ballsCount: number
  rowsCount: number
  prize: number
  status: IPlinkoStatus
  finishedAt?: Date
  plinkoBalls?: IPlinkoBall[]
}

export interface IPlinkoRules {
  multipliers: IMultipliers
  maxBetAmount: number | null
  minBetAmount: number
  rows: number
  board: {
    height: number
    width: number
  }
  pegs: PegsDataType
  buckets: BucketsDataType
}

export interface IPlacePlinkoBetPayload {
  betAmount: number
  mode: string
  rows: number
  token: IAvailableTokens
  chainId: number
  ballsCount?: number
}

// Mine Games List
export type IGetPlinkoGamesListResponse = IPlinkoGame[]
export interface IGetPlinkoGamesListPayload extends IPaginationPayload {
  status?: IPlinkoStatus | ExtraCommonGameStatus
}
