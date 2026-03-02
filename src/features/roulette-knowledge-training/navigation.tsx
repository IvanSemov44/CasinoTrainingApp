import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import withErrorBoundary from '@components/withErrorBoundary';
import RKMenuScreen from './screens/RKMenuScreen';
import RKDrillScreen from './screens/RKDrillScreen';
import type { RKDrillType } from './types';

export type RKStackParamList = {
  RKMenu: undefined;
  RKDrill: { drillType: RKDrillType };
};

const Stack = createStackNavigator<RKStackParamList>();
const RKMenuScreenWithBoundary = withErrorBoundary(RKMenuScreen, 'Roulette Knowledge Training');
const RKDrillScreenWithBoundary = withErrorBoundary(RKDrillScreen, 'Roulette Knowledge Training');

export const RKRoutes = () => {
  return (
    <>
      <Stack.Screen
        name="RKMenu"
        component={RKMenuScreenWithBoundary}
        options={{ title: 'Roulette Knowledge' }}
      />
      <Stack.Screen
        name="RKDrill"
        component={RKDrillScreenWithBoundary}
        options={{ title: 'Drill' }}
      />
    </>
  );
};
