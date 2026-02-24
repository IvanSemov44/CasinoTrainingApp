import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PLOGameTrainingScreen from './screens/PLOGameTrainingScreen';

export type PLOStackParamList = {
  PLOGameTraining: undefined;
};

const Stack = createStackNavigator<PLOStackParamList>();

export const PLORoutes = () => {
  return (
    <Stack.Screen
      name="PLOGameTraining"
      component={PLOGameTrainingScreen}
      options={{ title: 'Pot Limit Omaha Training' }}
    />
  );
};
