import { Stack } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import PositionMenuScreen from '@features/roulette/racetrack-position-training/screens/PositionMenuScreen';
import PositionTrainingScreen from '@features/roulette/racetrack-position-training/screens/PositionTrainingScreen';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MenuScreen = PositionMenuScreen as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TrainingScreen = PositionTrainingScreen as any;

export default function RacetrackPositionRoutes() {
  const { difficulty } = useLocalSearchParams<{ difficulty?: string }>();

  return (
    <>
      <Stack.Screen
        options={{ title: difficulty ? 'Position Training' : 'Racetrack Position Training' }}
      />
      {difficulty ? (
        <TrainingScreen route={{ params: { difficulty } }} navigation={{}} />
      ) : (
        <MenuScreen route={{}} navigation={{ navigate: () => {} }} />
      )}
    </>
  );
}
