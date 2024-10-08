import { networks } from '@/constants/networks'
import { INetwork, IToken } from '@/types/global.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ICurrencyState } from './currency.slice.types'

const defaultNetwork: INetwork = networks[0] //Polygon
const defaultToken: IToken = networks[0].tokens[0] //USDT

const initialState: ICurrencyState = {
  network: defaultNetwork,
  token: defaultToken,
}

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    updateToken: (state: ICurrencyState, action: PayloadAction<Omit<ICurrencyState, 'network'>>) => {
      state.token = action.payload.token
    },
    updateNetwork: (state: ICurrencyState, action: PayloadAction<Omit<ICurrencyState, 'token'>>) => {
      state.network = action.payload.network
    },
  },
})

export const { updateToken, updateNetwork } = currencySlice.actions

export default currencySlice.reducer
