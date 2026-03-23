import { Stack } from 'expo-router';
import RouletteTrainingScreen from '@features/roulette/roulette-training/screens/reference/RouletteTrainingScreen';

export default function RouletteTrainingRoute() {
  return (
    <>
      <Stack.Screen options={{ title: 'Roulette Training' }} />
      <RouletteTrainingScreen
        exercise={{
          title: 'Roulette Training',
          description: 'Place bets and see payouts',
        }}
      />
    </>
  );
}
