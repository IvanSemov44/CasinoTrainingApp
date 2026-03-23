import React from 'react';
import { DrillScreen } from '@shared';
import { generateScenario } from '../../utils/scenarioGenerator';
import type { TCPDrillScreenProps } from './TCPDrillScreen.types';

export default function TCPDrillScreen(props: TCPDrillScreenProps) {
  const { drillType } = props;

  if (!drillType) {
    return null;
  }

  return (
    <DrillScreen
      scenarioGenerator={generateScenario}
      drillType={drillType}
      dealerLabel={() => "Dealer's Hand"}
    />
  );
}
