import { IGameDifficultyMode, IGameDifficultyVariants } from '@/services/games/common/games.types'
import { PlinkoBallType } from '@/services/games/plinko/physx.types'
import { IPlinkoRules } from '@/services/games/plinko/plinko.service.types'
import { Nullable } from '@/types/global.types'

export type IPlinkoStatus = 'NOT_DROPPED_YET' | 'DROPPING' | 'FINISHED'

export interface IPlayingPlinkoGame {
  id: number
  status: IPlinkoStatus
  balls: PlinkoBallType[]
  droppedCount: number
  prize: Nullable<number>
  rows: number
  mode: IGameDifficultyVariants
}

export interface IPlinkoState {
  mode: IGameDifficultyMode
  numberOfBets: number
  rows: number
  betAmount: string
  rules: Nullable<IPlinkoRules>
  playing: Nullable<IPlayingPlinkoGame>
  autoplay?: boolean
}
export interface StateType {
  plinkoConfig: IPlinkoState
}

export interface IUpdatePlinkoConfig extends Partial<IPlinkoState> {}
