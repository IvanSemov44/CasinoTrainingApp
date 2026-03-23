import { useLocalSearchParams, Stack } from 'expo-router';
import TCPDrillScreen from '../../src/features/three-card-poker-training/screens/TCPDrillScreen';
import type { TCPDrillType } from '../../src/features/three-card-poker-training/types';

export default function TCPDrillRoute() {
  const { drillType } = useLocalSearchParams<{ drillType: TCPDrillType }>();

  return (
    <>
      <Stack.Screen options={{ title: 'Three Card Poker Drill' }} />
      {drillType && <TCPDrillScreen drillType={drillType} />}
    </>
  );
}
