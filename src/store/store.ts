import { configureStore } from "@reduxjs/toolkit";
import gifsReducer from "./slices/gifsSlice";

export const store = configureStore({
  reducer: {
    gifs: gifsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
