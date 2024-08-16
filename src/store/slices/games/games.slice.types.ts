interface IMineGame {
  mode: 'easy' | 'medium' | 'hard'
  rows: number
  betAmount: string
  numberOfBets: number
}

export interface StateType {
  mineConfig: IMineGame
}
export interface IUpdateMineConfig extends Partial<IMineGame> {}
