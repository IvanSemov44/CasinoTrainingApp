import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import RouletteGameScreen from './screens/RouletteGameScreen';

// Type definitions
export type RouletteGameStackParamList = {
  RouletteGame: undefined;
};

const Stack = createStackNavigator();

// All roulette game routes
export const RouletteGameRoutes = () => {
  return (
    <>
      <Stack.Screen
        name="RouletteGame"
        component={RouletteGameScreen}
        options={{ title: 'Roulette Game' }}
      />
    </>
  );
};