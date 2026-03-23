import React from 'react';
import { useRouter } from 'expo-router';
import { DrillMenuScreen } from '@shared';
import { DRILLS } from '../../constants/drills';

export default function RKMenuScreen() {
  const router = useRouter();
  return (
    <DrillMenuScreen
      title="Roulette Knowledge"
      drills={DRILLS}
      onPress={drillType => router.push(`/roulette-knowledge?drillType=${drillType}`)}
    />
  );
}
