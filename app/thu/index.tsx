import { Stack } from 'expo-router';
import THUMenuScreen from '../../src/features/texas-holdem-ultimate-training/screens/THUMenuScreen';

export default function THUMenuRoute() {
  return (
    <>
      <Stack.Screen options={{ title: "Texas Hold'em Ultimate" }} />
      <THUMenuScreen />
    </>
  );
}
