import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RKMenuScreen from './screens/RKMenuScreen';
import RKDrillScreen from './screens/RKDrillScreen';
import type { RKDrillType } from './types';

export type RKStackParamList = {
  RKMenu: undefined;
  RKDrill: { drillType: RKDrillType };
};

const Stack = createStackNavigator<RKStackParamList>();

export const RKRoutes = () => {
  return (
    <>
      <Stack.Screen
        name="RKMenu"
        component={RKMenuScreen}
        options={{ title: 'Roulette Knowledge' }}
      />
      <Stack.Screen
        name="RKDrill"
        component={RKDrillScreen}
        options={{ title: 'Drill' }}
      />
    </>
  );
};
