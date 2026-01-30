import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PLOMenuScreen from './screens/PLOMenuScreen';
import PLOTrainingScreen from './screens/PLOTrainingScreen';
import PLOPotCalculationScreen from './screens/PLOPotCalculationScreen';
import PLOGameTrainingScreen from './screens/PLOGameTrainingScreen';

export type PLOStackParamList = {
  PLOMenu: undefined;
  PLOTraining: { mode: string };
  PLOPotCalculation: undefined;
  PLOGameTraining: undefined;
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
      <Stack.Screen
        name="PLOPotCalculation"
        component={PLOPotCalculationScreen}
        options={{ title: 'Pot Calculation' }}
      />
      <Stack.Screen
        name="PLOGameTraining"
        component={PLOGameTrainingScreen}
        options={{ title: 'Game Training' }}
      />
    </>
  );
};
