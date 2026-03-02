import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TCPMenuScreen from './screens/TCPMenuScreen';
import TCPDrillScreen from './screens/TCPDrillScreen';
import type { TCPDrillType } from './types';

export type TCPStackParamList = {
  TCPMenu: undefined;
  TCPDrill: { drillType: TCPDrillType };
};

const Stack = createStackNavigator<TCPStackParamList>();

export const TCPRoutes = () => {
  return (
    <>
      <Stack.Screen
        name="TCPMenu"
        component={TCPMenuScreen}
        options={{ title: 'Three Card Poker' }}
      />
      <Stack.Screen
        name="TCPDrill"
        component={TCPDrillScreen}
        options={{ title: 'Drill' }}
      />
    </>
  );
};
