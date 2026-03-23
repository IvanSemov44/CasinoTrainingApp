import { Stack } from 'expo-router';
import PLOMenuScreen from '../../src/features/plo-training/screens/PLOMenuScreen';

export default function PLOMenuRoute() {
  return (
    <>
      <Stack.Screen options={{ title: 'Pot Limit Omaha Training' }} />
      <PLOMenuScreen />
    </>
  );
}
