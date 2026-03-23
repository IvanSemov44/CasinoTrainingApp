import { Stack } from 'expo-router';
import CalculationScreen from '@features/roulette/roulette-training/screens/exercises/CalculationScreen';

export default function RouletteMixedCalculationRoute() {
  return (
    <>
      <Stack.Screen options={{ title: 'Mixed Calculation' }} />
      <CalculationScreen />
    </>
  );
}
