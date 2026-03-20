import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import withErrorBoundary from '@shared/withErrorBoundary';
import CPMenuScreen from './screens/CPMenuScreen';
import CPDrillScreen from './screens/CPDrillScreen';
import type { CPDrillType } from './types';

export type CPStackParamList = {
  CPMenu: undefined;
  CPDrill: { drillType: CPDrillType };
};

const Stack = createStackNavigator<CPStackParamList>();
const CPMenuScreenWithBoundary = withErrorBoundary(CPMenuScreen, 'Caribbean Poker Training');
const CPDrillScreenWithBoundary = withErrorBoundary(CPDrillScreen, 'Caribbean Poker Training');

export const CPRoutes = () => {
  return (
    <>
      <Stack.Screen
        name="CPMenu"
        component={CPMenuScreenWithBoundary}
        options={{ title: 'Caribbean Poker' }}
      />
      <Stack.Screen
        name="CPDrill"
        component={CPDrillScreenWithBoundary}
        options={{ title: 'Drill' }}
      />
    </>
  );
};
