import { configureStore } from '@reduxjs/toolkit';
import rouletteReducer from './rouletteSlice';

export const store = configureStore({
  reducer: {
    roulette: rouletteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
