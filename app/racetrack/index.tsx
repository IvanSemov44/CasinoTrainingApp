import { Stack } from 'expo-router';
import RacetrackScreen from '@features/roulette/racetrack/screens/RacetrackScreen';

export default function RacetrackRoute() {
  return (
    <>
      <Stack.Screen options={{ title: 'Racetrack' }} />
      <RacetrackScreen />
    </>
  );
}
