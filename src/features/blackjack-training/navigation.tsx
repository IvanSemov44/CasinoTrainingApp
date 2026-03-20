import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import withErrorBoundary from '@shared/withErrorBoundary';
import BJMenuScreen from './screens/BJMenuScreen';
import BJDrillScreen from './screens/BJDrillScreen';
import type { BJDrillType } from './types';

export type BJStackParamList = {
  BJMenu: undefined;
  BJDrill: { drillType: BJDrillType };
};

const Stack = createStackNavigator<BJStackParamList>();
const BJMenuScreenWithBoundary = withErrorBoundary(BJMenuScreen, 'Blackjack Training');
const BJDrillScreenWithBoundary = withErrorBoundary(BJDrillScreen, 'Blackjack Training');

export const BJRoutes = () => {
  return (
    <>
      <Stack.Screen
        name="BJMenu"
        component={BJMenuScreenWithBoundary}
        options={{ title: 'Blackjack' }}
      />
      <Stack.Screen
        name="BJDrill"
        component={BJDrillScreenWithBoundary}
        options={{ title: 'Drill' }}
      />
    </>
  );
};
