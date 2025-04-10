import { IGameDifficultyMode } from '@/services/games/common/games.types'
import { IMePlayingPlinkoGame, IPlinkoRules } from '@/services/games/plinko/plinko.service.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IPlinkoStatus, IUpdatePlinkoConfig, StateType } from './plinko.slice.types'

const initialState: StateType = {
  plinkoConfig: {
    betAmount: '',
    mode: {
      label: 'EASY',
      value: 4,
    },
    rows: 8,
    multipliers: {
      EASY: [],
      HARD: [],
      MEDIUM: [],
    },
    numberOfBets: 1,
    playing: null,
    rules: null,
  },
}

export const mineSlice = createSlice({
  name: 'mine',
  initialState,
  reducers: {
    setPlinkoConfig: (state: StateType, action: PayloadAction<IUpdatePlinkoConfig>) => {
      state.plinkoConfig = {
        ...state.plinkoConfig,
        ...action.payload,
      }
    },
    updatePlinkoBucketMultipliers: (state: StateType, action: PayloadAction<IPlinkoRules[]>) => {
      const rowsConfig = action.payload?.find((rules) => rules.rows === state.plinkoConfig.rows)?.multipliers
      if (!rowsConfig) return
      state.plinkoConfig.multipliers = rowsConfig
    },
    updatePlinkoGamePhysx: (state: StateType, action: PayloadAction<IPlinkoRules[]>) => {
      const rowsConfig = action.payload?.find((multipliers) => multipliers.rows === state.plinkoConfig.rows)
      if (!rowsConfig) return
      state.plinkoConfig.multipliers = rowsConfig.multipliers
      state.plinkoConfig.rules = rowsConfig
    },
    setPlinkoSelectedConfigRule: (state: StateType, action: PayloadAction<{ rules: IPlinkoRules[]; selectedRow: number; selectedMode?: IGameDifficultyMode }>) => {
      const { rules, selectedRow, selectedMode = null } = action.payload
      const rowsConfig = (rules ?? []).find((multipliers) => multipliers.rows === selectedRow)
      if (!rowsConfig) return
      state.plinkoConfig = {
        multipliers: rowsConfig.multipliers,
        rules: rowsConfig,
        rows: rowsConfig.rows,
        mode: selectedMode ?? { label: 'EASY', value: 1 },
        numberOfBets: 1,
        betAmount: '',
        playing: null,
      }
    },
    setPlayingPlinkoGame: (state: StateType, action: PayloadAction<IMePlayingPlinkoGame>) => {
      if (!action.payload) {
        state.plinkoConfig.playing = null
        return
      }
      state.plinkoConfig.playing = {
        balls: action.payload.plinkoBalls.map((ball) => ball.dropSpecs),
        droppedCount: 0,
        id: action.payload.id,
        prize: action.payload.prize,
        status: action.payload.status,
      }
    },
    incDroppedBallsCount: (state: StateType, action: PayloadAction<number>) => {
      if (!state.plinkoConfig?.playing || (state.plinkoConfig.playing?.droppedCount ?? 0) >= state.plinkoConfig.numberOfBets) {
        return
      }
      state.plinkoConfig.playing.droppedCount += action.payload
    },
    setPlayingPlinkoGameStatus: (state: StateType, action: PayloadAction<IPlinkoStatus>) => {
      if (!state.plinkoConfig?.playing || (state.plinkoConfig.playing?.droppedCount ?? 0) >= state.plinkoConfig.numberOfBets) {
        return
      }
      state.plinkoConfig.playing.status = action.payload
      switch (action.payload) {
        case 'FINISHED':
          state.plinkoConfig.playing.droppedCount = state.plinkoConfig.numberOfBets
          break
        case 'NOT_DROPPED_YET':
          state.plinkoConfig.playing.droppedCount = 0
          break
      }
    },
    setPlinkoDifficultyMode: (state: StateType, action: PayloadAction<IGameDifficultyMode>) => {
      state.plinkoConfig.mode = action.payload
    },
  },
})

export const {
  setPlinkoConfig,
  updatePlinkoBucketMultipliers,
  setPlinkoDifficultyMode,
  setPlayingPlinkoGameStatus,
  incDroppedBallsCount,
  setPlayingPlinkoGame,
  updatePlinkoGamePhysx,
  setPlinkoSelectedConfigRule,
} = mineSlice.actions

export default mineSlice.reducer
