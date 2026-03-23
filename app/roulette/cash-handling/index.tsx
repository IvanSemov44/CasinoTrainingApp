import { Stack } from 'expo-router';
import CalculationScreen from '@features/roulette/roulette-training/screens/exercises/CalculationScreen';

export default function RouletteCashHandlingRoute() {
  return (
    <>
      <Stack.Screen options={{ title: 'Cash Handling' }} />
      <CalculationScreen />
    </>
  );
}
