import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import withErrorBoundary from '@shared/withErrorBoundary';
import TCPMenuScreen from './screens/TCPMenuScreen';
import TCPDrillScreen from './screens/TCPDrillScreen';
import type { TCPDrillType } from './types';

export type TCPStackParamList = {
  TCPMenu: undefined;
  TCPDrill: { drillType: TCPDrillType };
};

const Stack = createStackNavigator<TCPStackParamList>();
const TCPMenuScreenWithBoundary = withErrorBoundary(TCPMenuScreen, 'Three Card Poker Training');
const TCPDrillScreenWithBoundary = withErrorBoundary(TCPDrillScreen, 'Three Card Poker Training');

export const TCPRoutes = () => {
  return (
    <>
      <Stack.Screen
        name="TCPMenu"
        component={TCPMenuScreenWithBoundary}
        options={{ title: 'Three Card Poker' }}
      />
      <Stack.Screen
        name="TCPDrill"
        component={TCPDrillScreenWithBoundary}
        options={{ title: 'Drill' }}
      />
    </>
  );
};
