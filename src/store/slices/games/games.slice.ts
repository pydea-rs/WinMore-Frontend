import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IStartMineGamePayload, IUpdateMineConfig, StateType } from './games.slice.types'

const initialState: StateType = {
  mineConfig: {
    betAmount: '0.00',
    mode: 4,
    numberOfBets: 0,
    rows: 5,
    activeRow: 1,
    selectedBlocks: [],
    isStarted: false,
    isGameOver: false,
  },
}

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    updateMineConfig: (state: StateType, action: PayloadAction<IUpdateMineConfig>) => {
      state.mineConfig = { ...state.mineConfig, ...action.payload }
    },

    startMineGame: (state: StateType, action: PayloadAction<IStartMineGamePayload>) => {
      state.mineConfig.isStarted = true
      state.mineConfig.isGameOver = false // Reset game over state when starting a new game
      state.mineConfig.selectedBlocks = []
    },
    endMineGame: (state: StateType, action: PayloadAction<{ isWin: boolean }>) => {
      state.mineConfig.isStarted = false
      state.mineConfig.isGameOver = true // Set game over state to true
      // You can handle win/lose-specific logic here, if needed
    },
  },
})

export const { updateMineConfig, startMineGame, endMineGame } = gamesSlice.actions

export default gamesSlice.reducer
