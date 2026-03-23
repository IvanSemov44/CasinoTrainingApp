import React from 'react';
import { Stack } from 'expo-router';
import RouletteExercisesScreen from '@features/roulette/roulette-training/screens/menu/RouletteExercisesScreen';

export default function RouletteIndex() {
  return (
    <>
      <Stack.Screen options={{ title: 'Roulette Exercises' }} />
      <RouletteExercisesScreen />
    </>
  );
}
