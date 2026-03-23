import { Stack } from 'expo-router';
import BJMenuScreen from '../../src/features/blackjack-training/screens/BJMenuScreen';

export default function BlackjackMenuRoute() {
  return (
    <>
      <Stack.Screen options={{ title: 'Blackjack' }} />
      <BJMenuScreen />
    </>
  );
}
