import { Stack } from 'expo-router';
import CPMenuScreen from '../../src/features/caribbean-poker-training/screens/CPMenuScreen';

export default function CPMenuRoute() {
  return (
    <>
      <Stack.Screen options={{ title: 'Caribbean Poker' }} />
      <CPMenuScreen />
    </>
  );
}
