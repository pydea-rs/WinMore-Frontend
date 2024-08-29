interface IMineGame {
  mode: 4 | 3 | 2
  rows: number
  betAmount: string
  numberOfBets: number
  isStarted: boolean
  isGameOver: boolean
  selectedBlocks: {
    index: number
    row: number
  }[]
  activeRow: number
}

export interface StateType {
  mineConfig: IMineGame
}
export interface IUpdateMineConfig extends Partial<IMineGame> {}
export interface IStartMineGamePayload {}
export interface IClickOnBlockPayload {
  blockIndex: number
}
