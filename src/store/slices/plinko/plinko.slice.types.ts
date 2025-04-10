import { IGameDifficultyMode, IMultipliers } from '@/services/games/common/games.types'
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
}

export interface IPlinkoState {
  mode: IGameDifficultyMode
  numberOfBets: number
  rows: number
  betAmount: string
  multipliers: IMultipliers
  rules: Nullable<IPlinkoRules>
  playing: Nullable<IPlayingPlinkoGame>
}
export interface StateType {
  plinkoConfig: IPlinkoState
}

export interface IUpdatePlinkoConfig extends Partial<IPlinkoState> {}
