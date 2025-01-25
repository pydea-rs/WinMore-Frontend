import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StateType } from './configs.slice.types'

const initialState: StateType = {
  configs: {
    sound: true,
    timezone: 'UTC',
  },
}

export const configsSlice = createSlice({
  name: 'configs',
  initialState,
  reducers: {
    soundOn: (state: StateType) => {
      state.configs = { ...state.configs, sound: true }
    },
    soundOff: (state: StateType) => {
      state.configs = { ...state.configs, sound: false }
    },
    triggerSound: (state: StateType) => {
      state.configs = { ...state.configs, sound: !state.configs.sound }
    },
    setUserTimezone: (state: StateType, action: PayloadAction<string>) => {
      state.configs = { ...state.configs, timezone: action.payload }
    },
  },
})

export const { soundOn, soundOff, triggerSound, setUserTimezone } = configsSlice.actions

export default configsSlice.reducer
