import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IPlinkoModeVariants, IUpdatePlinkoConfig, StateType } from './plinko.slice.types'
// import { IGetPlinkoRulesResponse } from '@/services/games/mine/mine.service.types'
type IGetPlinkoRulesResponse = {} // FIXME: Update this after backend implementation

export const CURRENT_MINE = 'mine_game'

const initialState: StateType = {
  plinkoConfig: {
    betAmount: '',
    mode: {
      multipliers: [],
      label: 'EASY',
      value: 4,
    },
    rows: 8,
    multipliers: {
      easy: [],
      hard: [],
      medium: [],
    },
    numberOfBets: 1,
    currentGameId: null,
    currentGameStatus: 'NOT_DROPPED_YET',
    prize: null,
  },
}

export const mineSlice = createSlice({
  name: 'mine',
  initialState,
  reducers: {
    updatePlinkoConfig: (state: StateType, action: PayloadAction<IUpdatePlinkoConfig>) => {
      state.plinkoConfig = {
        ...state.plinkoConfig,
        ...action.payload,
        ...(!state.plinkoConfig.isStarted ? { selectedBlocks: [], activeRow: 1, isGameOver: false, isStarted: false } : {}),
      }
    },
    updateMultipliers: (state: StateType, action: PayloadAction<IGetPlinkoRulesResponse>) => {
      const rowsConfig = null // FIXME: action.payload?.find((multipliers) => multipliers.rows === state.plinkoConfig.rows)?.multipliers
      if (!rowsConfig) return
      state.plinkoConfig.multipliers = rowsConfig
      state.plinkoConfig.mode.multipliers =
        state.plinkoConfig.multipliers[state.plinkoConfig.mode.label === 'HARD' ? 'hard' : state.plinkoConfig.mode.label === 'MEDIUM' ? 'medium' : 'easy']
    },
    updatePlinkoConfigMode: (state: StateType, action: PayloadAction<IPlinkoModeVariants>) => {
      switch (action.payload) {
        case 'MEDIUM':
          state.plinkoConfig.mode = { label: 'MEDIUM', value: 3, multipliers: state.plinkoConfig.multipliers.medium }
          break
        case 'HARD':
          state.plinkoConfig.mode = { label: 'HARD', value: 2, multipliers: state.plinkoConfig.multipliers.hard }
          break
        default:
          state.plinkoConfig.mode = {
            label: 'EASY',
            value: 4,
            multipliers: state.plinkoConfig.multipliers.easy,
          }
          break
      }
    },
    startPlinkoGame: (state: StateType) => {
      state.plinkoConfig.isStarted = true
      state.plinkoConfig.currentGameStatus = 'NOT_DROPPED_YET'
    },
    endPlinkoGame: (state: StateType, action: PayloadAction<{ hasWon: boolean }>) => {
      if (action.payload.hasWon) {
        state.plinkoConfig.isStarted = false
      } else {
        state.plinkoConfig.isStarted = false
      }
    },
  },
})

export const { updatePlinkoConfig, startPlinkoGame, endPlinkoGame, updateMultipliers, updatePlinkoConfigMode } = mineSlice.actions

export default mineSlice.reducer
