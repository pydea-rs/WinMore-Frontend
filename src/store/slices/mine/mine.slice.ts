import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ICoefficients, IUpdateMineConfig, StateType } from './mine.slice.types'

export const CURRENT_MINE = 'mine_game'

const initialState: StateType = {
  mineConfig: {
    betAmount: '',
    mode: {
      coefficient: [],
      label: 'EASY',
      value: 4,
    },
    rows: 8,
    activeRow: 1,
    coefficients: [],
    selectedBlocks: [],
    isStarted: false,
    isGameOver: false,
    currentGameId: null,
    currentGameStatus: null,
    stake: null,
  },
}

export const mineSlice = createSlice({
  name: 'mine',
  initialState,
  reducers: {
    updateMineConfig: (state: StateType, action: PayloadAction<IUpdateMineConfig>) => {
      state.mineConfig = { ...state.mineConfig, ...action.payload }
    },
    updateCoefficients: (state: StateType, action: PayloadAction<ICoefficients>) => {
      if (state.mineConfig.mode.label === 'EASY') {
        state.mineConfig.coefficients = action.payload.easy
      }
      if (state.mineConfig.mode.label === 'MEDIUM') {
        state.mineConfig.coefficients = action.payload.medium
      }
      if (state.mineConfig.mode.label === 'HARD') {
        state.mineConfig.coefficients = action.payload.hard
      }
    },

    startMineGame: (state: StateType) => {
      state.mineConfig.isStarted = true
      state.mineConfig.isGameOver = false // Reset game over state when starting a new game
      state.mineConfig.selectedBlocks = initialState.mineConfig.selectedBlocks
      state.mineConfig.activeRow = 1
    },
    endMineGame: (state: StateType, action: PayloadAction<{ isWin: boolean }>) => {
      if (action.payload.isWin) {
        // state.mineConfig.isGameOver = true // Reset game over state when starting a new game
        state.mineConfig = initialState.mineConfig
      } else {
        state.mineConfig.isGameOver = true // Reset game over state when starting a new game
      }
      // state.mineConfig.isStarted = false

      // state.mineConfig = initialState.mineConfig
    },
  },
})

export const { updateMineConfig, startMineGame, endMineGame, updateCoefficients } = mineSlice.actions

export default mineSlice.reducer
