import React from 'react';
import DrillMenuScreen from '@components/shared/DrillMenuScreen';
import { DRILLS } from '../../constants/drills';
import type { BJMenuScreenProps } from './BJMenuScreen.types';

export default function BJMenuScreen({ navigation }: BJMenuScreenProps) {
  return (
    <DrillMenuScreen
      title="Blackjack"
      drills={DRILLS}
      onPress={drillType => navigation.navigate('BJDrill', { drillType })}
    />
  );
}
