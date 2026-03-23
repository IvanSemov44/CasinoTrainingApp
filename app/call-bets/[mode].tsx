import { useLocalSearchParams, Stack } from 'expo-router';
import CallBetsTrainingScreen from '../../src/features/call-bets-training/screens/CallBetsTrainingScreen';
import type { CallBetMode } from '../../src/features/call-bets-training/types';

export default function CallBetsTrainingRoute() {
  const { mode } = useLocalSearchParams<{ mode: CallBetMode }>();

  return (
    <>
      <Stack.Screen options={{ title: 'Call Bets Training' }} />
      {mode && <CallBetsTrainingScreen mode={mode} />}
    </>
  );
}
