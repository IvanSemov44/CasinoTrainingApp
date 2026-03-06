import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import DrillScreen from '@components/shared/DrillScreen';
import { generateScenario } from '../utils/scenarioGenerator';
import type { TCPStackParamList } from '../navigation';

type TCPDrillScreenProps = StackScreenProps<TCPStackParamList, 'TCPDrill'>;

function getBetChipLabel(drillType: string): string {
  return drillType === 'pair-plus-payout' ? 'PAIR PLUS' : 'ANTE';
}

export default function TCPDrillScreen({ route }: TCPDrillScreenProps) {
  return (
    <DrillScreen
      scenarioGenerator={generateScenario}
      drillType={route.params.drillType}
      betChipLabel={getBetChipLabel}
    />
  );
}
