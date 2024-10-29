import { INetwork, IToken } from '@/types/global.types'

export interface INetworkWithOutTokens extends Omit<INetwork, 'tokens'> {}

export interface ICurrencyState {
  token: IToken
  network: INetworkWithOutTokens
  currentTokenBalance: number
}
