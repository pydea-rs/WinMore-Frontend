import { IGameDifficultyMode, IMultipliers } from '@/services/games/common/games.types'
import { Nullable } from '@/types/global.types'

export type IPlinkoStatus = 'NOT_DROPPED_YET' | 'DROPPING' | 'FINISHED'

interface IPlinko {
  mode: IGameDifficultyMode
  numberOfBets: number
  rows: number
  betAmount: string
  multipliers: IMultipliers
  currentGameId: Nullable<string>
  prize: Nullable<number>
  currentGameStatus: Nullable<IPlinkoStatus>
}
export interface StateType {
  plinkoConfig: IPlinko
}
export interface IUpdatePlinkoConfig extends Partial<IPlinko> {}
