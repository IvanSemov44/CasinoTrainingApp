import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PLOMenuScreen from './screens/PLOMenuScreen';
import PLOTrainingScreen from './screens/PLOTrainingScreen';

export type PLOStackParamList = {
  PLOMenu: undefined;
  PLOTraining: { mode: string };
};

const Stack = createStackNavigator();

export const PLORoutes = () => {
  return (
    <>
      <Stack.Screen
        name="PLOMenu"
        component={PLOMenuScreen}
        options={{ title: 'PLO Training' }}
      />
      <Stack.Screen
        name="PLOTraining"
        component={PLOTrainingScreen}
        options={{ title: 'Training' }}
      />
    </>
  );
};
