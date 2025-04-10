import { IGameDifficultyMode } from '@/services/games/common/games.types'
import { PlinkoBallType } from '@/services/games/plinko/physx.types'
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
    numberOfBets: 1,
    playing: null,
    rules: null,
  },
}

export const plinkoSlice = createSlice({
  name: 'plinko',
  initialState,
  reducers: {
    setPlinkoConfig: (state: StateType, action: PayloadAction<IUpdatePlinkoConfig>) => {
      state.plinkoConfig = {
        ...state.plinkoConfig,
        ...action.payload,
      }
    },
    updatePlinkoGamePhysx: (state: StateType, action: PayloadAction<IPlinkoRules[]>) => {
      const rowsConfig = action.payload?.find((rules) => rules.rows === state.plinkoConfig.rows)
      if (!rowsConfig) return
      state.plinkoConfig.rules = rowsConfig
    },
    setPlinkoSelectedConfigRule: (state: StateType, action: PayloadAction<{ rules: IPlinkoRules[]; selectedRow: number; selectedMode?: IGameDifficultyMode }>) => {
      const { rules, selectedRow, selectedMode = null } = action.payload
      const rowsConfig = (rules ?? []).find((rules) => rules.rows === selectedRow)
      if (!rowsConfig) return

      state.plinkoConfig = {
        ...state.plinkoConfig,
        rules: rowsConfig,
        rows: rowsConfig.rows,
        mode: selectedMode ?? { label: 'EASY', value: 1 },
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
    setPlayingPlinkoBalls: (state: StateType, action: PayloadAction<PlinkoBallType[]>) => {
      if (!action.payload || !state.plinkoConfig.playing) {
        return
      }
      state.plinkoConfig.playing.balls = action.payload
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
  setPlinkoDifficultyMode,
  setPlayingPlinkoGameStatus,
  incDroppedBallsCount,
  setPlayingPlinkoGame,
  setPlayingPlinkoBalls,
  updatePlinkoGamePhysx,
  setPlinkoSelectedConfigRule,
} = plinkoSlice.actions

export default plinkoSlice.reducer
