import { networks } from '@/constants/networks'
import { INetwork, IToken } from '@/types/global.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ICurrencyState } from './currency.slice.types'

const defaultNetwork: INetwork = networks[0] //Polygon
const defaultToken: IToken = networks[0].tokens[0] //USDT

const initialState: ICurrencyState = {
  network: defaultNetwork,
  token: defaultToken,
  currentTokenBalance: 0,
}

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    updateToken: (state: ICurrencyState, action: PayloadAction<{ token: IToken }>) => {
      state.token = action.payload.token
    },
    updateNetwork: (state: ICurrencyState, action: PayloadAction<{ network: INetwork }>) => {
      state.network = action.payload.network
    },
    updateCurrentTokenBalance: (state: ICurrencyState, action: PayloadAction<number>) => {
      state.currentTokenBalance = action.payload
    },
  },
})

export const { updateToken, updateNetwork, updateCurrentTokenBalance } = currencySlice.actions

export default currencySlice.reducer
