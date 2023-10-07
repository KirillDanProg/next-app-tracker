import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import expensesReducer from "@/state/features/expense-slice";

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
  },
  devTools: true
});

export type AppState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
