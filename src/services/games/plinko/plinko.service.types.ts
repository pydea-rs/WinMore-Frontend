import { IPaginationPayload } from '@/services/base/common.types'
import { IPlinkoStatus } from '@/store/slices/plinko/plinko.slice.types'
import { IAvailableTokens } from '@/types/global.types'
import { ExtraCommonGameStatus, IGameDifficultyVariants, IMultipliers } from '../common/games.types'
import { BucketsDataType, PegsDataType, PlinkoBallType, PlinkoGameBoardBoxType } from './physx.types'

export interface IDroppingPlinkoBall {
  gameId: number
  dropSpecs: PlinkoBallType
}

export interface IPlinkoBall extends IDroppingPlinkoBall {
  user?: {
    name: string
    id: number
  }
}

export interface ILandedPlinkoBall extends IPlinkoBall {
  bucketIndex: number
  scoredMultiplier: number
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
  profit?: number
}
export interface IPlinkoGame extends IPlinkoGameBase {
  user?: {
    name: string
    id: number
  }
  plinkoBalls?: IPlinkoBall[]
}

export interface IFinishedPlinkoGame extends IPlinkoGameBase {
  user: {
    name: string
    id: number
  }
  plinkoBalls?: ILandedPlinkoBall[]
}

export interface IPlinkoRules {
  multipliers: IMultipliers
  maxBetAmount: number | null
  minBetAmount: number
  verticalSpeedFactor: number
  horizontalSpeedFactor: number
  gravity: number
  friction: number
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

export interface IGetPlinkoGamesListPayload extends IPaginationPayload {
  status?: IPlinkoStatus | ExtraCommonGameStatus
}

export interface IMePlayingPlinkoGame extends IPlinkoGameBase {
  plinkoBalls: IDroppingPlinkoBall[]
}

export const expandPlinkoGameData = (games: IFinishedPlinkoGame[]) => {
  return games.map(({ plinkoBalls, ...game }) => ({
    ...game,
    initialBet: game.initialBet * game.ballsCount,
    multiplier: game.profit ?? null,
    betToken: game.token,
    name: 'Plinko',
  }))
}
