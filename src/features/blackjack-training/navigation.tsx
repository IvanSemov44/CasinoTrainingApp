import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BJMenuScreen from './screens/BJMenuScreen';
import BJDrillScreen from './screens/BJDrillScreen';
import type { BJDrillType } from './types';

export type BJStackParamList = {
  BJMenu: undefined;
  BJDrill: { drillType: BJDrillType };
};

const Stack = createStackNavigator<BJStackParamList>();

export const BJRoutes = () => {
  return (
    <>
      <Stack.Screen
        name="BJMenu"
        component={BJMenuScreen}
        options={{ title: 'Blackjack' }}
      />
      <Stack.Screen
        name="BJDrill"
        component={BJDrillScreen}
        options={{ title: 'Drill' }}
      />
    </>
  );
};
