import React from 'react';
import DrillMenuScreen from '@components/shared/DrillMenuScreen';
import { DRILLS } from '../../constants/drills';
import type { TCPMenuScreenProps } from './TCPMenuScreen.types';

export default function TCPMenuScreen({ navigation }: TCPMenuScreenProps) {
  return (
    <DrillMenuScreen
      title="Three Card Poker"
      drills={DRILLS}
      onPress={drillType => navigation.navigate('TCPDrill', { drillType })}
    />
  );
}
