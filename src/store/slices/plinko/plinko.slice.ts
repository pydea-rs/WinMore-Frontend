import { IGameDifficultyVariants } from '@/services/games/common/games.types'
import { IPlinkoRules } from '@/services/games/plinko/plinko.service.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUpdatePlinkoConfig, StateType } from './plinko.slice.types'

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
      }
    },
    updateMultipliers: (state: StateType, action: PayloadAction<IPlinkoRules[]>) => {
      const rowsConfig = action.payload?.find((multipliers) => multipliers.rows === state.plinkoConfig.rows)?.multipliers
      if (!rowsConfig) return
      state.plinkoConfig.multipliers = rowsConfig
      state.plinkoConfig.mode.multipliers =
        state.plinkoConfig.multipliers[state.plinkoConfig.mode.label === 'HARD' ? 'hard' : state.plinkoConfig.mode.label === 'MEDIUM' ? 'medium' : 'easy']
    },
    updatePlinkoConfigMode: (state: StateType, action: PayloadAction<IGameDifficultyVariants>) => {
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
  },
})

export const { updatePlinkoConfig, updateMultipliers, updatePlinkoConfigMode } = mineSlice.actions

export default mineSlice.reducer
