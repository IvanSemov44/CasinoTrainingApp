import { useLocalSearchParams, Stack } from 'expo-router';
import CPDrillScreen from '../../src/features/caribbean-poker-training/screens/CPDrillScreen';
import type { CPDrillType } from '../../src/features/caribbean-poker-training/types';

export default function CPDrillRoute() {
  const { drillType } = useLocalSearchParams<{ drillType: CPDrillType }>();

  return (
    <>
      <Stack.Screen options={{ title: 'Caribbean Poker Drill' }} />
      {drillType && <CPDrillScreen drillType={drillType} />}
    </>
  );
}
