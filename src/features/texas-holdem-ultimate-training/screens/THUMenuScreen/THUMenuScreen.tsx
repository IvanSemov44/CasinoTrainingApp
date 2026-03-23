import React from 'react';
import { useRouter } from 'expo-router';
import { DrillMenuScreen } from '@shared';
import { DRILLS } from '../../constants/drills';

export default function THUMenuScreen() {
  const router = useRouter();

  return (
    <DrillMenuScreen
      title="Texas Hold'em Ultimate"
      drills={DRILLS}
      onPress={drillType => router.push(`/thu/${drillType}`)}
    />
  );
}
