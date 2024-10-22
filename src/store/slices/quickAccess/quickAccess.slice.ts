import { createSlice } from '@reduxjs/toolkit'
import { StateType } from './quickAccess.slice.types'

const initialState: StateType = {
  quickAccess: {
    open: true,
  },
}

export const quickAccessSlice = createSlice({
  name: 'quickAccess',
  initialState,
  reducers: {
    showQuickAccess: (state: StateType) => {
      state.quickAccess = { ...state.quickAccess, open: true }
    },
    hideQuickAccess: (state: StateType) => {
      state.quickAccess = { ...state.quickAccess, open: false }
    },
    toggleQuickAccess: (state: StateType) => {
      state.quickAccess = { ...state.quickAccess, open: !state.quickAccess.open }
    },
  },
})

export const { showQuickAccess, hideQuickAccess, toggleQuickAccess } = quickAccessSlice.actions

export default quickAccessSlice.reducer
