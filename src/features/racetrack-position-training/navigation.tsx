import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PositionMenuScreen from './screens/PositionMenuScreen';
import PositionTrainingScreen from './screens/PositionTrainingScreen';
import { PositionMode } from './types';

export type RacetrackPositionStackParamList = {
  PositionMenu: undefined;
  PositionTraining: { mode?: PositionMode };
};

const Stack = createStackNavigator<RacetrackPositionStackParamList>();

export function RacetrackPositionRoutes() {
  return (
    <>
      <Stack.Screen
        name="PositionMenu"
        component={PositionMenuScreen}
        options={{ title: 'Position Training' }}
      />
      <Stack.Screen
        name="PositionTraining"
        component={PositionTrainingScreen}
        options={{ title: 'Position Training' }}
      />
    </>
  );
}

export type { PositionMode } from './types';
