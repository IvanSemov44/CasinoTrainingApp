import { useLocalSearchParams, Stack } from 'expo-router';
import PLOGameTrainingScreen from '../../src/features/plo-training/screens/PLOGameTrainingScreen';
import type { PLODifficulty } from '../../src/features/plo-training/types';

export default function PLOGameTrainingRoute() {
  const { difficulty } = useLocalSearchParams<{ difficulty: PLODifficulty }>();

  return (
    <>
      <Stack.Screen options={{ title: 'PLO Training' }} />
      {difficulty && <PLOGameTrainingScreen difficulty={difficulty} />}
    </>
  );
}
