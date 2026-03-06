import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import DrillScreen from '@components/shared/DrillScreen';
import { generateTHUScenario } from '../utils/scenarioGenerator';
import type { THUStackParamList } from '../navigation';

type THUDrillScreenProps = StackScreenProps<THUStackParamList, 'THUDrill'>;

export default function THUDrillScreen({ route }: THUDrillScreenProps) {
  return (
    <DrillScreen
      scenarioGenerator={generateTHUScenario}
      drillType={route.params.drillType}
    />
  );
}
