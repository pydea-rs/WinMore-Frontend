import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ITriggerModalPayload, StateType } from './modal.slice.types'

const initialState: StateType = {
  modals: {
    login: false,
    deposit: false,
    selectCoin: false,
    withdraw: false,
  },
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    triggerModal: (state: StateType, action: PayloadAction<ITriggerModalPayload>) => {
      console.log(action.payload.trigger)
      state.modals = { ...state.modals, [action.payload.modal]: action.payload.trigger }
    },
  },
})

export const { triggerModal } = modalSlice.actions

export default modalSlice.reducer
