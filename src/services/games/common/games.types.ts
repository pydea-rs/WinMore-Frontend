export type ExtraCommonGameStatus = 'GAINED' | 'FINISHED' | 'ALL'

export type IGameDifficultyVariants = 'EASY' | 'MEDIUM' | 'HARD'

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

export const DREAM_MINE_ROCKS_COUNT: Record<IGameDifficultyVariants, number> = {
  EASY: 4,
  MEDIUM: 3,
  HARD: 2,
}
