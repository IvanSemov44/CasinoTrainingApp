import { Stack } from 'expo-router';
import CalculationScreen from '@features/roulette/roulette-training/screens/exercises/CalculationScreen';

export default function RouletteAllPositionsCalculationRoute() {
  return (
    <>
      <Stack.Screen options={{ title: 'All Positions Calculation' }} />
      <CalculationScreen />
    </>
  );
}
