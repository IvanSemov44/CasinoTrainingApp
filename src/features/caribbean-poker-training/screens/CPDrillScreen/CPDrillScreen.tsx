import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { DrillScreen } from '@shared';
import { generateCPScenario } from '../../utils/scenarioGenerator';
import type { CPStackParamList } from '../../navigation';

type Props = StackScreenProps<CPStackParamList, 'CPDrill'>;

export default function CPDrillScreen({ route }: Props) {
  return (
    <DrillScreen
      scenarioGenerator={generateCPScenario}
      drillType={route.params.drillType}
      dealerLabel={() => "Dealer's Hand"}
    />
  );
}
