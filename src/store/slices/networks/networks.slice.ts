import { networks } from '@/constants/networks'
import { IUserWalletResponse } from '@/services/user/user.service.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { INetworksState } from './networks.slice.types'
const initialState: INetworksState = {
  networks,
}

export const networksSlice = createSlice({
  name: 'networks',
  initialState,
  reducers: {
    setBalances: (state: INetworksState, action: PayloadAction<IUserWalletResponse>) => {
      const updatedNetworks = state.networks.map((network) => {
        const chainBalances = action.payload[network.chainId]

        // Only update if there is data for this chain ID
        if (chainBalances) {
          const updatedTokens = network.tokens.map((token) => ({
            ...token,
            balance: chainBalances[token.symbol as keyof typeof chainBalances] || token.balance,
          }))
          return { ...network, tokens: updatedTokens }
        }

        return network
      })
      state.networks = updatedNetworks
    },
  },
})

export const { setBalances } = networksSlice.actions

export default networksSlice.reducer
