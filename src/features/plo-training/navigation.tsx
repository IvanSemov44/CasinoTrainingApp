import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PLOMenuScreen from './screens/PLOMenuScreen';
import PLOGameTrainingScreen from './screens/PLOGameTrainingScreen';
import type { PLODifficulty } from './types';

export type PLOStackParamList = {
  PLOMenu: undefined;
  PLOGameTraining: { difficulty: PLODifficulty };
};

const Stack = createStackNavigator<PLOStackParamList>();

export const PLORoutes = () => {
  return (
    <>
      <Stack.Screen
        name="PLOMenu"
        component={PLOMenuScreen}
        options={{ title: 'PLO Training' }}
      />
      <Stack.Screen
        name="PLOGameTraining"
        component={PLOGameTrainingScreen}
        options={{ title: 'Game Training' }}
      />
    </>
  );
};
