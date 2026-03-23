import { Stack } from 'expo-router';
import CalculationScreen from '@features/roulette/roulette-training/screens/exercises/CalculationScreen';

export default function RouletteCalculationRoute() {
  return (
    <>
      <Stack.Screen options={{ title: 'Calculation' }} />
      <CalculationScreen />
    </>
  );
}
