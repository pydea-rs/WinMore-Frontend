import { IPlinkoStatus } from '@/store/slices/plinko/plinko.slice.types'
import { IAvailableTokens, IPaginationPayload } from '@/types/global.types'
import { ExtraCommonGameStatus, IGameDifficultyVariants, IMultipliers } from '../common/games.types'
import { BucketsDataType, PegsDataType, PlinkoBallType, PlinkoGameBoardBoxType } from './physx.types'

export interface IDroppingPlinkoBall {
  id: number
  gameId: number
  dropSpecs: PlinkoBallType
}

export interface IPlinkoBall extends IDroppingPlinkoBall {
  createdAt: Date
  updatedAt: Date
  userId: number
  user?: {
    name: string
    id: number
  }
}

export interface IPlinkoGameBase {
  id: number
  createdAt: Date
  updatedAt: Date
  userId: number
  initialBet: number
  token: IAvailableTokens
  chainId: number
  mode: IGameDifficultyVariants
  ballsCount: number
  rowsCount: number
  prize: number
  status: IPlinkoStatus
  finishedAt?: Date
}
export interface IPlinkoGame extends IPlinkoGameBase {
  user?: {
    name: string
    id: number
  }
  plinkoBalls?: IPlinkoBall[]
}

export interface IPlinkoRules {
  multipliers: IMultipliers
  maxBetAmount: number | null
  minBetAmount: number
  rows: number
  board: PlinkoGameBoardBoxType
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

export interface IMePlayingPlinkoGame extends IPlinkoGameBase {
  plinkoBalls: IDroppingPlinkoBall[]
}
