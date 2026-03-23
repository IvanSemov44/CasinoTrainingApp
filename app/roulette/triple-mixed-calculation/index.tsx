import { Stack } from 'expo-router';
import CalculationScreen from '@features/roulette/roulette-training/screens/exercises/CalculationScreen';

export default function RouletteTripleMixedCalculationRoute() {
  return (
    <>
      <Stack.Screen options={{ title: 'Triple Mixed Calculation' }} />
      <CalculationScreen />
    </>
  );
}
