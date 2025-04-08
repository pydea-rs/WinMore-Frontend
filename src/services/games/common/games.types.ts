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
