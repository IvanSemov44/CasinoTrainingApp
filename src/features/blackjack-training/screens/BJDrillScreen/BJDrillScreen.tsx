import React from 'react';
import { DrillScreen } from '@shared';
import { generateBJScenario } from '../../utils/scenarioGenerator';
import type { BJDrillScreenProps } from './BJDrillScreen.types';

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
