import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import DrillScreen from '@components/shared/DrillScreen';
import { generateScenario } from '../../utils/scenarioGenerator';
import type { TCPStackParamList } from '../../navigation';

type Props = StackScreenProps<TCPStackParamList, 'TCPDrill'>;

export default function TCPDrillScreen({ route }: Props) {
  return (
    <DrillScreen
      scenarioGenerator={generateScenario}
      drillType={route.params.drillType}
      dealerLabel={() => "Dealer's Hand"}
    />
  );
}
