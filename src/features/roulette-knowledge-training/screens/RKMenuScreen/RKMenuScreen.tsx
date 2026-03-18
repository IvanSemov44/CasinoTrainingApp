import React from 'react';
import DrillMenuScreen from '@components/shared/DrillMenuScreen';
import { DRILLS } from '../../constants/drills';
import type { RKMenuScreenProps } from './RKMenuScreen.types';

export default function RKMenuScreen({ navigation }: RKMenuScreenProps) {
  return (
    <DrillMenuScreen
      title="Roulette Knowledge"
      drills={DRILLS}
      onPress={drillType => navigation.navigate('RKDrill', { drillType })}
    />
  );
}
