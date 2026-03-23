import { Stack } from 'expo-router';
import RouletteLayoutViewScreen from '@features/roulette/roulette-training/screens/reference/RouletteLayoutViewScreen';

export default function RouletteLayoutViewRoute() {
  return (
    <>
      <Stack.Screen options={{ title: 'Roulette Layout' }} />
      <RouletteLayoutViewScreen />
    </>
  );
}
