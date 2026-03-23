import React from 'react';
import { DrillScreen } from '@shared';
import { generateRKScenario } from '../../utils/scenarioGenerator';
import type { RKDrillScreenProps } from './RKDrillScreen.types';

export default function RKDrillScreen(props: RKDrillScreenProps) {
  const { drillType } = props;

  if (!drillType) {
    return null;
  }

  return (
    <DrillScreen
      scenarioGenerator={generateRKScenario}
      drillType={drillType}
      dealerLabel={() => 'Winning Number'}
    />
  );
}
