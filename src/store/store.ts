import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";
import { combineReducers } from "redux";
import authSlice from "./slices/auth.slice";

const rootReducer = combineReducers({
  //   global: globalReducer,
  auth: authSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

type Store = typeof store;
export type RootState = ReturnType<Store["getState"]>;
export type AppDispatch = Store["dispatch"];
export const { dispatch } = store;
export const useDispatch = () => useAppDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export default store;
