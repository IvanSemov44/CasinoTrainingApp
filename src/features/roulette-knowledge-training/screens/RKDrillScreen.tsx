import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import DrillScreen from '@components/shared/DrillScreen';
import { generateRKScenario } from '../utils/scenarioGenerator';
import type { RKStackParamList } from '../navigation';

type RKDrillScreenProps = StackScreenProps<RKStackParamList, 'RKDrill'>;

export default function RKDrillScreen({ route }: RKDrillScreenProps) {
  return (
    <DrillScreen
      scenarioGenerator={generateRKScenario}
      drillType={route.params.drillType}
    />
  );
}
