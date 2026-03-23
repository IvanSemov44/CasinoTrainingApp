import React from 'react';
import { useRouter } from 'expo-router';
import { DrillMenuScreen } from '@shared';
import { DRILLS } from '../../constants/drills';

export default function TCPMenuScreen() {
  const router = useRouter();

  return (
    <DrillMenuScreen
      title="Three Card Poker"
      drills={DRILLS}
      onPress={drillType => router.push(`/tcp/${drillType}`)}
    />
  );
}
