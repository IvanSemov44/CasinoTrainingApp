import { Stack } from 'expo-router';
import CallBetsMenuScreen from '../../src/features/call-bets-training/screens/CallBetsMenuScreen';

export default function CallBetsMenuRoute() {
  return (
    <>
      <Stack.Screen options={{ title: 'Call Bets Training' }} />
      <CallBetsMenuScreen />
    </>
  );
}
