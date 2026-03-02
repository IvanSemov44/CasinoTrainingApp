import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CPMenuScreen from './screens/CPMenuScreen';
import CPDrillScreen from './screens/CPDrillScreen';
import type { CPDrillType } from './types';

export type CPStackParamList = {
  CPMenu: undefined;
  CPDrill: { drillType: CPDrillType };
};

const Stack = createStackNavigator<CPStackParamList>();

export const CPRoutes = () => {
  return (
    <>
      <Stack.Screen
        name="CPMenu"
        component={CPMenuScreen}
        options={{ title: 'Caribbean Poker' }}
      />
      <Stack.Screen
        name="CPDrill"
        component={CPDrillScreen}
        options={{ title: 'Drill' }}
      />
    </>
  );
};
