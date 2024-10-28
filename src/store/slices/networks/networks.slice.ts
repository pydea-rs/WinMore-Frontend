import { networks } from '@/constants/networks'
import { createSlice } from '@reduxjs/toolkit'
import { INetworksState } from './networks.slice.types'
const initialState: INetworksState = {
  networks,
}

export const networksSlice = createSlice({
  name: 'networks',
  initialState,
  reducers: {
    // updateNetwork: (state: INetworksState, action: PayloadAction<{ network: INetwork }>) => {
    //   state.network = action.payload.network
    // },
  },
})

export const {} = networksSlice.actions

export default networksSlice.reducer
