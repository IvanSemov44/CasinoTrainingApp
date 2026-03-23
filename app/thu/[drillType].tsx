import { useLocalSearchParams, Stack } from 'expo-router';
import THUDrillScreen from '../../src/features/texas-holdem-ultimate-training/screens/THUDrillScreen';
import type { THUDrillType } from '../../src/features/texas-holdem-ultimate-training/types';

export default function THUDrillRoute() {
  const { drillType } = useLocalSearchParams<{ drillType: THUDrillType }>();

  return (
    <>
      <Stack.Screen options={{ title: "Texas Hold'em Ultimate Drill" }} />
      {drillType && <THUDrillScreen drillType={drillType} />}
    </>
  );
}
