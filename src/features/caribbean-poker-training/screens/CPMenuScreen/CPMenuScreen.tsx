import React from 'react';
import { useRouter } from 'expo-router';
import { DrillMenuScreen } from '@shared';
import { DRILLS } from '../../constants/drills';

export default function CPMenuScreen() {
  const router = useRouter();

  return (
    <DrillMenuScreen
      title="Caribbean Poker"
      drills={DRILLS}
      onPress={drillType => router.push(`/cp/${drillType}`)}
    />
  );
}
