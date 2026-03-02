import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import THUMenuScreen from './screens/THUMenuScreen';
import THUDrillScreen from './screens/THUDrillScreen';
import type { THUDrillType } from './types';

export type THUStackParamList = {
  THUMenu: undefined;
  THUDrill: { drillType: THUDrillType };
};

const Stack = createStackNavigator<THUStackParamList>();

export const THURoutes = () => {
  return (
    <>
      <Stack.Screen
        name="THUMenu"
        component={THUMenuScreen}
        options={{ title: "Texas Hold'em Ultimate" }}
      />
      <Stack.Screen
        name="THUDrill"
        component={THUDrillScreen}
        options={{ title: 'Drill' }}
      />
    </>
  );
};
