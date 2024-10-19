import { INetwork, IToken } from '@/types/global.types'

export interface ICurrencyState {
  token: IToken
  network: INetwork
  currentTokenBalance: number
}
