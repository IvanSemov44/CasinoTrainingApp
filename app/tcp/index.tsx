import { Stack } from 'expo-router';
import TCPMenuScreen from '../../src/features/three-card-poker-training/screens/TCPMenuScreen';

export default function TCPMenuRoute() {
  return (
    <>
      <Stack.Screen options={{ title: 'Three Card Poker' }} />
      <TCPMenuScreen />
    </>
  );
}
