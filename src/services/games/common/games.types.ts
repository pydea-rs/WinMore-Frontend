import { IMineGameStatus } from '@/store/slices/mine/mine.slice.types'
import { IPaginationPayload } from '@/types/global.types'
import { IMineGameDetail } from '../mine/mine.service.types'
import { IPlinkoGame } from '../plinko/plinko.service.types'

export type ExtraCommonGameStatus = 'GAINED' | 'FINISHED' | 'ALL'

export type IGameDifficultyVariants = 'EASY' | 'MEDIUM' | 'HARD'

export type GeneralGameStatusType = IMineGameStatus | ExtraCommonGameStatus
export interface IGetGamesListPayload extends IPaginationPayload {
  status?: GeneralGameStatusType
}

export interface IMyPlayingGamesListResponse {
  plinko?: IPlinkoGame
  dreamMine?: IMineGameDetail
}
export interface IGamesListResponse {
  plinkos: IPlinkoGame[]
  dreamMines: IMineGameDetail[]
}

export interface IGameDifficultyMode {
  label: IGameDifficultyVariants
  value: number
}

export interface IGameMode extends IGameDifficultyMode {
  multipliers: number[]
}

export interface IMultipliers {
  EASY: number[]
  MEDIUM: number[]
  HARD: number[]
}
