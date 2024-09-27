import { createSlice } from '@reduxjs/toolkit'
import { StateType } from './navbar.slice.types'

const initialState: StateType = {
  navbar: {
    open: false,
  },
}

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    openNavbar: (state: StateType) => {
      state.navbar = { ...state.navbar, open: true }
    },
    closeNavbar: (state: StateType) => {
      state.navbar = { ...state.navbar, open: false }
    },
    toggleNavbar: (state: StateType) => {
      state.navbar = { ...state.navbar, open: !state.navbar.open }
    },
  },
})

export const { openNavbar, toggleNavbar, closeNavbar } = navbarSlice.actions

export default navbarSlice.reducer
