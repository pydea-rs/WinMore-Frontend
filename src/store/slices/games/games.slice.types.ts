interface IMineGame {
  mode: 'easy' | 'medium' | 'hard'
  rows: number
  betAmount: string
  numberOfBets: number
  isStarted: boolean
  isGameOver: boolean
  mines: number[]
  selectedBlocks: number[]
}

export interface StateType {
  mineConfig: IMineGame
}
export interface IUpdateMineConfig extends Partial<IMineGame> {}
export interface IStartMineGamePayload {}
export interface IClickOnBlockPayload {
  blockIndex: number
}
