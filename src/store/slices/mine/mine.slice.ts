import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ICoefficients, ICurrentMineGame, IStartMineGamePayload, IUpdateMineConfig, StateType } from './mine.slice.types'

export const CURRENT_MINE = 'mine_game'

const initialState: StateType = {
  mineConfig: {
    betAmount: '0.00',
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
  },
  currentGame: null,
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

    startMineGame: (state: StateType, action: PayloadAction<IStartMineGamePayload>) => {
      state.mineConfig.isStarted = true
      state.mineConfig.isGameOver = false // Reset game over state when starting a new game
      state.mineConfig.selectedBlocks = []
    },
    endMineGame: (state: StateType, action: PayloadAction<{ isWin: boolean }>) => {
      if (action.payload.isWin) {
        state.currentGame = initialState.currentGame
        state.mineConfig = initialState.mineConfig
        localStorage.removeItem(CURRENT_MINE)
      }
    },
    updateCurrentGame: (state: StateType, action: PayloadAction<ICurrentMineGame | null>) => {
      state.currentGame = action.payload
      if (action.payload) {
        localStorage.setItem(CURRENT_MINE, JSON.stringify(action.payload))
        state.mineConfig.betAmount = action.payload.initialBet.toString()
        state.mineConfig.rows = action.payload.rowsCount
        state.mineConfig.activeRow = action.payload.currentRow + 1
        state.mineConfig.isStarted = true
      } else {
        localStorage.removeItem(CURRENT_MINE)
      }
    },
  },
})

export const { updateMineConfig, startMineGame, endMineGame, updateCoefficients, updateCurrentGame } = mineSlice.actions

export default mineSlice.reducer
