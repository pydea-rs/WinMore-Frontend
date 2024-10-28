import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ITriggerModalPayload, ITriggerWithdrawModalPayload, StateType } from './modal.slice.types'

const initialState: StateType = {
  modals: {
    login: false,
    deposit: false,
    selectCoin: false,
    withdraw: {
      open: false,
      data: null,
    },
  },
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    triggerModal: (state: StateType, action: PayloadAction<ITriggerModalPayload>) => {
      state.modals = { ...state.modals, [action.payload.modal]: action.payload.trigger }
    },
    triggerWithdrawModal: (state: StateType, action: PayloadAction<ITriggerWithdrawModalPayload>) => {
      state.modals.withdraw.data = action.payload.data
      state.modals.withdraw.open = action.payload.trigger
    },
  },
})

export const { triggerModal, triggerWithdrawModal } = modalSlice.actions

export default modalSlice.reducer
