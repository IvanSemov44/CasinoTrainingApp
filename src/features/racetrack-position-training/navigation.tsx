import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import withErrorBoundary from '@components/withErrorBoundary';
import PositionMenuScreen from './screens/PositionMenuScreen';
import PositionTrainingScreen from './screens/PositionTrainingScreen';
import { PositionMode } from './types';

export type RacetrackPositionStackParamList = {
  PositionMenu: undefined;
  PositionTraining: { mode?: PositionMode };
};

const Stack = createStackNavigator<RacetrackPositionStackParamList>();
const PositionMenuScreenWithBoundary = withErrorBoundary(PositionMenuScreen, 'Racetrack Position Training');
const PositionTrainingScreenWithBoundary = withErrorBoundary(PositionTrainingScreen, 'Racetrack Position Training');

export function RacetrackPositionRoutes() {
  return (
    <>
      <Stack.Screen
        name="PositionMenu"
        component={PositionMenuScreenWithBoundary}
        options={{ title: 'Position Training' }}
      />
      <Stack.Screen
        name="PositionTraining"
        component={PositionTrainingScreenWithBoundary}
        options={{ title: 'Position Training' }}
      />
    </>
  );
}

export type { PositionMode } from './types';
