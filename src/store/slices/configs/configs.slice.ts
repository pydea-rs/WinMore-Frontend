import { createSlice } from '@reduxjs/toolkit'
import { StateType } from './configs.slice.types'

const initialState: StateType = {
  configs: {
    sound: true,
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
  },
})

export const { soundOn, soundOff, triggerSound } = configsSlice.actions

export default configsSlice.reducer
