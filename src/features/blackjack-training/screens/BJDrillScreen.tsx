import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import DrillScreen from '@components/shared/DrillScreen';
import { generateBJScenario } from '../utils/scenarioGenerator';
import type { BJStackParamList } from '../navigation';

type BJDrillScreenProps = StackScreenProps<BJStackParamList, 'BJDrill'>;

function getDealerLabel(drillType: string): string {
  return drillType === 'insurance-timing' ? "Dealer's Upcard" : "Dealer's Hand";
}

export default function BJDrillScreen({ route }: BJDrillScreenProps) {
  return (
    <DrillScreen
      scenarioGenerator={generateBJScenario}
      drillType={route.params.drillType}
      dealerLabel={getDealerLabel}
    />
  );
}
