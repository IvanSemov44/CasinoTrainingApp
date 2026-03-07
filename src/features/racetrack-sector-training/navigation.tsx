import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import withErrorBoundary from '@components/withErrorBoundary';
import SectorMenuScreen from './screens/SectorMenuScreen';
import SectorTrainingScreen from './screens/SectorTrainingScreen';
import { SectorMode } from './types';

export type RacetrackSectorStackParamList = {
  SectorMenu: undefined;
  SectorTraining: { mode?: SectorMode };
};

const Stack = createStackNavigator<RacetrackSectorStackParamList>();
const SectorMenuScreenWithBoundary = withErrorBoundary(
  SectorMenuScreen,
  'Racetrack Sector Training'
);
const SectorTrainingScreenWithBoundary = withErrorBoundary(
  SectorTrainingScreen,
  'Racetrack Sector Training'
);

export function RacetrackSectorRoutes() {
  return (
    <>
      <Stack.Screen
        name="SectorMenu"
        component={SectorMenuScreenWithBoundary}
        options={{ title: 'Sector Training' }}
      />
      <Stack.Screen
        name="SectorTraining"
        component={SectorTrainingScreenWithBoundary}
        options={{ title: 'Sector Training' }}
      />
    </>
  );
}

export type { SectorMode } from './types';
