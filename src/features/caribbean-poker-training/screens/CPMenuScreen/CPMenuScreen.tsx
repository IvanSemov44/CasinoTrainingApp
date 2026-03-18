import React from 'react';
import DrillMenuScreen from '@components/shared/DrillMenuScreen';
import { DRILLS } from '../../constants/drills';
import type { CPMenuScreenProps } from './CPMenuScreen.types';

export default function CPMenuScreen({ navigation }: CPMenuScreenProps) {
  return (
    <DrillMenuScreen
      title="Caribbean Poker"
      drills={DRILLS}
      onPress={drillType => navigation.navigate('CPDrill', { drillType })}
    />
  );
}
