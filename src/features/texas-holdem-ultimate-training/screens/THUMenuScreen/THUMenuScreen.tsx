import React from 'react';
import DrillMenuScreen from '@components/shared/DrillMenuScreen';
import { DRILLS } from '../../constants/drills';
import type { THUMenuScreenProps } from './THUMenuScreen.types';

export default function THUMenuScreen({ navigation }: THUMenuScreenProps) {
  return (
    <DrillMenuScreen
      title="Texas Hold'em Ultimate"
      drills={DRILLS}
      onPress={drillType => navigation.navigate('THUDrill', { drillType })}
    />
  );
}
