import { IGetMineRulesResponse } from '@/services/games/mine/mine.service.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IMineModeVariants, IUpdateMineConfig, StateType } from './mine.slice.types'

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
    coefficients: {
      easy: [],
      hard: [],
      medium: [],
    },
    selectedBlocks: [],
    isStarted: false,
    isGameOver: false,
    currentGameId: null,
    currentGameStatus: 'NOT_STARTED',
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
    updateCoefficients: (state: StateType, action: PayloadAction<IGetMineRulesResponse>) => {
      const rowsConfig = action.payload?.find((multipliers) => multipliers.rows === state.mineConfig.rows)?.coefficients
      if (!rowsConfig) return
      state.mineConfig.coefficients = rowsConfig
      state.mineConfig.mode.coefficient =
        state.mineConfig.coefficients[state.mineConfig.mode.label === 'HARD' ? 'hard' : state.mineConfig.mode.label === 'MEDIUM' ? 'medium' : 'easy']
    },
    updateMinConfigMode: (state: StateType, action: PayloadAction<IMineModeVariants>) => {
      switch (action.payload) {
        case 'EASY':
          state.mineConfig.mode = {
            label: 'EASY',
            value: 4,
            coefficient: state.mineConfig.coefficients.easy,
          }
          break
        case 'MEDIUM':
          state.mineConfig.mode = { label: 'MEDIUM', value: 3, coefficient: state.mineConfig.coefficients.medium }
          break
        case 'HARD':
          state.mineConfig.mode = { label: 'HARD', value: 2, coefficient: state.mineConfig.coefficients.hard }
        default:
          state.mineConfig.mode = { label: 'EASY', value: 4, coefficient: state.mineConfig.coefficients.easy }
          break
      }
    },
    startMineGame: (state: StateType) => {
      state.mineConfig.isStarted = true
      state.mineConfig.isGameOver = false // Reset game over state when starting a new game
      state.mineConfig.selectedBlocks = initialState.mineConfig.selectedBlocks
      state.mineConfig.activeRow = 1
      state.mineConfig.currentGameStatus = 'ONGOING'
    },
    endMineGame: (state: StateType, action: PayloadAction<{ isWin: boolean }>) => {
      if (action.payload.isWin) {
        // state.mineConfig.isGameOver = true // Reset game over state when starting a new game
        // state.mineConfig = initialState.mineConfig
        state.mineConfig.isStarted = false
        // state.mineConfig.currentGameStatus = 'WON'
      } else {
        state.mineConfig.isGameOver = true // Reset game over state when starting a new game
        state.mineConfig.isStarted = false

        // state.mineConfig.currentGameStatus = 'LOST' // Reset game over state when starting a new game
      }
      // state.mineConfig.isStarted = false

      // state.mineConfig = initialState.mineConfig
    },
  },
})

export const { updateMineConfig, startMineGame, endMineGame, updateCoefficients, updateMinConfigMode } = mineSlice.actions

export default mineSlice.reducer
