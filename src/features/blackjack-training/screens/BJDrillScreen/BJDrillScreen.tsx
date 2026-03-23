import React from 'react';
import { DrillScreen } from '@shared';
import { generateBJScenario } from '../../utils/scenarioGenerator';
import type { BJDrillScreenProps } from './BJDrillScreen.types';

function getDealerLabel(drillType: string): string {
  return drillType === 'insurance-timing' ? "Dealer's Upcard" : "Dealer's Hand";
}

export default function BJDrillScreen(props: BJDrillScreenProps) {
  const { drillType } = props;

  if (!drillType) {
    return null;
  }

  return (
    <DrillScreen
      scenarioGenerator={generateBJScenario}
      drillType={drillType}
      dealerLabel={getDealerLabel}
    />
  );
}
