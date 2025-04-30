import { IGameDifficultyMode } from '@/services/games/common/games.types'
import { PlinkoBallType } from '@/services/games/plinko/physx.types'
import { IFinishedPlinkoGame, IMePlayingPlinkoGame, IPlinkoRules } from '@/services/games/plinko/plinko.service.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IPlinkoStatus, IUpdatePlinkoConfig, StateType } from './plinko.slice.types'

const initialState: StateType = {
  plinkoConfig: {
    betAmount: '',
    mode: {
      label: 'EASY',
      value: 1,
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
        rows: action.payload.rowsCount,
        mode: action.payload.mode,
      }
    },
    setPlayingPlinkoBalls: (state: StateType, action: PayloadAction<PlinkoBallType[]>) => {
      if (!action.payload || !state.plinkoConfig.playing) {
        return
      }
      state.plinkoConfig.playing.balls = action.payload
      state.plinkoConfig.playing.status = 'DROPPING'
    },
    incDroppedBallsCount: (state: StateType, action: PayloadAction<number>) => {
      if (!state.plinkoConfig?.playing || (state.plinkoConfig.playing?.droppedCount ?? 0) >= state.plinkoConfig.numberOfBets) {
        return
      }
      if (state.plinkoConfig.rules && action.payload >= 0 && action.payload < (state.plinkoConfig.rules.multipliers[state.plinkoConfig.mode.label]?.length ?? 0)) {
        if (state.plinkoConfig.playing.prize == null) {
          state.plinkoConfig.playing.prize = 0
        }
        state.plinkoConfig.playing.prize += state.plinkoConfig.rules.multipliers[state.plinkoConfig.mode.label][action.payload] * +state.plinkoConfig.betAmount
      }
      state.plinkoConfig.playing.droppedCount++
    },
    setPlinkoGamePrizeAmount: (state: StateType, action: PayloadAction<IFinishedPlinkoGame>) => {
      if (state.plinkoConfig.playing) {
        state.plinkoConfig.playing.status = action.payload.status
        state.plinkoConfig.playing.prize = action.payload.prize
      }
    },
    closePlayingPlinkoGame: (state: StateType, action: PayloadAction<void>) => {
      state.plinkoConfig.playing = null
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
  setPlinkoGamePrizeAmount,
  closePlayingPlinkoGame,
  setPlinkoSelectedConfigRule,
} = plinkoSlice.actions

export default plinkoSlice.reducer
