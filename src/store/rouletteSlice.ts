import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RouletteState, PlacedBet, Exercise, ExerciseResult } from '../types/roulette.types';

const initialState: RouletteState = {
  placedBets: [],
  selectedChipValue: 5,
  currentExercise: null,
  exerciseResults: [],
};

const rouletteSlice = createSlice({
  name: 'roulette',
  initialState,
  reducers: {
    placeBet: (state, action: PayloadAction<PlacedBet>) => {
      state.placedBets.push(action.payload);
    },
    removeBet: (state, action: PayloadAction<string>) => {
      state.placedBets = state.placedBets.filter(bet => bet.id !== action.payload);
    },
    clearBets: (state) => {
      state.placedBets = [];
    },
    setSelectedChipValue: (state, action: PayloadAction<number>) => {
      state.selectedChipValue = action.payload;
    },
    setCurrentExercise: (state, action: PayloadAction<Exercise | null>) => {
      state.currentExercise = action.payload;
      state.placedBets = []; // Clear bets when starting new exercise
    },
    addExerciseResult: (state, action: PayloadAction<ExerciseResult>) => {
      state.exerciseResults.push(action.payload);
    },
    clearExerciseResults: (state) => {
      state.exerciseResults = [];
    },
  },
});

export const {
  placeBet,
  removeBet,
  clearBets,
  setSelectedChipValue,
  setCurrentExercise,
  addExerciseResult,
  clearExerciseResults,
} = rouletteSlice.actions;

export default rouletteSlice.reducer;
