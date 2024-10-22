import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux'
import { combineReducers } from 'redux'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { apiMiddleware } from './api.middleware'
import { APIsReducers } from './api.reducers'
import authSlice from './slices/auth/auth.slice'
import currencySlice from './slices/currency/currency.slice'
import gamesSlice from './slices/mine/mine.slice'
import modalSlice from './slices/modal/modal.slice'
import navbarSlice from './slices/navbar/navbar.slice'
import quickAccessSlice from './slices/quickAccess/quickAccess.slice'

type Store = typeof store
export type RootState = ReturnType<Store['getState']>
export type AppDispatch = Store['dispatch']

// Persist configuration
const persistConfig = {
  key: 'currency',
  version: 1,
  storage,
  whitelist: ['currency'], // Specify which slice to persist
}

// Combine your reducers
const rootReducer = combineReducers({
  auth: authSlice,
  modal: modalSlice,
  mine: gamesSlice,
  navbar: navbarSlice,
  quickAccess: quickAccessSlice,
  currency: currencySlice,
  ...APIsReducers,
})

// Apply persistReducer to the rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configure the store and middleware
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(...apiMiddleware),
})

const persistor = persistStore(store)

export const useDispatch = () => useAppDispatch<AppDispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector

export { persistor, store }
