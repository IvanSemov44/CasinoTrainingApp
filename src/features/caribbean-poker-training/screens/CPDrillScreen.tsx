import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import DrillScreen from '@components/shared/DrillScreen';
import { generateCPScenario } from '../utils/scenarioGenerator';
import type { CPStackParamList } from '../navigation';

type CPDrillScreenProps = StackScreenProps<CPStackParamList, 'CPDrill'>;

export default function CPDrillScreen({ route }: CPDrillScreenProps) {
  return (
    <DrillScreen
      scenarioGenerator={generateCPScenario}
      drillType={route.params.drillType}
    />
  );
}
