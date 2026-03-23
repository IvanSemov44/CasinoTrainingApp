import React from 'react';
import { useRouter } from 'expo-router';
import { DrillMenuScreen } from '@shared';
import { DRILLS } from '../../constants/drills';

export default function BJMenuScreen() {
  const router = useRouter();

  return (
    <DrillMenuScreen
      title="Blackjack"
      drills={DRILLS}
      onPress={drillType => router.push(`/blackjack/${drillType}`)}
    />
  );
}
