import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import withErrorBoundary from '@components/withErrorBoundary';
import PLOMenuScreen from './screens/PLOMenuScreen';
import PLOGameTrainingScreen from './screens/PLOGameTrainingScreen';
import type { PLODifficulty } from './types';

export type PLOStackParamList = {
  PLOMenu: undefined;
  PLOGameTraining: { difficulty: PLODifficulty };
};

const Stack = createStackNavigator<PLOStackParamList>();
const PLOMenuScreenWithBoundary = withErrorBoundary(PLOMenuScreen, 'PLO Training');
const PLOGameTrainingScreenWithBoundary = withErrorBoundary(PLOGameTrainingScreen, 'PLO Training');

export const PLORoutes = () => {
  return (
    <>
      <Stack.Screen
        name="PLOMenu"
        component={PLOMenuScreenWithBoundary}
        options={{ title: 'PLO Training' }}
      />
      <Stack.Screen
        name="PLOGameTraining"
        component={PLOGameTrainingScreenWithBoundary}
        options={{ title: 'Game Training' }}
      />
    </>
  );
};
