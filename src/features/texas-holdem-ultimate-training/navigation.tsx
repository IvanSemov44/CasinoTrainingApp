import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import withErrorBoundary from '@components/withErrorBoundary';
import THUMenuScreen from './screens/THUMenuScreen';
import THUDrillScreen from './screens/THUDrillScreen';
import type { THUDrillType } from './types';

export type THUStackParamList = {
  THUMenu: undefined;
  THUDrill: { drillType: THUDrillType };
};

const Stack = createStackNavigator<THUStackParamList>();
const THUMenuScreenWithBoundary = withErrorBoundary(THUMenuScreen, "Texas Hold'em Ultimate Training");
const THUDrillScreenWithBoundary = withErrorBoundary(THUDrillScreen, "Texas Hold'em Ultimate Training");

export const THURoutes = () => {
  return (
    <>
      <Stack.Screen
        name="THUMenu"
        component={THUMenuScreenWithBoundary}
        options={{ title: "Texas Hold'em Ultimate" }}
      />
      <Stack.Screen
        name="THUDrill"
        component={THUDrillScreenWithBoundary}
        options={{ title: 'Drill' }}
      />
    </>
  );
};
