export type ExtraCommonGameStatus = 'GAINED' | 'FINISHED' | 'ALL'

export type IGameDifficultyVariants = 'EASY' | 'MEDIUM' | 'HARD'

export interface IGameDifficultyMode {
  label: IGameDifficultyVariants
  value: number
  multipliers: number[]
}

export interface IMultipliers {
  easy: number[]
  hard: number[]
  medium: number[]
}
