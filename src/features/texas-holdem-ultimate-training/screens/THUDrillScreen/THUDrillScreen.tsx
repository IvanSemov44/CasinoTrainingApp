import React from 'react';
import { DrillScreen } from '@shared';
import { generateTHUScenario } from '../../utils/scenarioGenerator';
import type { THUDrillScreenProps } from './THUDrillScreen.types';

export default function THUDrillScreen(props: THUDrillScreenProps) {
  const { drillType } = props;

  if (!drillType) {
    return null;
  }

  return (
    <DrillScreen
      scenarioGenerator={generateTHUScenario}
      drillType={drillType}
      dealerLabel={() => "Dealer's Hand"}
    />
  );
}
