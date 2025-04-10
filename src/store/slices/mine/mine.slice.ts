import { IGameDifficultyMode } from '@/services/games/common/games.types'
import { IDreamMineRules } from '@/services/games/mine/mine.service.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUpdateMineConfig, StateType } from './mine.slice.types'

const initialState: StateType = {
  mineConfig: {
    betAmount: '',
    mode: {
      multipliers: [],
      label: 'EASY',
      value: 4,
    },
    rows: 8,
    activeRow: 1,
    multipliers: {
      EASY: [],
      HARD: [],
      MEDIUM: [],
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
    setDreamMineConfig: (state: StateType, action: PayloadAction<IUpdateMineConfig>) => {
      state.mineConfig = {
        ...state.mineConfig,
        ...action.payload,
        ...(state.mineConfig.isGameOver ? { selectedBlocks: [], activeRow: 1, isGameOver: false, isStarted: false } : {}),
      }
    },
    setDreamMineMultipliers: (state: StateType, action: PayloadAction<IDreamMineRules[]>) => {
      const rowsConfig = action.payload?.find((multipliers) => multipliers.rows === state.mineConfig.rows)?.multipliers
      if (!rowsConfig) return
      state.mineConfig.multipliers = rowsConfig
      state.mineConfig.mode.multipliers = state.mineConfig.multipliers[state.mineConfig.mode.label || 'EASY']
    },
    setDreamMineGameMode: (state: StateType, { payload }: PayloadAction<IGameDifficultyMode>) => {
      state.mineConfig.mode = { ...payload, multipliers: state.mineConfig.multipliers[payload.label] }
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

export const { setDreamMineConfig, startMineGame, endMineGame, setDreamMineMultipliers, setDreamMineGameMode } = mineSlice.actions

export default mineSlice.reducer
