import { networks } from '@/configs/networks'
import { INetwork, IToken } from '@/types/global.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ICurrencyState, INetworkWithOutTokens } from './currency.slice.types'

const defaultNetwork: INetwork = networks[0] //Polygon
const defaultToken: IToken = networks[0].tokens[0] //USDT

const initialState: ICurrencyState = {
  network: {
    chainId: defaultNetwork.chainId,
    name: defaultNetwork.name,
    rpcUrl: defaultNetwork.rpcUrl,
    icon: defaultNetwork.icon,
  },
  token: defaultToken,
  currentTokenBalance: 0,
  connectorName: undefined,
}

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    updateToken: (state: ICurrencyState, action: PayloadAction<{ token: IToken }>) => {
      state.token = action.payload.token
    },
    updateNetwork: (state: ICurrencyState, action: PayloadAction<{ network: INetwork }>) => {
      const newNetwork: INetworkWithOutTokens = {
        chainId: action.payload.network.chainId,
        name: action.payload.network.name,
        rpcUrl: action.payload.network.rpcUrl,
        icon: action.payload.network.icon,
      }
      state.network = newNetwork
    },
    updateCurrentTokenBalance: (state: ICurrencyState, action: PayloadAction<number>) => {
      state.currentTokenBalance = action.payload
    },
    setWalletConnectorName: (state: ICurrencyState, action: PayloadAction<string>) => {
      state.connectorName = action.payload
    },
  },
})

export const { updateToken, updateNetwork, updateCurrentTokenBalance, setWalletConnectorName } = currencySlice.actions

export default currencySlice.reducer
