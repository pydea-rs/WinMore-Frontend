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
  plinkoBalls: ILandedPlinkoBall[]
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

// export const expandPlinkoGameData = (games: IFinishedPlinkoGame[]) => {
//   const gameList: IGameBoardRow[] = []
//   for (const { plinkoBalls, ...game } of games) {
//     if (plinkoBalls?.length) {
//       for (const ball of plinkoBalls) {
//         gameList.push({
//           ...game,
//           multiplier: ball.scoredMultiplier,
//           betToken: game.token,
//         })
//       }
//     } else {
//       gameList.push({
//         ...game,
//         multiplier: '?',
//         betToken: game.token,
//       })
//     }
//   }

//   return gameList
// }
export const expandPlinkoGameData = (games: IFinishedPlinkoGame[]) => {
  return games.map(({ plinkoBalls, ...game }) => ({
    ...game,
    multiplier: plinkoBalls?.length ? Math.max(...plinkoBalls.map((item) => item.scoredMultiplier)) : '?',
    betToken: game.token,
  }))
}
