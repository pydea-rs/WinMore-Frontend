import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUpdateMineConfig, StateType } from './games.slice.types'

const initialState: StateType = {
  mineConfig: {
    betAmount: '0.00',
    mode: 'easy',
    numberOfBets: 0,
    rows: 5,
  },
}

export const gamesSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    updateMineConfig: (state: StateType, action: PayloadAction<IUpdateMineConfig>) => {
      state.mineConfig = { ...state.mineConfig, ...action.payload }
    },
  },
})

export const { updateMineConfig } = gamesSlice.actions

export default gamesSlice.reducer
