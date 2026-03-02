import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SectorMenuScreen from './screens/SectorMenuScreen';
import SectorTrainingScreen from './screens/SectorTrainingScreen';
import { SectorMode } from './types';

export type RacetrackSectorStackParamList = {
  SectorMenu: undefined;
  SectorTraining: { mode?: SectorMode };
};

const Stack = createStackNavigator<RacetrackSectorStackParamList>();

export function RacetrackSectorRoutes() {
  return (
    <>
      <Stack.Screen
        name="SectorMenu"
        component={SectorMenuScreen}
        options={{ title: 'Sector Training' }}
      />
      <Stack.Screen
        name="SectorTraining"
        component={SectorTrainingScreen}
        options={{ title: 'Sector Training' }}
      />
    </>
  );
}

export type { SectorMode } from './types';
