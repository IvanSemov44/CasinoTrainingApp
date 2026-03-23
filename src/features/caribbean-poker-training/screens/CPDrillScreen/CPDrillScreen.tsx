import React from 'react';
import { DrillScreen } from '@shared';
import { generateCPScenario } from '../../utils/scenarioGenerator';
import type { CPDrillScreenProps } from './CPDrillScreen.types';

export default function CPDrillScreen(props: CPDrillScreenProps) {
  const { drillType } = props;

  if (!drillType) {
    return null;
  }

  return (
    <DrillScreen
      scenarioGenerator={generateCPScenario}
      drillType={drillType}
      dealerLabel={() => "Dealer's Hand"}
    />
  );
}
