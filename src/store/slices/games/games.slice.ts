import { generateMines } from '@/components/pages/mine/lib/config'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IStartMineGamePayload, IUpdateMineConfig, StateType } from './games.slice.types'

const initialState: StateType = {
  mineConfig: {
    betAmount: '0.00',
    mode: 'easy',
    numberOfBets: 0,
    rows: 5,
    mines: [],
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

      switch (state.mineConfig.mode) {
        case 'easy':
          state.mineConfig.mines = generateMines({ mines: 2, total: state.mineConfig.rows * 4 })
          break
        case 'medium':
          state.mineConfig.mines = generateMines({ mines: 3, total: state.mineConfig.rows * 4 })
          break
        case 'hard':
          state.mineConfig.mines = generateMines({ mines: 4, total: state.mineConfig.rows * 4 })
          break
      }
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
