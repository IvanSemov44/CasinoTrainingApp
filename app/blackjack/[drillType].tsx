import { useLocalSearchParams, Stack } from 'expo-router';
import BJDrillScreen from '../../src/features/blackjack-training/screens/BJDrillScreen';
import type { BJDrillType } from '../../src/features/blackjack-training/types';

export default function BlackjackDrillRoute() {
  const { drillType } = useLocalSearchParams<{ drillType: BJDrillType }>();

  return (
    <>
      <Stack.Screen options={{ title: 'Blackjack Drill' }} />
      {drillType && <BJDrillScreen drillType={drillType} />}
    </>
  );
}
