// src/app/store.ts
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import HomePageReducer from "./screens/homePage/slice";

export const store = configureStore({
  reducer: {
    homePage: HomePageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
